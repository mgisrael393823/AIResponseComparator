import { Switch, Route } from "wouter";
import Dashboard from "@/pages/Dashboard";
import { SettingsMenu } from "@/components/Settings";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Header controls */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
        <span className="text-sm font-medium">New Chat</span>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Add Split Chat</span>
          <SettingsMenu />
        </div>
      </div>

      <main className="relative min-h-screen w-full pt-14">
        <Switch>
          <Route path="/" component={Dashboard} />
        </Switch>
      </main>
    </div>
  );
}

export default App;