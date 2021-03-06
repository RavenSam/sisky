import { useTheme } from "next-themes"
import { BiSun, BiMoon } from "react-icons/bi"

export default function ThemeToggle({ className = "btn-icon" }) {
   const { theme, setTheme } = useTheme()

   const ThemeIcon = theme === "dark" ? BiSun : BiMoon

   return (
      <button
         title={theme === "dark" ? "Toggle to Light Theme" : "Toggle to Dark Theme"}
         className={className}
         aria-label="Theme Toggle"
         onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
         <ThemeIcon size={20} />
      </button>
   )
}
