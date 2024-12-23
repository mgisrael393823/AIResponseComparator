import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ThemeSettingsProps {
  onClose: () => void;
}

export function ThemeSettings({ onClose }: ThemeSettingsProps) {
  const [theme, setTheme] = useState("light");
  const [variant, setVariant] = useState("professional");

  const handleSave = () => {
    // Save theme settings to local storage or context
    localStorage.setItem('theme', theme);
    localStorage.setItem('variant', variant);
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-3">Appearance</h4>
          <RadioGroup
            defaultValue={theme}
            onValueChange={setTheme}
            className="grid grid-cols-3 gap-4"
          >
            <div>
              <RadioGroupItem value="light" id="light" className="peer sr-only" />
              <Label
                htmlFor="light"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Light
              </Label>
            </div>
            <div>
              <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
              <Label
                htmlFor="dark"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Dark
              </Label>
            </div>
            <div>
              <RadioGroupItem value="system" id="system" className="peer sr-only" />
              <Label
                htmlFor="system"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                System
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-3">Color Scheme</h4>
          <RadioGroup
            defaultValue={variant}
            onValueChange={setVariant}
            className="grid grid-cols-3 gap-4"
          >
            <div>
              <RadioGroupItem value="professional" id="professional" className="peer sr-only" />
              <Label
                htmlFor="professional"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Professional
              </Label>
            </div>
            <div>
              <RadioGroupItem value="vibrant" id="vibrant" className="peer sr-only" />
              <Label
                htmlFor="vibrant"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Vibrant
              </Label>
            </div>
            <div>
              <RadioGroupItem value="tint" id="tint" className="peer sr-only" />
              <Label
                htmlFor="tint"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Tint
              </Label>
            </div>
          </RadioGroup>
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
