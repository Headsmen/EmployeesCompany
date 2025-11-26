import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { AppProviders } from "./providers/providers";
import { useAuthStore } from "../entities/StoreAuth/model/store";
import Main from "../pages/mainPage/Main";
import LoginPage from "../pages/LoginPage/LoginPage";
import './styles/index.css'
import RegisterPage from "../pages/RegisterPage/Register";

export function App() {
  const { isAuthenticated, initAuth } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/profile" element={<ProfilePage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/music" element={<MusicPage />} /> */}

          {/* Общие маршруты для всех пользователей */}
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