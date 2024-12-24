import { WebSocket, WebSocketServer } from 'ws';
import { type Server } from 'http';
import { log } from './vite';
import { db } from '@db';
import { collaborationSessions, sessionParticipants, sharedResponses } from '@db/schema';
import { eq } from 'drizzle-orm';

interface WebSocketMessage {
  type: 'join_session' | 'leave_session' | 'new_response' | 'participant_update';
  sessionId: string;
  userId: number;
  data?: any;
}

interface ConnectedClient {
  ws: WebSocket;
  userId: number;
  sessionId?: string;
}

export function setupWebSocket(server: Server) {
  const wss = new WebSocketServer({ server, path: '/ws' });
  const clients = new Map<WebSocket, ConnectedClient>();

  wss.on('connection', async (ws) => {
    log('New WebSocket connection established');

    ws.on('message', async (message: string) => {
      try {
        const msg: WebSocketMessage = JSON.parse(message);
        const client = clients.get(ws);

        if (!client) {
          log('Client not found in connection map');
          return;
        }

        switch (msg.type) {
          case 'join_session':
            // Update client's session
            client.sessionId = msg.sessionId;
            
            // Add participant to session
            await db.insert(sessionParticipants).values({
              sessionId: msg.sessionId,
              userId: msg.userId,
            }).onConflictDoNothing();

            // Notify other participants
            broadcastToSession(msg.sessionId, {
              type: 'participant_update',
              sessionId: msg.sessionId,
              userId: msg.userId,
              data: { action: 'joined' }
            }, ws);
            break;

          case 'leave_session':
            if (client.sessionId) {
              // Update last active timestamp
              await db.update(sessionParticipants)
                .set({ lastActiveAt: new Date() })
                .where(eq(sessionParticipants.sessionId, client.sessionId))
                .where(eq(sessionParticipants.userId, client.userId));

              // Notify other participants
              broadcastToSession(client.sessionId, {
                type: 'participant_update',
                sessionId: client.sessionId,
                userId: client.userId,
                data: { action: 'left' }
              }, ws);

              client.sessionId = undefined;
            }
            break;

          case 'new_response':
            if (client.sessionId) {
              // Save response to database
              await db.insert(sharedResponses).values({
                sessionId: client.sessionId,
                userId: client.userId,
                provider: msg.data.provider,
                prompt: msg.data.prompt,
                response: msg.data.response,
              });

              // Broadcast to all participants
              broadcastToSession(client.sessionId, msg, ws);
            }
            break;
        }
      } catch (error) {
        log(`WebSocket error: ${error}`);
      }
    });

    ws.on('close', async () => {
      const client = clients.get(ws);
      if (client?.sessionId) {
        // Update participant's last active time
        await db.update(sessionParticipants)
          .set({ lastActiveAt: new Date() })
          .where(eq(sessionParticipants.sessionId, client.sessionId))
          .where(eq(sessionParticipants.userId, client.userId));

        // Notify other participants
        broadcastToSession(client.sessionId, {
          type: 'participant_update',
          sessionId: client.sessionId,
          userId: client.userId,
          data: { action: 'disconnected' }
        }, ws);
      }
      clients.delete(ws);
      log('Client disconnected from WebSocket');
    });
  });

  function broadcastToSession(sessionId: string, message: WebSocketMessage, exclude?: WebSocket) {
    const messageStr = JSON.stringify(message);
    clients.forEach((client, ws) => {
      if (ws !== exclude && client.sessionId === sessionId && ws.readyState === WebSocket.OPEN) {
        ws.send(messageStr);
      }
    });
  }

  // Periodic cleanup of inactive sessions
  setInterval(async () => {
    try {
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      await db.update(collaborationSessions)
        .set({ isActive: false })
        .where(eq(collaborationSessions.isActive, true))
        .where('created_at', '<', thirtyMinutesAgo);
    } catch (error) {
      log(`Session cleanup error: ${error}`);
    }
  }, 5 * 60 * 1000); // Run every 5 minutes

  return wss;
}
