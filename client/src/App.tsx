import { Switch, Route } from "wouter";
import Dashboard from "@/pages/Dashboard";
import { SettingsMenu } from "@/components/Settings";

function App() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed top-0 right-0 z-50 p-4">
        <SettingsMenu />
      </div>
      <main className="min-h-screen">
        <Switch>
          <Route path="/" component={Dashboard} />
        </Switch>
      </main>
    </div>
  );
}

export default App;