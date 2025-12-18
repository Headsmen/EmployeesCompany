import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { AppProviders } from "./providers/providers";
import { useSessionStore } from "@/entities/session";
import Main from "../pages/mainPage/ui/Main";
import LoginPage from "../pages/LoginPage/ui/LoginPage";
import './styles/index.css'
import RegisterPage from "../pages/RegisterPage/ui/Register";

export function App() {
  const { isAuthenticated, initSession } = useSessionStore();

  useEffect(() => {
    initSession();
  }, [initSession]);

  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Main />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}