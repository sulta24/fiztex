# 🏫 PhysTech School Almaty

Современный веб-сайт для школы физики и технологий в Алматы, построенный на React + Tailwind CSS + Supabase.

![PhysTech School](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-blue?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Latest-green?logo=supabase)
![Vite](https://img.shields.io/badge/Vite-7.0.4-purple?logo=vite)

## ✨ Особенности

- 🎨 **Современный дизайн** - Красивый и отзывчивый интерфейс
- 📱 **Адаптивность** - Оптимизирован для всех устройств
- 🌍 **Мультиязычность** - Поддержка русского, английского и казахского языков
- 🌙 **Темная/светлая тема** - Переключение между режимами
- 🔐 **Админ-панель** - Управление контентом и учителями
- 📸 **Галерея** - Фотографии школьной жизни
- 🎓 **Информация о поступлении** - Детальная информация для абитуриентов
- 👨‍🏫 **Учителя** - Профили преподавателей с фото

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 18+ 
- npm или yarn
- Аккаунт Supabase

### Установка

1. **Клонируйте репозиторий**
```bash
git clone https://github.com/yourusername/phystech-school.git
cd phystech-school
```

2. **Установите зависимости**
```bash
npm install
```

3. **Настройте Supabase**
   - Создайте проект на [supabase.com](https://supabase.com)
   - Выполните SQL скрипты из `database/` папки
   - Скопируйте URL и ключ в `src/config/supabase.js`

4. **Запустите проект**
```bash
npm run dev
```

5. **Откройте браузер**
```
http://localhost:5173
```

## 🗄️ Настройка базы данных

### Создание таблиц

Выполните эти SQL команды в Supabase SQL Editor:

```sql
-- Таблица пользователей
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  role VARCHAR DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица учителей
CREATE TABLE teachers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  position VARCHAR NOT NULL,
  subject VARCHAR NOT NULL,
  education VARCHAR,
  experience VARCHAR,
  photo_url VARCHAR,
  bio TEXT,
  email VARCHAR,
  phone VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица информации о школе
CREATE TABLE school_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR UNIQUE NOT NULL,
  value TEXT NOT NULL,
  language VARCHAR DEFAULT 'ru' CHECK (language IN ('ru', 'en', 'kk')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица галереи
CREATE TABLE gallery_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  image_url VARCHAR NOT NULL,
  category VARCHAR DEFAULT 'general',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Отключение RLS (для простоты)

В Supabase Dashboard:
1. Перейдите в **"Authentication"** → **"Policies"**
2. Отключите RLS для всех таблиц

## 🔧 Конфигурация

### Supabase настройки

Обновите `src/config/supabase.js`:

```javascript
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'
```

### Админ доступ

По умолчанию админ:
- **Логин:** `admin`
- **Пароль:** `12345678`

## 📁 Структура проекта

```
phystech-school/
├── public/
│   ├── images/
│   │   ├── teachers/          # Фото учителей
│   │   └── teacher-placeholder.svg
├── src/
│   ├── components/
│   │   ├── admin/            # Админ компоненты
│   │   ├── auth/             # Аутентификация
│   │   └── ...               # Основные компоненты
│   ├── contexts/             # React контексты
│   ├── pages/                # Страницы
│   ├── config/               # Конфигурация
│   └── main.jsx              # Точка входа
├── database/                 # SQL скрипты
└── README.md
```

## 🎨 Компоненты

### Основные страницы
- **Главная** - Приветствие и основная информация
- **Школьная жизнь** - Галерея фотографий
- **Поступление** - Информация для абитуриентов
- **Учителя** - Профили преподавателей

### Админ-панель
- **Управление учителями** - Добавление/редактирование учителей
- **Управление галереей** - Загрузка фотографий
- **Управление контентом** - Редактирование информации о школе

## 🌐 Развертывание

### Vercel (рекомендуется)

1. **Подключите GitHub репозиторий к Vercel**
2. **Настройте переменные окружения:**
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
3. **Деплой автоматически запустится**

### Netlify

1. **Подключите репозиторий к Netlify**
2. **Настройте build команды:**
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Добавьте переменные окружения**

### Другие платформы

Проект совместим с любыми статическими хостингами:
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront

## 🛠️ Разработка

### Доступные команды

```bash
npm run dev          # Запуск в режиме разработки
npm run build        # Сборка для продакшена
npm run preview      # Предварительный просмотр сборки
npm run lint         # Проверка кода
```

### Технологии

- **Frontend:** React 18, Vite, Tailwind CSS 4
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **UI/UX:** Framer Motion, React Icons
- **Уведомления:** React Hot Toast

## 📝 Лицензия

MIT License - см. файл [LICENSE](LICENSE)

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add amazing feature'`)
4. Отправьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📞 Поддержка

Если у вас есть вопросы или проблемы:

- 📧 Email: support@phystech.edu.kz
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/phystech-school/issues)
- 📖 Документация: [Wiki](https://github.com/yourusername/phystech-school/wiki)

## 🙏 Благодарности

- [React](https://reactjs.org/) - за отличную библиотеку
- [Tailwind CSS](https://tailwindcss.com/) - за стильный CSS фреймворк
- [Supabase](https://supabase.com/) - за мощную backend платформу
- [Vite](https://vitejs.dev/) - за быстрый build инструмент

---

**PhysTech School Almaty** - Школа физики и технологий в Алматы 🏫✨
