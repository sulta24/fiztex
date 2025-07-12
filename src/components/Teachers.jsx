import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { supabase } from '../config/supabase'
import { FiChevronLeft, FiChevronRight, FiUser } from 'react-icons/fi'

const Teachers = () => {
  const { t } = useLanguage()
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef(null)

  // Дефолтные учителя (если нет данных в БД)
  const defaultTeachers = [
    {
      id: 1,
      name: 'Иванова Мария Петровна',
      position: 'Учитель математики',
      subject: 'Математика',
      bio: 'Учитель математики высшей категории, победитель конкурса "Учитель года-2020"',
      photo_url: '/images/teacher-placeholder.svg'
    },
    {
      id: 2,
      name: 'Петров Алексей Владимирович',
      position: 'Учитель физики',
      subject: 'Физика',
      bio: 'Учитель физики, кандидат педагогических наук, автор научных публикаций',
      photo_url: '/images/teacher-placeholder.svg'
    },
    {
      id: 3,
      name: 'Сидорова Елена Игоревна',
      position: 'Учитель литературы',
      subject: 'Литература',
      bio: 'Учитель литературы, эксперт ЕГЭ, руководитель театральной студии',
      photo_url: '/images/teacher-placeholder.svg'
    },
    {
      id: 4,
      name: 'Кузнецов Дмитрий Сергеевич',
      position: 'Учитель информатики',
      subject: 'Информатика',
      bio: 'Учитель информатики, победитель хакатонов, тренер олимпиадной команды',
      photo_url: '/images/teacher-placeholder.svg'
    },
    {
      id: 5,
      name: 'Смирнова Ольга Александровна',
      position: 'Учитель биологии',
      subject: 'Биология',
      bio: 'Учитель биологии, руководитель экологического кружка, доктор педагогических наук',
      photo_url: '/images/teacher-placeholder.svg'
    }
  ]

  useEffect(() => {
    fetchTeachers()
  }, [])

  const fetchTeachers = async () => {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      if (data && data.length > 0) {
        setTeachers(data)
      } else {
        setTeachers(defaultTeachers)
      }
    } catch (error) {
      console.error('Error fetching teachers:', error)
      setTeachers(defaultTeachers)
    } finally {
      setLoading(false)
    }
  }

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320
      const currentScrollLeft = scrollRef.current.scrollLeft
      const newScrollLeft = direction === 'left' 
        ? currentScrollLeft - scrollAmount 
        : currentScrollLeft + scrollAmount
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  if (loading) {
    return (
      <section id="teachers" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Загрузка...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="teachers" className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
              <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-[#1e3c72]/10 dark:bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-32 right-20 w-32 h-32 bg-[#2a5298]/5 dark:bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-[#1e3c72]/8 dark:bg-white/8 rounded-full blur-3xl"></div>
        </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('ourTeachers')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Наша команда опытных преподавателей готова помочь каждому ученику достичь успеха
          </p>
        </motion.div>

        {/* Teachers Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 hidden lg:flex items-center justify-center w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full transition-all duration-300 hover:scale-110"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 hidden lg:flex items-center justify-center w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full transition-all duration-300 hover:scale-110"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>

          {/* Teachers Scroll Container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide space-x-6 pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {teachers.map((teacher, index) => (
              <motion.div
                key={teacher.id}
                variants={cardVariants}
                className="flex-shrink-0 w-80 h-96 group"
              >
                <div className="h-full bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                  {/* Teacher Photo */}
                  <div className="relative mx-auto w-32 h-32 mb-6">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/30 group-hover:border-white/50 transition-colors">
                      {teacher.photo_url ? (
                        <img
                          src={teacher.photo_url}
                          alt={teacher.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                          }}
                        />
                      ) : null}
                      
                      {/* Fallback placeholder */}
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                        <FiUser className="w-12 h-12 text-white/80" />
                      </div>
                    </div>
                  </div>

                  {/* Teacher Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white mb-2 leading-tight">
                      {teacher.name}
                    </h3>
                    
                    <p className="text-blue-200 font-medium mb-4 text-sm">
                      {teacher.position}
                    </p>
                    
                    <p className="text-white/80 text-sm leading-relaxed line-clamp-4">
                      {teacher.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Scroll Indicator */}
          <div className="flex justify-center mt-6 lg:hidden">
            <p className="text-white/60 text-sm">
              ← Прокрутите для просмотра всех учителей →
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Teachers 