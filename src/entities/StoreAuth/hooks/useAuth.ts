// entities/StoreAuth/hooks/useAuth.ts
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth";
import { useAuthStore } from "../model/store";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const login = useAuthStore(state => state.login);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            // Теперь передаем сначала user, потом token
            login(data.user, data.token);
            navigate("/");
        },
        onError: (error: Error) => {
            console.error('Login error:', error.message);
        }
    })
}

export const useRegister = () => {
    const login = useAuthStore(state => state.login);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: authApi.register,
        onSuccess: (data) => {
            // Теперь передаем сначала user, потом token
            login(data.user, data.token);
            navigate("/");
        },
        onError: (error: Error) => {
            console.error('Registration error:', error.message);
        }
    })
}

export const useLogout = () => {
    const logout = useAuthStore(state => state.logout);
    const navigate = useNavigate();

    return useMutation({
        mutationFn: authApi.logout,
        onSuccess: () => {
            logout();
            navigate("/login");
        }
    })
}