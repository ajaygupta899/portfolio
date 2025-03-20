
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="ghost" size="icon" className="w-9 h-9 opacity-0" />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-9 h-9 relative overflow-hidden transition-all duration-500 ease-out-expo rounded-full"
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          theme === "dark" ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <Moon className="h-5 w-5 text-foreground" />
      </span>
      <span
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          theme === "light" ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <Sun className="h-5 w-5 text-foreground" />
      </span>
    </Button>
  );
}
