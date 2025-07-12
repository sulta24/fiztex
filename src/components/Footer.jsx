import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi'
import { useState } from 'react'

const Footer = () => {
  const { t } = useLanguage()
  const [openSection, setOpenSection] = useState(null)

  const contactSections = [
    {
      title: t('schoolAddress'),
      icon: FiMapPin,
      items: [
        { label: 'Адрес', value: 'г. Алматы, ул. Школьная, д. 1' },
        { label: 'Индекс', value: '050000' },
        { label: 'Район', value: 'Алмалинский район' }
      ]
    },
    {
      title: t('contactPhones'),
      icon: FiPhone,
      items: [
        { label: 'Приемная', value: '+7 (727) 123-45-67' },
        { label: 'Директор', value: '+7 (727) 123-45-68' },
        { label: 'Заместитель директора', value: '+7 (727) 123-45-69' },
        { label: 'Приемная комиссия', value: '+7 (727) 123-45-70' }
      ]
    },
    {
      title: t('emailContacts'),
      icon: FiMail,
      items: [
        { label: 'Общий', value: 'info@phystech-almaty.edu.kz' },
        { label: 'Директор', value: 'director@phystech-almaty.edu.kz' },
        { label: 'Приемная комиссия', value: 'admission@phystech-almaty.edu.kz' },
        { label: 'Техподдержка', value: 'support@phystech-almaty.edu.kz' }
      ]
    },
    {
      title: 'Режим работы',
      icon: FiClock,
      items: [
        { label: 'Понедельник - Пятница', value: '8:00 - 18:00' },
        { label: 'Суббота', value: '9:00 - 15:00' },
        { label: 'Воскресенье', value: 'Выходной' },
        { label: 'Приемная', value: '8:30 - 17:30' }
      ]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <footer className="bg-gradient-to-tl from-gray-100 to-blue-50 dark:from-[#1e3c72] dark:to-[#2a5298] text-gray-800 dark:text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1e3c72] via-[#2a5298] to-[#1e3c72] dark:from-white dark:via-gray-200 dark:to-white"></div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#1e3c72]/10 dark:bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-20 w-32 h-32 bg-[#2a5298]/5 dark:bg-white/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16"
        >
          {/* Footer Grid (desktop) */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {contactSections.map((section, index) => {
              const IconComponent = section.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="space-y-6"
                >
                  {/* Section Header */}
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[#1e3c72]/20 dark:bg-white/20 rounded-lg">
                      <IconComponent className="w-5 h-5 text-[#1e3c72] dark:text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#1e3c72] dark:text-white">
                      {section.title}
                    </h3>
                  </div>
                  {/* Contact Items */}
                  <div className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="group">
                        <div className="text-sm">
                          <span className="text-gray-600 dark:text-white/70 block">
                            {item.label}:
                          </span>
                          <span className="text-gray-800 dark:text-white group-hover:text-[#1e3c72] dark:group-hover:text-gray-200 transition-colors duration-200">
                            {item.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Footer Accordion (mobile only) */}
          <div className="md:hidden flex flex-col gap-4">
            {contactSections.map((section, index) => {
              const IconComponent = section.icon
              const isOpen = openSection === index
              return (
                <div key={index} className="rounded-xl bg-white/80 dark:bg-[#1e3c72]/80 shadow border border-blue-100 dark:border-white/20">
                  <button
                    className="w-full flex items-center justify-between px-4 py-3 focus:outline-none"
                    onClick={() => setOpenSection(isOpen ? null : index)}
                  >
                    <span className="flex items-center space-x-2">
                      <IconComponent className="w-5 h-5 text-[#1e3c72] dark:text-white" />
                      <span className="font-semibold text-[#1e3c72] dark:text-white text-base">{section.title}</span>
                    </span>
                    <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}>▶</span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-3 space-y-2 animate-fadeIn">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-2 text-sm">
                          <span className="text-gray-600 dark:text-white/70 min-w-[70px]">{item.label}:</span>
                          <span className="text-gray-800 dark:text-white font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* School Description */}
          <motion.div
            variants={itemVariants}
            className="mt-16 pt-8 border-t border-[#1e3c72]/20 dark:border-white/20"
          >
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-[#1e3c72] dark:text-white mb-4">
                PhysTech School Almaty
              </h3>
              <p className="text-gray-600 dark:text-white/80 leading-relaxed text-lg">
                Современная школа с физико-математическим уклоном, где каждый ученик может раскрыть свой потенциал 
                и получить качественное образование. Мы готовим будущих ученых, инженеров и лидеров в области 
                точных наук и технологий.
              </p>
            </div>
          </motion.div>

          {/* Social Links & Quick Info */}
          <motion.div
            variants={itemVariants}
            className="mt-12 pt-8 border-t border-[#1e3c72]/20 dark:border-white/20"
          >
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-2xl font-bold text-[#1e3c72] dark:text-white">15+</div>
                  <div className="text-sm text-gray-600 dark:text-white/70">лет опыта</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1e3c72] dark:text-white">500+</div>
                  <div className="text-sm text-gray-600 dark:text-white/70">учеников</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1e3c72] dark:text-white">50+</div>
                  <div className="text-sm text-gray-600 dark:text-white/70">преподавателей</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1e3c72] dark:text-white">98%</div>
                  <div className="text-sm text-gray-600 dark:text-white/70">поступление в вузы</div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="text-center md:text-right">
                <div className="text-sm text-gray-600 dark:text-white/70 space-y-1">
                  <div>Лицензия: АБ №0123456</div>
                  <div>Аккредитация: СГ №0654321</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="py-6 border-t border-[#1e3c72]/20 dark:border-white/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-gray-600 dark:text-white/70">
              &copy; 2025 PhysTech School Almaty. Все права защищены.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-white/70">
              <a href="#" className="hover:text-[#1e3c72] dark:hover:text-gray-200 transition-colors duration-200">
                Политика конфиденциальности
              </a>
              <a href="#" className="hover:text-[#1e3c72] dark:hover:text-gray-200 transition-colors duration-200">
                Правила использования
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">
                Карта сайта
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer 