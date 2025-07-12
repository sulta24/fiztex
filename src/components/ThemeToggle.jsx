import { useTheme } from '../contexts/ThemeContext'
import { FiSun, FiMoon } from 'react-icons/fi'

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  // Выводим в консоль текущую тему при каждом рендере
  if (isDark) {
    console.log('dark')
  } else {
    console.log('light')
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
      title={isDark ? 'Светлая тема' : 'Темная тема'}
    >
      {isDark ? (
        <FiSun className="w-5 h-5 text-yellow-400" />
      ) : (
        <FiMoon className="w-5 h-5 text-[#1e3c72]" />
      )}
    </button>
  )
}

export default ThemeToggle 