import { Switch, Route } from "wouter";
import Dashboard from "@/pages/Dashboard";
import { SettingsMenu } from "@/components/Settings";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Header controls with proper spacing */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-md hover:bg-accent hover:text-accent-foreground"
          aria-label="Filter"
        >
          <Filter className="h-5 w-5" />
        </Button>
        <SettingsMenu />
      </div>

      <main className="relative min-h-screen w-full">
        <Switch>
          <Route path="/" component={Dashboard} />
        </Switch>
      </main>
    </div>
  );
}

export default App;