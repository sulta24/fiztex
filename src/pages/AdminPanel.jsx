import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { 
  FiUsers, 
  FiImage, 
  FiFileText, 
  FiSettings, 
  FiHome,
  FiLogOut 
} from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'

// Admin Components
import TeachersManagement from '../components/admin/TeachersManagement'
import GalleryManagement from '../components/admin/GalleryManagement'
import ContentManagement from '../components/admin/ContentManagement'

const AdminPanel = () => {
  const { t } = useLanguage()
  const { signOut } = useAuth()
  const location = useLocation()

  const menuItems = [
    {
      path: '/admin',
      label: 'Панель управления',
      icon: FiSettings,
      exact: true
    },
    {
      path: '/admin/teachers',
      label: t('manageTeachers'),
      icon: FiUsers
    },
    {
      path: '/admin/gallery',
      label: 'Управление галереей',
      icon: FiImage
    },
    {
      path: '/admin/content',
      label: 'Управление контентом',
      icon: FiFileText
    }
  ]

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Админ панель
              </h1>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                PhysTech School
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <FiHome className="w-5 h-5" />
                <span>На сайт</span>
              </Link>
              
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              >
                <FiLogOut className="w-5 h-5" />
                <span>Выйти</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-sm min-h-screen">
          <nav className="p-6">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const IconComponent = item.icon
                const isActive = item.exact 
                  ? location.pathname === item.path
                  : location.pathname.startsWith(item.path)
                
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/teachers" element={<TeachersManagement />} />
            <Route path="/gallery" element={<GalleryManagement />} />
            <Route path="/content" element={<ContentManagement />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

// Admin Dashboard Component
const AdminDashboard = () => {
  const stats = [
    {
      name: 'Всего учителей',
      value: '25',
      icon: FiUsers,
      change: '+2',
      changeType: 'increase'
    },
    {
      name: 'Элементов галереи',
      value: '48',
      icon: FiImage,
      change: '+5',
      changeType: 'increase'
    },
    {
      name: 'Страниц контента',
      value: '12',
      icon: FiFileText,
      change: '0',
      changeType: 'neutral'
    }
  ]

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Панель управления
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.name}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                    <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                
                <div className="mt-4 flex items-center">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'increase' 
                      ? 'text-green-600 dark:text-green-400' 
                      : stat.changeType === 'decrease'
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {stat.change} за месяц
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Быстрые действия
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/admin/teachers"
              className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <FiUsers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span className="font-medium text-blue-900 dark:text-blue-200">
                Добавить учителя
              </span>
            </Link>
            
            <Link
              to="/admin/gallery"
              className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            >
              <FiImage className="w-6 h-6 text-green-600 dark:text-green-400" />
              <span className="font-medium text-green-900 dark:text-green-200">
                Загрузить фото
              </span>
            </Link>
            
            <Link
              to="/admin/content"
              className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              <FiFileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <span className="font-medium text-purple-900 dark:text-purple-200">
                Редактировать контент
              </span>
            </Link>
            
            <Link
              to="/"
              className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <FiHome className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-gray-200">
                Просмотр сайта
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminPanel 