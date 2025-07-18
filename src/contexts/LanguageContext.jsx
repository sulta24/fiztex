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
    
    // School Life Descriptions
    schoollife_modern_desc: 'Оборудованные по последним стандартам учебные аудитории',
    schoollife_sports_desc: 'Просторный спортивный зал для физкультуры и секций',
    schoollife_library_desc: 'Богатая коллекция книг и комфортная зона для чтения',
    schoollife_canteen_desc: 'Здоровое и вкусное питание для всех учеников',
    schoollife_events_desc: 'Яркие школьные мероприятия и творческие выступления',
    schoollife_lab_desc: 'Современное оборудование для изучения естественных наук',
    schoollife_loading: 'Загрузка...',
    schoollife_no_data: 'Нет данных в таблице gallery_items, используются дефолтные данные.',
    schoollife_error: 'Ошибка загрузки галереи: ',
    
    // Teachers
    ourTeachers: 'Наши учителя',
    
    // Admission
    admissionTitle: 'Поступление в нашу школу',
    admissionSubtitle: 'Узнайте все о процессе поступления, необходимых документах и сроках подачи заявлений',
    requirements: 'Требования',
    admissionProcess: 'Процесс поступления',
    
    // Admission Requirements
    requirement_age: 'Возраст на 1 сентября: для 1 класса - от 6,5 до 8 лет',
    requirement_medical: 'Отсутствие медицинских противопоказаний к обучению',
    requirement_ready: 'Готовность ребенка к школьному обучению (по результатам собеседования)',
    requirement_profile: 'Для поступления в профильные классы - успешное прохождение вступительных испытаний',
    requirement_registration: 'Наличие регистрации в закрепленном микрорайоне (для приема в 1 класс)',
    // Specialized Classes
    spec_math: 'Математический класс',
    spec_math_req: 'тестирование по математике и логике',
    spec_lang: 'Лингвистический класс',
    spec_lang_req: 'тестирование по русскому и английскому языкам',
    spec_sci: 'Естественно-научный класс',
    spec_sci_req: 'тестирование по математике и естествознанию',
    spec_hum: 'Гуманитарный класс',
    spec_hum_req: 'творческое задание и собеседование',
    
    // Forms
    email: 'Email',
    password: 'Пароль',
    fullName: 'Полное имя',
    confirmPassword: 'Подтвердите пароль',
    
    // Footer
    schoolAddress: 'Адрес школы',
    contactPhones: 'Контактные телефоны',
    emailContacts: 'Электронная почта',
    footer_address: 'Адрес',
    footer_address_value: 'г. Алматы, ул. Школьная, д. 1',
    footer_index: 'Индекс',
    footer_index_value: '050000',
    footer_district: 'Район',
    footer_district_value: 'Алмалинский район',
    footer_reception: 'Приемная',
    footer_reception_value: '+7 (727) 123-45-67',
    footer_director: 'Директор',
    footer_director_phone: '+7 (727) 123-45-68',
    footer_vice: 'Заместитель директора',
    footer_vice_value: '+7 (727) 123-45-69',
    footer_admission: 'Приемная комиссия',
    footer_admission_value: '+7 (727) 123-45-70',
    footer_general: 'Общий',
    footer_general_email: 'info@phystech-almaty.edu.kz',
    footer_director_email: 'director@phystech-almaty.edu.kz',
    footer_admission_email: 'admission@phystech-almaty.edu.kz',
    footer_support: 'Техподдержка',
    footer_support_email: 'support@phystech-almaty.edu.kz',
    footer_working_hours: 'Режим работы',
    footer_mon_fri: 'Понедельник - Пятница',
    footer_mon_fri_value: '8:00 - 18:00',
    footer_sat: 'Суббота',
    footer_sat_value: '9:00 - 15:00',
    footer_sun: 'Воскресенье',
    footer_sun_value: 'Выходной',
    footer_reception_hours: '8:30 - 17:30',
    footer_school_name: 'PhysTech School Almaty',
    footer_school_desc: 'Современная школа с физико-математическим уклоном, где каждый ученик может раскрыть свой потенциал и получить качественное образование. Мы готовим будущих ученых, инженеров и лидеров в области точных наук и технологий.',
    footer_years_exp: 'лет опыта',
    footer_students: 'учеников',
    footer_teachers: 'преподавателей',
    footer_university: 'поступление в вузы',
    footer_license: 'Лицензия: АБ №0123456',
    footer_accreditation: 'Аккредитация: СГ №0654321',
    footer_rights_reserved: 'Все права защищены.',
    footer_privacy: 'Политика конфиденциальности',
    footer_terms: 'Правила использования',
    footer_sitemap: 'Карта сайта',
    
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
    
    // School Life Descriptions
    schoollife_modern_desc: 'Equipped classrooms to the latest standards',
    schoollife_sports_desc: 'Spacious gym for physical education and clubs',
    schoollife_library_desc: 'Rich collection of books and a comfortable reading area',
    schoollife_canteen_desc: 'Healthy and tasty food for all students',
    schoollife_events_desc: 'Bright school events and creative performances',
    schoollife_lab_desc: 'Modern equipment for studying natural sciences',
    schoollife_loading: 'Loading...',
    schoollife_no_data: 'No data in gallery_items table, using default data.',
    schoollife_error: 'Gallery loading error: ',
    
    // Teachers
    ourTeachers: 'Our Teachers',
    
    // Admission
    admissionTitle: 'Admission to our school',
    admissionSubtitle: 'Learn all about the admission process, required documents and application deadlines',
    requirements: 'Requirements',
    admissionProcess: 'Admission Process',
    
    // Admission Requirements
    requirement_age: 'Age as of September 1: for 1st grade - from 6.5 to 8 years',
    requirement_medical: 'No medical contraindications for studying',
    requirement_ready: 'Child’s readiness for school education (based on interview results)',
    requirement_profile: 'For admission to specialized classes - successful entrance exams',
    requirement_registration: 'Registration in the assigned district (for 1st grade admission)',
    // Specialized Classes
    spec_math: 'Mathematics Class',
    spec_math_req: 'testing in mathematics and logic',
    spec_lang: 'Linguistic Class',
    spec_lang_req: 'testing in Russian and English languages',
    spec_sci: 'Science Class',
    spec_sci_req: 'testing in mathematics and science',
    spec_hum: 'Humanities Class',
    spec_hum_req: 'creative task and interview',
    
    // Forms
    email: 'Email',
    password: 'Password',
    fullName: 'Full Name',
    confirmPassword: 'Confirm Password',
    
    // Footer
    schoolAddress: 'School Address',
    contactPhones: 'Contact Phones',
    emailContacts: 'Email Contacts',
    footer_address: 'Address',
    footer_address_value: '1 Shkolnaya St., Almaty',
    footer_index: 'Index',
    footer_index_value: '050000',
    footer_district: 'District',
    footer_district_value: 'Almalinsky district',
    footer_reception: 'Reception',
    footer_reception_value: '+7 (727) 123-45-67',
    footer_director: 'Director',
    footer_director_phone: '+7 (727) 123-45-68',
    footer_vice: 'Deputy Director',
    footer_vice_value: '+7 (727) 123-45-69',
    footer_admission: 'Admission Office',
    footer_admission_value: '+7 (727) 123-45-70',
    footer_general: 'General',
    footer_general_email: 'info@phystech-almaty.edu.kz',
    footer_director_email: 'director@phystech-almaty.edu.kz',
    footer_admission_email: 'admission@phystech-almaty.edu.kz',
    footer_support: 'Support',
    footer_support_email: 'support@phystech-almaty.edu.kz',
    footer_working_hours: 'Working Hours',
    footer_mon_fri: 'Monday - Friday',
    footer_mon_fri_value: '8:00 - 18:00',
    footer_sat: 'Saturday',
    footer_sat_value: '9:00 - 15:00',
    footer_sun: 'Sunday',
    footer_sun_value: 'Day off',
    footer_reception_hours: '8:30 - 17:30',
    footer_school_name: 'PhysTech School Almaty',
    footer_school_desc: 'A modern school with a focus on physics and mathematics, where every student can unlock their potential and receive a quality education. We prepare future scientists, engineers, and leaders in the field of exact sciences and technology.',
    footer_years_exp: 'years of experience',
    footer_students: 'students',
    footer_teachers: 'teachers',
    footer_university: 'university admission',
    footer_license: 'License: AB №0123456',
    footer_accreditation: 'Accreditation: SG №0654321',
    footer_rights_reserved: 'All rights reserved.',
    footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms of Use',
    footer_sitemap: 'Sitemap',
    
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
    
    // School Life Descriptions
    schoollife_modern_desc: 'Соңғы стандарттарға сай жабдықталған оқу аудиториялары',
    schoollife_sports_desc: 'Дене шынықтыру мен секциялар үшін кең спорт залы',
    schoollife_library_desc: 'Кітаптардың бай қоры және жайлы оқу аймағы',
    schoollife_canteen_desc: 'Барлық оқушыларға арналған пайдалы және дәмді тағам',
    schoollife_events_desc: 'Жарқын мектеп іс-шаралары мен шығармашылық қойылымдар',
    schoollife_lab_desc: 'Жаратылыстану ғылымдарын оқуға арналған заманауи жабдық',
    schoollife_loading: 'Жүктелуде...',
    schoollife_no_data: 'gallery_items кестесінде деректер жоқ, әдепкі деректер қолданылады.',
    schoollife_error: 'Галереяны жүктеу қатесі: ',
    
    // Teachers
    ourTeachers: 'Біздің мұғалімдер',
    
    // Admission
    admissionTitle: 'Біздің мектепке түсу',
    admissionSubtitle: 'Түсу процесі, қажетті құжаттар және өтініш беру мерзімдері туралы барлық ақпарат',
    requirements: 'Талаптар',
    admissionProcess: 'Түсу процесі',
    
    // Admission Requirements
    requirement_age: '1 қыркүйектегі жас: 1-сыныпқа – 6,5-тен 8 жасқа дейін',
    requirement_medical: 'Оқуға медициналық қарсы көрсетілімдердің болмауы',
    requirement_ready: 'Баланы мектепке оқытуға дайындығы (әңгімелесу нәтижелері бойынша)',
    requirement_profile: 'Профильдік сыныптарға түсу үшін – қабылдау емтихандарынан сәтті өту',
    requirement_registration: 'Тіркелген микроауданда тіркелуі (1-сыныпқа қабылдау үшін)',
    // Specialized Classes
    spec_math: 'Математикалық сынып',
    spec_math_req: 'математика және логика бойынша тестілеу',
    spec_lang: 'Лингвистикалық сынып',
    spec_lang_req: 'орыс және ағылшын тілдерінен тестілеу',
    spec_sci: 'Жаратылыстану-ғылыми сынып',
    spec_sci_req: 'математика және жаратылыстану бойынша тестілеу',
    spec_hum: 'Гуманитарлық сынып',
    spec_hum_req: 'шығармашылық тапсырма және әңгімелесу',
    
    // Forms
    email: 'Электрондық пошта',
    password: 'Құпия сөз',
    fullName: 'Толық аты-жөні',
    confirmPassword: 'Құпия сөзді растау',
    
    // Footer
    schoolAddress: 'Мектеп мекенжайы',
    contactPhones: 'Байланыс телефондары',
    emailContacts: 'Электрондық пошта',
    footer_address: 'Мекенжай',
    footer_address_value: 'Алматы қ., Школьная к-сі, 1 үй',
    footer_index: 'Индекс',
    footer_index_value: '050000',
    footer_district: 'Аудан',
    footer_district_value: 'Алмалы ауданы',
    footer_reception: 'Қабылдау',
    footer_reception_value: '+7 (727) 123-45-67',
    footer_director: 'Директор',
    footer_director_phone: '+7 (727) 123-45-68',
    footer_vice: 'Директордың орынбасары',
    footer_vice_value: '+7 (727) 123-45-69',
    footer_admission: 'Қабылдау комиссиясы',
    footer_admission_value: '+7 (727) 123-45-70',
    footer_general: 'Жалпы',
    footer_general_email: 'info@phystech-almaty.edu.kz',
    footer_director_email: 'director@phystech-almaty.edu.kz',
    footer_admission_email: 'admission@phystech-almaty.edu.kz',
    footer_support: 'Техқолдау',
    footer_support_email: 'support@phystech-almaty.edu.kz',
    footer_working_hours: 'Жұмыс уақыты',
    footer_mon_fri: 'Дүйсенбі - Жұма',
    footer_mon_fri_value: '8:00 - 18:00',
    footer_sat: 'Сенбі',
    footer_sat_value: '9:00 - 15:00',
    footer_sun: 'Жексенбі',
    footer_sun_value: 'Демалыс',
    footer_reception_hours: '8:30 - 17:30',
    footer_school_name: 'PhysTech School Almaty',
    footer_school_desc: 'Физика-математикаға бейімделген заманауи мектеп, мұнда әр оқушы өз әлеуетін ашып, сапалы білім ала алады. Біз болашақ ғалымдарды, инженерлерді және нақты ғылымдар мен технологиялар саласындағы көшбасшыларды дайындаймыз.',
    footer_years_exp: 'жыл тәжірибе',
    footer_students: 'оқушы',
    footer_teachers: 'мұғалім',
    footer_university: 'ЖОО-ға түсу',
    footer_license: 'Лицензия: АБ №0123456',
    footer_accreditation: 'Аккредитация: СГ №0654321',
    footer_rights_reserved: 'Барлық құқықтар қорғалған.',
    footer_privacy: 'Құпиялық саясаты',
    footer_terms: 'Пайдалану ережелері',
    footer_sitemap: 'Сайт картасы',
    
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