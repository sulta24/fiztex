import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../config/supabase'
import { FiSave, FiEdit2, FiX } from 'react-icons/fi'
import toast from 'react-hot-toast'

const ContentManagement = () => {
  const [schoolInfo, setSchoolInfo] = useState({
    site_name: '',
    site_description: '',
    contact_email: '',
    contact_phone: '',
    address: '',
    about_school: '',
    admission_info: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    fetchSchoolInfo()
  }, [])

  const fetchSchoolInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('school_info')
        .select('*')
        .eq('language', 'ru')

      if (error) throw error

      // Преобразуем данные в объект
      const info = {}
      data?.forEach(item => {
        info[item.key] = item.value
      })

      setSchoolInfo(prev => ({ ...prev, ...info }))
    } catch (error) {
      console.error('Error fetching school info:', error)
      toast.error('Ошибка загрузки информации')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)

    try {
      // Подготавливаем данные для сохранения
      const dataToSave = Object.entries(schoolInfo).map(([key, value]) => ({
        key,
        value,
        language: 'ru'
      }))

      // Удаляем старые записи
      await supabase
        .from('school_info')
        .delete()
        .eq('language', 'ru')

      // Добавляем новые записи
      const { error } = await supabase
        .from('school_info')
        .insert(dataToSave)

      if (error) throw error

      toast.success('Информация сохранена')
      setEditing(false)
    } catch (error) {
      console.error('Error saving school info:', error)
      toast.error('Ошибка сохранения')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (field, value) => {
    setSchoolInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Информация о школе
        </h2>
        <button
          onClick={() => setEditing(!editing)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiEdit2 className="w-4 h-4" />
          <span>{editing ? 'Отменить' : 'Редактировать'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Основная информация */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Основная информация
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Название школы *
              </label>
              {editing ? (
                <input
                  type="text"
                  value={schoolInfo.site_name}
                  onChange={(e) => handleChange('site_name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{schoolInfo.site_name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Описание школы
              </label>
              {editing ? (
                <textarea
                  value={schoolInfo.site_description}
                  onChange={(e) => handleChange('site_description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-300">{schoolInfo.site_description}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                О школе
              </label>
              {editing ? (
                <textarea
                  value={schoolInfo.about_school}
                  onChange={(e) => handleChange('about_school', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-300">{schoolInfo.about_school}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Контактная информация */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Контактная информация
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              {editing ? (
                <input
                  type="email"
                  value={schoolInfo.contact_email}
                  onChange={(e) => handleChange('contact_email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{schoolInfo.contact_email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Телефон
              </label>
              {editing ? (
                <input
                  type="tel"
                  value={schoolInfo.contact_phone}
                  onChange={(e) => handleChange('contact_phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{schoolInfo.contact_phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Адрес
              </label>
              {editing ? (
                <input
                  type="text"
                  value={schoolInfo.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">{schoolInfo.address}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Информация о поступлении
              </label>
              {editing ? (
                <textarea
                  value={schoolInfo.admission_info}
                  onChange={(e) => handleChange('admission_info', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-300">{schoolInfo.admission_info}</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Save Button */}
      {editing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            <FiSave className="w-5 h-5" />
            <span>{saving ? 'Сохранение...' : 'Сохранить изменения'}</span>
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default ContentManagement 