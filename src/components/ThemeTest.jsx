import { useTheme } from '../contexts/ThemeContext'
import { useState, useEffect } from 'react'

const ThemeTest = () => {
  const { theme, isDark, toggleTheme } = useTheme()
  const [hasDarkClass, setHasDarkClass] = useState(false)

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setHasDarkClass(document.documentElement.classList.contains('dark'))
    }
  }, [isDark])

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-50">
      <div className="text-sm text-gray-900 dark:text-white">
        <div>Текущая тема: {theme}</div>
        <div>isDark: {isDark ? 'true' : 'false'}</div>
        <div>Класс dark: {hasDarkClass ? 'есть' : 'нет'}</div>
        <button 
          onClick={toggleTheme}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
        >
          Переключить
        </button>
      </div>
    </div>
  )
}

export default ThemeTest 