# 🚀 Быстрая настройка PhysTech School Website

## 1. Установка зависимостей (если еще не установлены)
```bash
npm install
```

## 2. Настройка Supabase

### Создайте проект в Supabase:
1. Откройте [supabase.com](https://supabase.com)
2. Создайте новый проект
3. Скопируйте URL и anon key из Settings > API

### Обновите конфигурацию:
Отредактируйте `src/config/supabase.js` и замените:
```javascript
const supabaseUrl = 'https://ваш-проект.supabase.co'
const supabaseAnonKey = 'ваш-anon-key'
```

### Создайте таблицы в SQL Editor:
Скопируйте и выполните SQL из файла README.md

## 3. Запуск проекта
```bash
npm run dev
```

## 4. Доступ к админ панели
- URL: http://localhost:5173/login
- Логин: `admin`
- Пароль: `12345678`

## 5. Добавление изображений
Поместите фотографии в папку `public/images/`

---

**Все готово! 🎉**

Для подробной инструкции смотрите README.md 