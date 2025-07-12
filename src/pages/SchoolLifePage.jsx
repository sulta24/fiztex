import { motion } from 'framer-motion'
import SchoolLife from '../components/SchoolLife'

const SchoolLifePage = () => {
  return (
    <div className="pt-20">
      <SchoolLife />
      
      {/* Additional Content */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Почему выбирают нашу школу?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl border border-blue-100 dark:border-gray-600">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Качественное образование
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Современные методики обучения и индивидуальный подход к каждому ученику
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl border border-green-100 dark:border-gray-600">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">🔬</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Современное оборудование
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Лаборатории и классы оснащены новейшим оборудованием для эффективного обучения
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl border border-purple-100 dark:border-gray-600">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Опытные преподаватели
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Команда профессиональных педагогов с большим опытом работы
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default SchoolLifePage 