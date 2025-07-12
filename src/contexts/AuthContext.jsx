import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../config/supabase'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Получить текущего пользователя
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    // Слушать изменения аутентификации
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email, password, fullName) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/login`
        }
      })

      if (error) throw error

      // Добавить пользователя в таблицу users
      if (data.user) {
        const { error: insertError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email: data.user.email,
              full_name: fullName,
              role: 'user'
            }
          ])

        if (insertError) console.warn('Error inserting user:', insertError)
      }

      toast.success('Регистрация успешна! Проверьте email для подтверждения.')
      return { data, error: null }
    } catch (error) {
      toast.error(error.message)
      return { data: null, error }
    }
  }

  const signIn = async (email, password) => {
    try {
      // Проверка для админа
      if (email === 'admin' && password === '12345678') {
        // Создаем фейкового пользователя для админа
        const adminUser = {
          id: 'admin-user-id',
          email: 'admin@phystech.edu.kz',
          user_metadata: {
            full_name: 'Administrator'
          }
        }
        setUser(adminUser)
        toast.success('Добро пожаловать, администратор!')
        return { data: { user: adminUser }, error: null }
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      toast.success('Вход выполнен успешно!')
      return { data, error: null }
    } catch (error) {
      toast.error(error.message)
      return { data: null, error }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      toast.success('Выход выполнен успешно!')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false)
        return
      }
      
      try {
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single()

        if (error) throw error
        setIsAdmin(data.role === 'admin')
      } catch (error) {
        setIsAdmin(false)
      }
    }

    checkAdminStatus()
  }, [user])

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    isAdmin
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 