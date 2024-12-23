import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Settings2 } from "lucide-react"
import { useState } from "react"
import { ThemeSettings } from "./settings/ThemeSettings"
import { APIConfiguration } from "./settings/APIConfiguration"
import { Preferences } from "./settings/Preferences"

type DialogType = 'theme' | 'api' | 'preferences' | null;

interface DialogConfig {
  title: string;
  description: string;
  component: React.ComponentType<{ onClose: () => void }>;
}

const dialogConfigs: Record<Exclude<DialogType, null>, DialogConfig> = {
  theme: {
    title: "Theme Settings",
    description: "Customize the appearance of your application",
    component: ThemeSettings,
  },
  api: {
    title: "API Configuration",
    description: "Configure your AI model API keys and settings",
    component: APIConfiguration,
  },
  preferences: {
    title: "Preferences",
    description: "Customize your chat experience",
    component: Preferences,
  },
};

export function SettingsMenu() {
  const [openDialog, setOpenDialog] = useState<DialogType>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setOpenDialog(null);
    }
  };

  const handleSelect = (type: DialogType) => {
    setOpenDialog(type);
    setIsOpen(true);
  };

  const handleClose = () => {
    setOpenDialog(null);
    setIsOpen(false);
  };

  const ActiveComponent = openDialog ? dialogConfigs[openDialog].component : null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="relative z-50 h-9 w-9 rounded-md hover:bg-accent hover:text-accent-foreground"
            aria-label="Open settings menu"
          >
            <Settings2 className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {Object.entries(dialogConfigs).map(([key, config]) => (
            <DropdownMenuItem
              key={key}
              onSelect={(e) => {
                e.preventDefault();
                handleSelect(key as DialogType);
              }}
              className="cursor-pointer"
            >
              {config.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {openDialog && (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{dialogConfigs[openDialog].title}</DialogTitle>
              <DialogDescription>
                {dialogConfigs[openDialog].description}
              </DialogDescription>
            </DialogHeader>
            {ActiveComponent && <ActiveComponent onClose={handleClose} />}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}