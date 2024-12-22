import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Settings2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SettingsMenu() {
  const { toast } = useToast();

  const handleMenuItemClick = (action: string) => {
    toast({
      title: "Action triggered",
      description: `${action} action was triggered`,
    });
  };

  return (
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
        onCloseAutoFocus={(event) => event.preventDefault()}
      >
        <DropdownMenuItem 
          className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
          onClick={() => handleMenuItemClick('Theme Settings')}
        >
          Theme Settings
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
          onClick={() => handleMenuItemClick('API Configuration')}
        >
          API Configuration
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
          onClick={() => handleMenuItemClick('Preferences')}
        >
          Preferences
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}