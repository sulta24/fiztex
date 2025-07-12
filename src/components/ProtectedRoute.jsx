import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../config/supabase'

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [checkingAdmin, setCheckingAdmin] = useState(adminOnly)

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (adminOnly && user) {
        try {
          // Проверка для админа
          if (user.email === 'admin@phystech.edu.kz' || user.email === 'admin' || user.id === 'admin-user-id') {
            setIsAdmin(true)
          } else {
            // Проверка через Supabase для обычных пользователей
            const { data, error } = await supabase
              .from('users')
              .select('role')
              .eq('id', user.id)
              .single()

            if (!error && data && data.role === 'admin') {
              setIsAdmin(true)
            } else {
              setIsAdmin(false)
            }
          }
        } catch (error) {
          console.error('Error checking admin status:', error)
          setIsAdmin(false)
        } finally {
          setCheckingAdmin(false)
        }
      } else {
        setCheckingAdmin(false)
      }
    }

    checkAdminStatus()
  }, [user, adminOnly])

  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Загрузка...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">403</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            У вас нет прав доступа к этой странице
          </p>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            На главную
          </a>
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute 