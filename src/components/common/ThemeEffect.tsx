import { useEffect } from "react"
import { useAppSelector } from "../../store/hooks"

const ThemeEffect = () => {
  const { theme, resolvedTheme } = useAppSelector((s) => s.theme)

  useEffect(() => {
    const html = document.documentElement
    
    // Remove both light and dark classes, then add the current theme
    html.classList.remove("light", "dark")
    
    // Only add dark class if resolvedTheme is 'dark', otherwise leave it without class (light mode)
    if (resolvedTheme === "dark") {
      html.classList.add("dark")
      
    } else {
      // For light mode, we don't need to add a class, just ensure dark is removed
      html.classList.remove("dark")
      
    }
    
    html.setAttribute("data-theme", resolvedTheme)

    // Save theme to localStorage
    localStorage.setItem("wt_theme", theme)
  }, [theme, resolvedTheme])

  return null
}

export default ThemeEffect
