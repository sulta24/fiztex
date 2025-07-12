-- PhysTech School Almaty Database Schema
-- Создание таблиц для веб-сайта школы физики и технологий

-- Включение расширений
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Таблица пользователей
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  role VARCHAR DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица учителей
CREATE TABLE IF NOT EXISTS teachers (
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
CREATE TABLE IF NOT EXISTS school_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR UNIQUE NOT NULL,
  value TEXT NOT NULL,
  language VARCHAR DEFAULT 'ru' CHECK (language IN ('ru', 'en', 'kk')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица галереи
CREATE TABLE IF NOT EXISTS gallery_items (
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

-- Создание индексов для оптимизации
CREATE INDEX IF NOT EXISTS idx_teachers_subject ON teachers(subject);
CREATE INDEX IF NOT EXISTS idx_school_info_language ON school_info(language);
CREATE INDEX IF NOT EXISTS idx_gallery_items_category ON gallery_items(category);
CREATE INDEX IF NOT EXISTS idx_gallery_items_active ON gallery_items(is_active);

-- Функция для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Триггеры для автоматического обновления updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON teachers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_school_info_updated_at BEFORE UPDATE ON school_info
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_items_updated_at BEFORE UPDATE ON gallery_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Вставка демо-данных для учителей
INSERT INTO teachers (name, position, subject, education, experience, bio, email, phone) VALUES
('Анна Петрова', 'Учитель физики', 'Физика', 'МГУ им. Ломоносова, физический факультет', '15 лет', 'Опытный преподаватель физики с глубокими знаниями в области механики и электродинамики. Автор методических пособий для школьников.', 'anna.petrova@phystech.kz', '+7 777 123 4567'),
('Марат Ахметов', 'Учитель математики', 'Математика', 'КБГУ, математический факультет', '12 лет', 'Специалист по высшей математике и подготовке к олимпиадам. Подготовил более 50 призеров республиканских олимпиад.', 'marat.akhmetov@phystech.kz', '+7 777 234 5678'),
('Елена Сидорова', 'Учитель химии', 'Химия', 'АГУ им. Абая, химический факультет', '10 лет', 'Эксперт в области органической химии. Разработала уникальную методику преподавания химии для школьников.', 'elena.sidorova@phystech.kz', '+7 777 345 6789'),
('Дамир Нурланов', 'Учитель информатики', 'Информатика', 'МУИТ, факультет информационных технологий', '8 лет', 'Специалист по программированию и робототехнике. Руководитель школьного кружка робототехники.', 'damir.nurlanov@phystech.kz', '+7 777 456 7890');

-- Вставка базовой информации о школе
INSERT INTO school_info (key, value, language) VALUES
('school_name', 'PhysTech School Almaty', 'en'),
('school_name', 'Школа физики и технологий Алматы', 'ru'),
('school_name', 'Алматы физика және технология мектебі', 'kk'),
('school_description', 'Leading school of physics and technology in Almaty', 'en'),
('school_description', 'Ведущая школа физики и технологий в Алматы', 'ru'),
('school_description', 'Алматыдағы физика және технологияның жетекші мектебі', 'kk'),
('address', 'Almaty, Kazakhstan', 'en'),
('address', 'Алматы, Казахстан', 'ru'),
('address', 'Алматы, Қазақстан', 'kk'),
('phone', '+7 727 123 4567', 'en'),
('phone', '+7 727 123 4567', 'ru'),
('phone', '+7 727 123 4567', 'kk'),
('email', 'info@phystech.kz', 'en'),
('email', 'info@phystech.kz', 'ru'),
('email', 'info@phystech.kz', 'kk');

-- Вставка демо-данных для галереи
INSERT INTO gallery_items (title, description, image_url, category, sort_order) VALUES
('Школьная лаборатория', 'Современная лаборатория для проведения физических экспериментов', '/images/lab.jpg', 'facilities', 1),
('Урок физики', 'Увлекательный урок физики в 10 классе', '/images/physics-class.jpg', 'classes', 2),
('Олимпиада по математике', 'Республиканская олимпиада по математике', '/images/math-olympiad.jpg', 'events', 3),
('Робототехника', 'Кружок робототехники для старшеклассников', '/images/robotics.jpg', 'activities', 4),
('Выпускной вечер', 'Торжественный выпускной вечер 2024 года', '/images/graduation.jpg', 'events', 5);

-- Комментарии к таблицам
COMMENT ON TABLE users IS 'Пользователи системы (админы и обычные пользователи)';
COMMENT ON TABLE teachers IS 'Учителя школы с их профилями и информацией';
COMMENT ON TABLE school_info IS 'Информация о школе на разных языках';
COMMENT ON TABLE gallery_items IS 'Фотографии школьной жизни и мероприятий'; 