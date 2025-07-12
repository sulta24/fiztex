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
        { label: t('footer_address'), value: t('footer_address_value') },
        { label: t('footer_index'), value: t('footer_index_value') },
        { label: t('footer_district'), value: t('footer_district_value') }
      ]
    },
    {
      title: t('contactPhones'),
      icon: FiPhone,
      items: [
        { label: t('footer_reception'), value: t('footer_reception_value') },
        { label: t('footer_director'), value: t('footer_director_phone') },
        { label: t('footer_vice'), value: t('footer_vice_value') },
        { label: t('footer_admission'), value: t('footer_admission_value') }
      ]
    },
    {
      title: t('emailContacts'),
      icon: FiMail,
      items: [
        { label: t('footer_general'), value: t('footer_general_email') },
        { label: t('footer_director'), value: t('footer_director_email') },
        { label: t('footer_admission'), value: t('footer_admission_email') },
        { label: t('footer_support'), value: t('footer_support_email') }
      ]
    },
    {
      title: t('footer_working_hours'),
      icon: FiClock,
      items: [
        { label: t('footer_mon_fri'), value: t('footer_mon_fri_value') },
        { label: t('footer_sat'), value: t('footer_sat_value') },
        { label: t('footer_sun'), value: t('footer_sun_value') },
        { label: t('footer_reception'), value: t('footer_reception_hours') }
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
                {t('footer_school_name')}
              </h3>
              <p className="text-gray-600 dark:text-white/80 leading-relaxed text-lg">
                {t('footer_school_desc')}
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
                  <div className="text-sm text-gray-600 dark:text-white/70">{t('footer_years_exp')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1e3c72] dark:text-white">500+</div>
                  <div className="text-sm text-gray-600 dark:text-white/70">{t('footer_students')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1e3c72] dark:text-white">50+</div>
                  <div className="text-sm text-gray-600 dark:text-white/70">{t('footer_teachers')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1e3c72] dark:text-white">98%</div>
                  <div className="text-sm text-gray-600 dark:text-white/70">{t('footer_university')}</div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="text-center md:text-right">
                <div className="text-sm text-gray-600 dark:text-white/70 space-y-1">
                  <div>{t('footer_license')}</div>
                  <div>{t('footer_accreditation')}</div>
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
              &copy; 2025 {t('footer_school_name')}. {t('footer_rights_reserved')}
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-white/70">
              <a href="#" className="hover:text-[#1e3c72] dark:hover:text-gray-200 transition-colors duration-200">
                {t('footer_privacy')}
              </a>
              <a href="#" className="hover:text-[#1e3c72] dark:hover:text-gray-200 transition-colors duration-200">
                {t('footer_terms')}
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-200">
                {t('footer_sitemap')}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer 