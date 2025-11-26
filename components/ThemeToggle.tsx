"use client"
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => setTheme('light')} className="px-2 py-1 rounded bg-gray-200 dark:bg-slate-700">Light</button>
      <button onClick={() => setTheme('dark')} className="px-2 py-1 rounded bg-gray-200 dark:bg-slate-700">Dark</button>
      <button onClick={() => setTheme('system')} className="px-2 py-1 rounded bg-gray-200 dark:bg-slate-700">System</button>
    </div>
  )
}
