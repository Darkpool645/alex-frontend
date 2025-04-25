import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import router from "@/routes/mainRoutes.jsx";
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/context/AuthContext';
import { ExamProvider } from '@/context/ExamContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ExamProvider>
        <ToastContainer />
        <RouterProvider router={router} />
      </ExamProvider>
    </AuthProvider>
  </StrictMode>,
)
