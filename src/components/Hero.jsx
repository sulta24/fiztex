import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { FiArrowDown } from 'react-icons/fi'

const Hero = () => {
  const { t } = useLanguage()

  const scrollToNext = () => {
    const nextSection = document.getElementById('school-life')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Фоновая картинка только для ноутбуков и компьютеров */}
      <div className="hidden md:block absolute inset-0 z-0 bg-[#f3f6fa] transition-colors duration-500">
        <img 
          src="/images/main-page.png" 
          alt="main background" 
          className="w-full h-full object-cover object-center opacity-0 transition-opacity duration-700 hero-bg-img" 
          style={{ filter: 'brightness(0.85)' }}
          loading="eager"
          fetchpriority="high"
          onLoad={e => e.currentTarget.style.opacity = 1}
        />
      </div>
      {/* Нет фоновой картинки на мобильной и desktop */}
      {/* Удалён синий градиент */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#1e3c72]/10 dark:bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-[#2a5298]/5 dark:bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-[#1e3c72]/8 dark:bg-white/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-[#2a5298]/6 dark:bg-white/6 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e3c72] dark:text-white leading-tight"
          >
            {t('welcomeTitle')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-white max-w-3xl mx-auto leading-relaxed"
          >
            {t('welcomeSubtitle')}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
              onClick={scrollToNext}
              className="inline-flex items-center space-x-3 bg-[#1e3c72] hover:bg-[#2a5298] text-white dark:bg-white dark:hover:bg-gray-100 dark:text-[#1e3c72] px-8 py-4 rounded-full font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>{t('learnMore')}</span>
              <FiArrowDown className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-[#1e3c72] dark:border-white rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-[#1e3c72] dark:bg-white rounded-full mt-2"
          ></motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero 