import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { FiCheck, FiCalendar, FiFileText, FiUsers } from 'react-icons/fi'

const Admission = () => {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('requirements')

  const tabs = [
    { id: 'requirements', label: t('requirements'), icon: FiCheck },
    { id: 'process', label: t('admissionProcess'), icon: FiCalendar }
  ]

  const requirements = [
    'Возраст на 1 сентября: для 1 класса - от 6,5 до 8 лет',
    'Отсутствие медицинских противопоказаний к обучению',
    'Готовность ребенка к школьному обучению (по результатам собеседования)',
    'Для поступления в профильные классы - успешное прохождение вступительных испытаний',
    'Наличие регистрации в закрепленном микрорайоне (для приема в 1 класс)'
  ]

  const specializedClasses = [
    {
      name: 'Математический класс',
      requirement: 'тестирование по математике и логике'
    },
    {
      name: 'Лингвистический класс',
      requirement: 'тестирование по русскому и английскому языкам'
    },
    {
      name: 'Естественно-научный класс',
      requirement: 'тестирование по математике и естествознанию'
    },
    {
      name: 'Гуманитарный класс',
      requirement: 'творческое задание и собеседование'
    }
  ]

  const timelineItems = [
    {
      date: '1 февраля - 30 июня',
      title: 'Прием заявлений в 1 класс',
      description: 'Для детей, проживающих на закрепленной территории',
      position: 'left'
    },
    {
      date: '1 июля - 5 сентября',
      title: 'Прием заявлений в 1 класс',
      description: 'Для детей, не проживающих на закрепленной территории (при наличии свободных мест)',
      position: 'right'
    },
    {
      date: '15 апреля - 20 мая',
      title: 'Вступительные испытания',
      description: 'Для поступающих в профильные классы (5-11 классы)',
      position: 'left'
    },
    {
      date: '25 мая - 10 июня',
      title: 'Объявление результатов',
      description: 'Публикация списков зачисленных учащихся',
      position: 'right'
    },
    {
      date: '15 - 30 августа',
      title: 'Организационные собрания',
      description: 'Встречи с классными руководителями и подготовка к учебному году',
      position: 'left'
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
    <section id="admission" className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('admissionTitle')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            {t('admissionSubtitle')}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-white dark:bg-gray-700 rounded-lg shadow-md -z-10"
                    />
                  )}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'requirements' && (
            <motion.div
              key="requirements"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Basic Requirements */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-blue-100 dark:border-gray-600"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                    <FiFileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Основные требования для поступления
                  </h3>
                </div>
                
                <div className="grid gap-4">
                  {requirements.map((requirement, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-start space-x-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-0.5">
                        <FiCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {requirement}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Specialized Classes */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-purple-100 dark:border-gray-600"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                    <FiUsers className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Специализированные классы
                  </h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {specializedClasses.map((classItem, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow duration-300"
                    >
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">
                        {classItem.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {classItem.requirement}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'process' && (
            <motion.div
              key="process"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              {/* Timeline */}
              <div className="relative max-w-4xl mx-auto">
                {/* Timeline Line (desktop only) */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 to-blue-600 rounded-full hidden md:block"></div>

                {/* Timeline Items (desktop only) */}
                <div className="space-y-12 hidden md:block">
                  {timelineItems.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={`relative flex items-center ${
                        item.position === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                    >
                      {/* Content */}
                      <div className={`flex-1 ${item.position === 'left' ? 'md:pr-8' : 'md:pl-8'}`}>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-shadow duration-300">
                          <div className="flex items-center space-x-2 mb-3">
                            <FiCalendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                              {item.date}
                            </span>
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {item.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Timeline Dot */}
                      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 border-4 border-white dark:border-gray-900 rounded-full"></div>

                      {/* Spacer for alignment */}
                      <div className="flex-1 hidden md:block"></div>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Timeline (mobile only) */}
                <div className="md:hidden space-y-6">
                  {timelineItems.map((item, index) => (
                    <motion.div
                      key={`mobile-${index}`}
                      variants={itemVariants}
                      className="relative pl-8"
                    >
                      <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-blue-400 to-blue-600"></div>
                      <div className="absolute left-0 top-3 transform -translate-x-1/2 w-3 h-3 bg-blue-600 rounded-full"></div>
                      
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center space-x-2 mb-2">
                          <FiCalendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-blue-600 dark:text-blue-400 font-semibold text-xs">
                            {item.date}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Admission 