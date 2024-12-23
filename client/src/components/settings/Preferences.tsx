import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface PreferencesProps {
  onClose: () => void;
}

export function Preferences({ onClose }: PreferencesProps) {
  const [preferences, setPreferences] = useState({
    autoSync: true,
    notifications: true,
    saveHistory: true
  });

  const handleSave = () => {
    // Save preferences to local storage
    localStorage.setItem('preferences', JSON.stringify(preferences));
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Auto Sync</Label>
            <p className="text-[0.8rem] text-muted-foreground">
              Automatically sync responses across AI models
            </p>
          </div>
          <Switch
            checked={preferences.autoSync}
            onCheckedChange={(checked) => 
              setPreferences(prev => ({ ...prev, autoSync: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Notifications</Label>
            <p className="text-[0.8rem] text-muted-foreground">
              Show notifications for completed responses
            </p>
          </div>
          <Switch
            checked={preferences.notifications}
            onCheckedChange={(checked) => 
              setPreferences(prev => ({ ...prev, notifications: checked }))
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Save History</Label>
            <p className="text-[0.8rem] text-muted-foreground">
              Save chat history locally
            </p>
          </div>
          <Switch
            checked={preferences.saveHistory}
            onCheckedChange={(checked) => 
              setPreferences(prev => ({ ...prev, saveHistory: checked }))
            }
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
