import { createClient } from '@supabase/supabase-js'

// Замените эти значения на ваши из Supabase Dashboard
const supabaseUrl = 'https://uyqbccrqxhmmzaijjltx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5cWJjY3JxeGhtbXphaWpqbHR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjQ5NTYsImV4cCI6MjA2NzgwMDk1Nn0.WsA1wnVi5sGYwED8ICzY45v-K3cbflNut050szMP8-c'

// Создаем клиент Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Функция проверки подключения к Supabase
export const checkConnection = async () => {
  try {
    const { data, error } = await supabase.from('users').select('count').limit(1)
    if (error && error.code !== 'PGRST116') {
      console.warn('Supabase connection error:', error.message)
      return false
    }
    return true
  } catch (error) {
    console.warn('Supabase not configured yet:', error.message)
    return false
  }
}

// Функция инициализации для демо (создает временные данные)
export const initializeDemoData = async () => {
  try {
    // Проверяем есть ли данные в таблицах
    const { data: existingTeachers } = await supabase
      .from('teachers')
      .select('count')

    if (existingTeachers && existingTeachers.length === 0) {
      // Добавляем демо-учителей
      const demoTeachers = [
        {
          name: 'Иванова Мария Петровна',
          position: 'Учитель математики',
          subject: 'Математика',
          bio: 'Учитель математики высшей категории, победитель конкурса "Учитель года-2020"',
          photo_url: '/images/teacher-placeholder.svg'
        },
        {
          name: 'Петров Алексей Владимирович',
          position: 'Учитель физики',
          subject: 'Физика',
          bio: 'Учитель физики, кандидат педагогических наук, автор научных публикаций',
          photo_url: '/images/teacher-placeholder.svg'
        },
        {
          name: 'Сидорова Елена Игоревна',
          position: 'Учитель литературы',
          subject: 'Литература',
          bio: 'Учитель литературы, эксперт ЕГЭ, руководитель театральной студии',
          photo_url: '/images/teacher-placeholder.svg'
        }
      ]

      await supabase.from('teachers').insert(demoTeachers)
    }

    // Добавляем демо-галерею
    const { data: existingGallery } = await supabase
      .from('gallery_items')
      .select('count')

    if (existingGallery && existingGallery.length === 0) {
      const demoGallery = [
        {
          title: 'Современные классы',
          description: 'Оборудованные по последним стандартам учебные аудитории',
          image_url: '/images/classroom-placeholder.jpg',
          category: 'facilities',
          order_index: 1
        },
        {
          title: 'Спортивный зал',
          description: 'Просторный спортивный зал для физкультуры и секций',
          image_url: '/images/sports-placeholder.jpg',
          category: 'activities',
          order_index: 2
        },
        {
          title: 'Библиотека',
          description: 'Богатая коллекция книг и комфортная зона для чтения',
          image_url: '/images/library-placeholder.jpg',
          category: 'facilities',
          order_index: 3
        }
      ]

      await supabase.from('gallery_items').insert(demoGallery)
    }

    console.log('Demo data initialized successfully')
  } catch (error) {
    console.warn('Could not initialize demo data:', error.message)
  }
} 