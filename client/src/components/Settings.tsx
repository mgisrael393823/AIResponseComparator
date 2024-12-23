import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Settings2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { ThemeSettings } from "./settings/ThemeSettings"
import { APIConfiguration } from "./settings/APIConfiguration"
import { Preferences } from "./settings/Preferences"

export function SettingsMenu() {
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState<'theme' | 'api' | 'preferences' | null>(null);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setOpenDialog(null);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="relative z-50 h-9 w-9 rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Open settings menu"
          >
            <Settings2 className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="z-[51] w-48" 
          sideOffset={8}
        >
          <Dialog open={openDialog === 'theme'} onOpenChange={(open) => handleOpenChange(open)}>
            <DialogTrigger asChild>
              <DropdownMenuItem 
                className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
                onSelect={(e) => {
                  e.preventDefault();
                  setOpenDialog('theme');
                }}
              >
                Theme Settings
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Theme Settings</DialogTitle>
                <DialogDescription>
                  Customize the appearance of your application
                </DialogDescription>
              </DialogHeader>
              <ThemeSettings onClose={() => setOpenDialog(null)} />
            </DialogContent>
          </Dialog>

          <Dialog open={openDialog === 'api'} onOpenChange={(open) => handleOpenChange(open)}>
            <DialogTrigger asChild>
              <DropdownMenuItem 
                className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
                onSelect={(e) => {
                  e.preventDefault();
                  setOpenDialog('api');
                }}
              >
                API Configuration
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>API Configuration</DialogTitle>
                <DialogDescription>
                  Configure your AI model API keys and settings
                </DialogDescription>
              </DialogHeader>
              <APIConfiguration onClose={() => setOpenDialog(null)} />
            </DialogContent>
          </Dialog>

          <Dialog open={openDialog === 'preferences'} onOpenChange={(open) => handleOpenChange(open)}>
            <DialogTrigger asChild>
              <DropdownMenuItem 
                className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
                onSelect={(e) => {
                  e.preventDefault();
                  setOpenDialog('preferences');
                }}
              >
                Preferences
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Preferences</DialogTitle>
                <DialogDescription>
                  Customize your chat experience
                </DialogDescription>
              </DialogHeader>
              <Preferences onClose={() => setOpenDialog(null)} />
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}