import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { supabase } from '../config/supabase'
import { FiX, FiImage } from 'react-icons/fi'

const SchoolLife = () => {
  const { t } = useLanguage()
  const [galleryItems, setGalleryItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorText, setErrorText] = useState('')

  // Дефолтные элементы галереи (если нет данных в БД)
  const defaultGalleryItems = [
    {
      id: 1,
      title: t('modernClassrooms'),
      description: 'Оборудованные по последним стандартам учебные аудитории',
      image_url: '/images/placeholder-classroom.jpg',
      category: 'facilities'
    },
    {
      id: 2,
      title: t('sportsActivities'),
      description: 'Просторный спортивный зал для физкультуры и секций',
      image_url: '/images/placeholder-sports.jpg',
      category: 'activities'
    },
    {
      id: 3,
      title: t('library'),
      description: 'Богатая коллекция книг и комфортная зона для чтения',
      image_url: '/images/placeholder-library.jpg',
      category: 'facilities'
    },
    {
      id: 4,
      title: t('canteen'),
      description: 'Здоровое и вкусное питание для всех учеников',
      image_url: '/images/placeholder-canteen.jpg',
      category: 'facilities'
    },
    {
      id: 5,
      title: t('events'),
      description: 'Яркие школьные мероприятия и творческие выступления',
      image_url: '/images/placeholder-events.jpg',
      category: 'activities'
    },
    {
      id: 6,
      title: t('laboratory'),
      description: 'Современное оборудование для изучения естественных наук',
      image_url: '/images/placeholder-lab.jpg',
      category: 'facilities'
    }
  ]

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  const fetchGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error

      if (data && data.length > 0) {
        setGalleryItems(data)
        setErrorText('')
      } else {
        setGalleryItems(defaultGalleryItems)
        setErrorText('Нет данных в таблице gallery_items, используются дефолтные данные.')
      }
    } catch (error) {
      setErrorText('Ошибка загрузки галереи: ' + (error.message || error.toString()))
      setGalleryItems(defaultGalleryItems)
    } finally {
      setLoading(false)
    }
  }

  const openModal = (item) => {
    setSelectedItem(item)
  }

  const closeModal = () => {
    setSelectedItem(null)
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

  const itemVariants = {
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
      <section id="school-life" className="py-20">
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
    <>
      <section id="school-life" className="py-20">
        <div className="container mx-auto px-4">
          {errorText && (
            <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg text-center">
              {errorText}
            </div>
          )}
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('schoolLifeTitle')}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('schoolLifeSubtitle')}
            </p>
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                onClick={() => openModal(item)}
                className="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative h-48 md:h-56 bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden">
                  {item.image_url && item.image_url.startsWith('http') ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                  ) : null}
                  
                  {/* Fallback placeholder */}
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <FiImage className="w-12 h-12 mx-auto mb-2 opacity-80" />
                      <p className="text-sm font-medium opacity-90">{item.title}</p>
                    </div>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
              
              {/* Modal Image */}
              <div className="h-64 md:h-80 bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden">
                {selectedItem.image_url && selectedItem.image_url.startsWith('http') ? (
                  <img
                    src={selectedItem.image_url}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                ) : null}
                
                <div className="w-full h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <FiImage className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <p className="text-lg font-medium opacity-90">{selectedItem.title}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedItem.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {selectedItem.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default SchoolLife 