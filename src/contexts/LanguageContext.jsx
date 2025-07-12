import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

const translations = {
  ru: {
    // Navigation
    home: 'Главная',
    schoolLife: 'Школьная жизнь',
    admission: 'Поступление',
    teachers: 'Учителя',
    admin: 'Админ',
    login: 'Войти',
    register: 'Регистрация',
    logout: 'Выйти',
    
    // Hero Section
    welcomeTitle: 'Добро пожаловать в нашу школу',
    welcomeSubtitle: 'Место, где каждый ученик может раскрыть свой потенциал и достичь успеха',
    learnMore: 'Узнать больше',
    
    // School Life
    schoolLifeTitle: 'Школьная жизнь',
    schoolLifeSubtitle: 'Посмотрите, как проходят будни и праздники в нашей школе',
    modernClassrooms: 'Современные классы',
    sportsActivities: 'Спортивные занятия',
    library: 'Школьная библиотека',
    canteen: 'Школьная столовая',
    events: 'Праздники и концерты',
    laboratory: 'Научная лаборатория',
    
    // Teachers
    ourTeachers: 'Наши учителя',
    
    // Admission
    admissionTitle: 'Поступление в нашу школу',
    admissionSubtitle: 'Узнайте все о процессе поступления, необходимых документах и сроках подачи заявлений',
    requirements: 'Требования',
    admissionProcess: 'Процесс поступления',
    
    // Forms
    email: 'Email',
    password: 'Пароль',
    fullName: 'Полное имя',
    confirmPassword: 'Подтвердите пароль',
    
    // Footer
    schoolAddress: 'Адрес школы',
    contactPhones: 'Контактные телефоны',
    emailContacts: 'Электронная почта',
    
    // Admin
    adminPanel: 'Админ панель',
    manageTeachers: 'Управление учителями',
    manageSchoolInfo: 'Управление информацией о школе',
    addTeacher: 'Добавить учителя',
    editTeacher: 'Редактировать учителя',
    deleteTeacher: 'Удалить учителя',
  },
  en: {
    // Navigation
    home: 'Home',
    schoolLife: 'School Life',
    admission: 'Admission',
    teachers: 'Teachers',
    admin: 'Admin',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    
    // Hero Section
    welcomeTitle: 'Welcome to our school',
    welcomeSubtitle: 'A place where every student can unlock their potential and achieve success',
    learnMore: 'Learn More',
    
    // School Life
    schoolLifeTitle: 'School Life',
    schoolLifeSubtitle: 'See how weekdays and holidays take place in our school',
    modernClassrooms: 'Modern Classrooms',
    sportsActivities: 'Sports Activities',
    library: 'School Library',
    canteen: 'School Canteen',
    events: 'Events and Concerts',
    laboratory: 'Science Laboratory',
    
    // Teachers
    ourTeachers: 'Our Teachers',
    
    // Admission
    admissionTitle: 'Admission to our school',
    admissionSubtitle: 'Learn all about the admission process, required documents and application deadlines',
    requirements: 'Requirements',
    admissionProcess: 'Admission Process',
    
    // Forms
    email: 'Email',
    password: 'Password',
    fullName: 'Full Name',
    confirmPassword: 'Confirm Password',
    
    // Footer
    schoolAddress: 'School Address',
    contactPhones: 'Contact Phones',
    emailContacts: 'Email Contacts',
    
    // Admin
    adminPanel: 'Admin Panel',
    manageTeachers: 'Manage Teachers',
    manageSchoolInfo: 'Manage School Info',
    addTeacher: 'Add Teacher',
    editTeacher: 'Edit Teacher',
    deleteTeacher: 'Delete Teacher',
  },
  kz: {
    // Navigation
    home: 'Басты бет',
    schoolLife: 'Мектеп өмірі',
    admission: 'Түсу',
    teachers: 'Мұғалімдер',
    admin: 'Әкімші',
    login: 'Кіру',
    register: 'Тіркелу',
    logout: 'Шығу',
    
    // Hero Section
    welcomeTitle: 'Біздің мектепке қош келдіңіз',
    welcomeSubtitle: 'Әр оқушы өз әлеуетін ашып, табысқа жете алатын орын',
    learnMore: 'Көбірек білу',
    
    // School Life
    schoolLifeTitle: 'Мектеп өмірі',
    schoolLifeSubtitle: 'Біздің мектепте күнделікті өмір мен мерекелер қалай өтетінін көріңіз',
    modernClassrooms: 'Заманауи сыныптар',
    sportsActivities: 'Спорт жаттығулары',
    library: 'Мектеп кітапханасы',
    canteen: 'Мектеп асханасы',
    events: 'Мерекелер мен концерттер',
    laboratory: 'Ғылыми зертхана',
    
    // Teachers
    ourTeachers: 'Біздің мұғалімдер',
    
    // Admission
    admissionTitle: 'Біздің мектепке түсу',
    admissionSubtitle: 'Түсу процесі, қажетті құжаттар және өтініш беру мерзімдері туралы барлық ақпарат',
    requirements: 'Талаптар',
    admissionProcess: 'Түсу процесі',
    
    // Forms
    email: 'Электрондық пошта',
    password: 'Құпия сөз',
    fullName: 'Толық аты-жөні',
    confirmPassword: 'Құпия сөзді растау',
    
    // Footer
    schoolAddress: 'Мектеп мекенжайы',
    contactPhones: 'Байланыс телефондары',
    emailContacts: 'Электрондық пошта',
    
    // Admin
    adminPanel: 'Әкімші панелі',
    manageTeachers: 'Мұғалімдерді басқару',
    manageSchoolInfo: 'Мектеп ақпаратын басқару',
    addTeacher: 'Мұғалім қосу',
    editTeacher: 'Мұғалімді өңдеу',
    deleteTeacher: 'Мұғалімді жою',
  }
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ru')
  
  const t = (key) => {
    return translations[language]?.[key] || key
  }
  
  const changeLanguage = (lang) => {
    setLanguage(lang)
  }
  
  const value = {
    language,
    changeLanguage,
    t
  }
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
} 