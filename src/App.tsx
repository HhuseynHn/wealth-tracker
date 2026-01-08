  import { Provider } from "react-redux"
  import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

  import MainLayout from "./components/layout/MainLayout"
  import { LanguageProvider } from "./i18n"
  import { store } from "./store"
  import { Dashboard, Goals, Investments, Notifications, Pricing, Profile, Reports, Transactions, Welcome } from "./pages"
  import { LoginForm, ProtectedRoute, RegisterForm } from "./components/auth"
  import { useEffect } from "react"
  import { useAppDispatch } from "./store/hooks"
  import { syncWithSystem } from "./store/themeSlice"
  import ThemeEffect from "./components/common/ThemeEffect"


  const ThemeSync = () => {
    const dispatch = useAppDispatch()
  console.log("TemSync")
    useEffect(() => {
      const mq = window.matchMedia("(prefers-color-scheme: dark)")
      const handler = () => dispatch(syncWithSystem())

      mq.addEventListener("change", handler)
      return () => mq.removeEventListener("change", handler)
    }, [dispatch])

    return null
  }

  function App() {

    
    return (  
            <>
      
        <Provider store={store}> 
      
        <LanguageProvider> 
      
        <ThemeSync />
        <ThemeEffect/>
            
          <BrowserRouter>
          <Routes> 
            
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} /> 

            {/* Protected Routes - Giriş edilməlidir */}
            
              <Route element={<ProtectedRoute> <MainLayout /> </ProtectedRoute>}>
              
              <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/investments" element={<Investments />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/notifications" element={<Notifications />} />
              
                </Route>

  {/* Redirect unknown routes to welcome */}
  <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </BrowserRouter>  
        </LanguageProvider> 
      </Provider> 
    </>
    )
  }

  export default App
