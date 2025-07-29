import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { ThemeProvider } from './contexts/ThemeContext'

// Components
import Header from './components/Header'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import SchoolLifePage from './pages/SchoolLifePage'
import AdmissionPage from './pages/AdmissionPage'
import TeachersPage from './pages/TeachersPage'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import AdminPanel from './pages/AdminPanel'

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen bg-[#f3f6fa] dark:bg-gradient-to-br dark:from-[#1e3c72] dark:to-[#2a5298] transition-all duration-500">
              <Routes>
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Admin Routes */}
                <Route 
                  path="/admin/*" 
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminPanel />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Main Routes */}
                <Route path="/*" element={
                  <>
                    <Header />
                    <main>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/school-life" element={<SchoolLifePage />} />
                        <Route path="/admission" element={<AdmissionPage />} />
                        <Route path="/teachers" element={<TeachersPage />} />
                      </Routes>
                    </main>
                    <Footer />
                  </>
                } />
              </Routes>
            </div>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App 