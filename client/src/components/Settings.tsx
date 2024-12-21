import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Settings2 } from "lucide-react"

export function SettingsMenu() {
  return (
    <div className="fixed top-4 right-4 z-[100]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-9 w-9 hover:bg-accent active:bg-accent/90"
          >
            <Settings2 className="h-5 w-5" />
            <span className="sr-only">Open settings menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48" sideOffset={8}>
          <DropdownMenuItem onClick={() => console.log('Theme clicked')}>
            Theme Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log('API clicked')}>
            API Configuration
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => console.log('Preferences clicked')}>
            Preferences
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}