import { Switch, Route } from "wouter";
import Dashboard from "@/pages/Dashboard";
import { SettingsMenu } from "@/components/Settings";

function App() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Settings Menu with proper positioning and stacking context */}
      <div 
        className="fixed top-4 right-4 z-50"
        style={{ isolation: 'isolate' }}
      >
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