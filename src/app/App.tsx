// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppProviders } from "./providers/providers";
import { useAuthStore } from "../entities/StoreAuth/model/store";
import Main from "../pages/mainPage/Main";
import LoginPage from "../pages/LoginPage/LoginPage";
import './styles/App.css'

export function App() {
  const token = useAuthStore(state => state.token);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Простая инициализация - приложение готово после монтирования
    setIsAppReady(true);
  }, []);

  // Пока приложение не готово, можно показать loading
  if (!isAppReady) {
    return <div>Loading...</div>;
  }

  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Main />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              <Route path="/auth" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/auth" replace />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}