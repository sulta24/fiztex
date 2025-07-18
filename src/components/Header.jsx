import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'
import { 
  FiGlobe, 
  FiMenu, 
  FiX, 
  FiUser,
  FiLogOut,
  FiSettings
} from 'react-icons/fi'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  
  const { t, language, changeLanguage } = useLanguage()
  const { user, signOut, isAdmin } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { to: '/', label: t('home'), section: 'main' },
    { to: '/school-life', label: t('schoolLife'), section: 'school-life' },
    { to: '/admission', label: t('admission'), section: 'admission' },
    { to: '/teachers', label: t('teachers'), section: 'teachers' },
  ]

  const languages = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'kz', name: 'Қазақша', flag: '🇰🇿' },
  ]

  const handleSignOut = async () => {
    await signOut()
    setIsUserMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#1e428a] shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center" style={{minWidth: '150px', justifyContent: 'flex-start'}}>
            <Link 
              to="/" 
              className="flex items-center h-16"
            >
              <img src="/images/fiztex-logo.png" alt="FIZTEX Logo" className="h-16 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="flex-1 flex justify-center items-center absolute left-[47%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none">
            <nav className="hidden lg:flex items-center space-x-8 pointer-events-auto">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    location.pathname === item.to
                      ? 'text-[#1e3c72] dark:text-white border-b-2 border-[#1e3c72] dark:border-white'
                      : 'text-gray-700 dark:text-white/80 hover:text-[#1e3c72] dark:hover:text-white'
                  }`}
                >
                  {item.label}
                  {location.pathname === item.to && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#1e3c72] dark:bg-white"
                    />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                <FiGlobe className="w-5 h-5 text-[#1e3c72] dark:text-white" />
                <span className="text-sm font-medium text-[#1e3c72] dark:text-white">
                  {language.toUpperCase()}
                </span>
              </button>

              {isLangMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1e3c72] rounded-lg shadow-lg border border-gray-200 dark:border-white/20 py-2"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code)
                        setIsLangMenuOpen(false)
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-white/10 transition-colors ${
                        language === lang.code ? 'bg-[#1e3c72]/10 dark:bg-white/20 text-[#1e3c72] dark:text-white' : 'text-gray-700 dark:text-white'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-sm font-medium">{lang.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                >
                  <FiUser className="w-5 h-5 text-[#1e3c72] dark:text-white" />
                </button>

                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1e3c72] rounded-lg shadow-lg border border-gray-200 dark:border-white/20 py-2"
                  >
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                      >
                        <FiSettings className="w-4 h-4" />
                        <span className="text-sm">{t('adminPanel')}</span>
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span className="text-sm">{t('logout')}</span>
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-white hover:text-[#1e3c72] dark:hover:text-gray-200 transition-colors"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/register"
                  className="bg-[#1e3c72] hover:bg-[#2a5298] text-white dark:bg-white dark:hover:bg-gray-100 dark:text-[#1e3c72] font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm"
                >
                  {t('register')}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? (
                <FiX className="w-6 h-6 text-[#1e3c72] dark:text-white" />
              ) : (
                <FiMenu className="w-6 h-6 text-[#1e3c72] dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-200 dark:border-white/20 py-4"
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === item.to
                      ? 'bg-[#1e3c72]/10 dark:bg-white/20 text-[#1e3c72] dark:text-white'
                      : 'text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {!user && (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-white/20">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {t('login')}
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="bg-[#1e3c72] hover:bg-[#2a5298] text-white dark:bg-white dark:hover:bg-gray-100 dark:text-[#1e3c72] font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm"
                  >
                    {t('register')}
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}

export default Header 