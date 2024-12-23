import { Switch, Route } from "wouter";
import Dashboard from "@/pages/Dashboard";
import { SettingsMenu } from "@/components/Settings";
import { Plus, SplitSquareHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import ErrorBoundary from "@/components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <div className="relative min-h-screen w-full">
        {/* Header controls */}
        <div className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50">
          <Button
            variant="ghost"
            className="text-sm font-medium flex items-center gap-2"
            size="sm"
            onClick={() => window.location.reload()}
          >
            <Plus className="h-4 w-4" />
            New Chat
          </Button>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="text-sm text-gray-600 flex items-center gap-2"
              size="sm"
            >
              <SplitSquareHorizontal className="h-4 w-4" />
              Add Split Chat
            </Button>
            <SettingsMenu />
          </div>
        </div>

        <main className="relative min-h-screen w-full pt-14">
          <Switch>
            <Route path="/" component={Dashboard} />
          </Switch>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;