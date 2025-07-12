import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSave, FiRefreshCw, FiShield, FiDatabase, FiGlobe } from 'react-icons/fi'
import { useLanguage } from '../../contexts/LanguageContext'
import { useTheme } from '../../contexts/ThemeContext'
import toast from 'react-hot-toast'

const AdminSettings = () => {
  const { t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    siteName: 'PhysTech School Almaty',
    siteDescription: 'Школа физики и технологий в Алматы',
    contactEmail: 'info@phystech.edu.kz',
    contactPhone: '+7 (727) 123-45-67',
    address: 'Алматы, ул. Примерная, 123',
    defaultLanguage: 'ru',
    maintenanceMode: false,
    allowRegistration: true,
    maxFileSize: 5,
    imageQuality: 80
  })

  const handleSave = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Here you would typically save to Supabase
      // await supabase.from('school_info').upsert(settings)
      
      toast.success('Настройки успешно сохранены')
    } catch (error) {
      toast.error('Ошибка при сохранении настроек')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setSettings({
      siteName: 'PhysTech School Almaty',
      siteDescription: 'Школа физики и технологий в Алматы',
      contactEmail: 'info@phystech.edu.kz',
      contactPhone: '+7 (727) 123-45-67',
      address: 'Алматы, ул. Примерная, 123',
      defaultLanguage: 'ru',
      maintenanceMode: false,
      allowRegistration: true,
      maxFileSize: 5,
      imageQuality: 80
    })
    toast.success('Настройки сброшены')
  }

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Настройки администратора
          </h2>
          <div className="flex space-x-3">
            <button
              onClick={handleReset}
              className="btn-secondary flex items-center space-x-2"
            >
              <FiRefreshCw className="w-4 h-4" />
              <span>Сбросить</span>
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="btn-primary flex items-center space-x-2"
            >
              {loading ? (
                <div className="spinner" />
              ) : (
                <FiSave className="w-4 h-4" />
              )}
              <span>{loading ? 'Сохранение...' : 'Сохранить'}</span>
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <FiGlobe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Общие настройки
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="form-label">Название сайта</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleInputChange('siteName', e.target.value)}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Описание сайта</label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                className="form-input"
                rows={3}
              />
            </div>

            <div>
              <label className="form-label">Email для связи</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Телефон</label>
              <input
                type="tel"
                value={settings.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Адрес</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="form-input"
              />
            </div>
          </div>
        </motion.div>

        {/* System Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <FiShield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Системные настройки
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="form-label">Язык по умолчанию</label>
              <select
                value={settings.defaultLanguage}
                onChange={(e) => handleInputChange('defaultLanguage', e.target.value)}
                className="form-input"
              >
                <option value="ru">Русский</option>
                <option value="en">English</option>
                <option value="kk">Қазақша</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="form-label mb-0">Режим обслуживания</label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Временно отключить сайт для посетителей
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="form-label mb-0">Разрешить регистрацию</label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Позволить новым пользователям регистрироваться
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.allowRegistration}
                  onChange={(e) => handleInputChange('allowRegistration', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* File Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="card p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <FiDatabase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Настройки файлов
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="form-label">Максимальный размер файла (МБ)</label>
              <input
                type="number"
                min="1"
                max="50"
                value={settings.maxFileSize}
                onChange={(e) => handleInputChange('maxFileSize', parseInt(e.target.value))}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Качество изображений (%)</label>
              <input
                type="range"
                min="10"
                max="100"
                value={settings.imageQuality}
                onChange={(e) => handleInputChange('imageQuality', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-1">
                <span>10%</span>
                <span>{settings.imageQuality}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Theme Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <FiGlobe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Внешний вид
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="form-label">Тема оформления</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => toggleTheme('light')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    theme === 'light'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="w-full h-8 bg-white rounded mb-2"></div>
                  <span className="text-sm font-medium">Светлая</span>
                </button>
                
                <button
                  onClick={() => toggleTheme('dark')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    theme === 'dark'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="w-full h-8 bg-gray-800 rounded mb-2"></div>
                  <span className="text-sm font-medium">Темная</span>
                </button>
                
                <button
                  onClick={() => toggleTheme('system')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    theme === 'system'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="w-full h-8 bg-gradient-to-r from-white to-gray-800 rounded mb-2"></div>
                  <span className="text-sm font-medium">Система</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminSettings 