import { Provider } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import MainLayout from "./components/layout/MainLayout"
import { LanguageProvider } from "./i18n"
import { store } from "./store"

function App() {

  
  return (
    
    
    <>
     
      <Provider store={store}> 
     
      <LanguageProvider> 
     
       {/* <ThemeSync /> */}
       
     
       {/* <BrowserRouter>
         <Routes> */}
           
           {/* <Route path="/" element={<Welcome />} />
           <Route path="/login" element={<LoginForm />} />
           <Route path="/register" element={<RegisterForm />} /> */}

           {/* Protected Routes - Giriş edilməlidir */}
           {/* <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
             <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/transactions" element={<Transactions />} /> */}
             {/* ... digər səhifələr */}
             <MainLayout/>
  <p>SS</p>
            {/* </Route> */}
         {/* </Routes>
       </BrowserRouter>  */}

      </LanguageProvider> 
    </Provider> 
  </>
  )
}

export default App
