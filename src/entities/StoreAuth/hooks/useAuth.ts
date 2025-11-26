import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth";
import { useAuthStore } from "../model/store";

export const useLogin = () => {
    const login = useAuthStore(state => state.login);

    return useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            login(data.user, data.token);
        }
    })
}

export const useRegister = () => {
    const login = useAuthStore(state => state.login);

    return useMutation({
        mutationFn: authApi.register,
        onSuccess: (data) => {
            login(data.user, data.token);
        }
    })
}

export const useLogout = () => {
    const logout = useAuthStore(state => state.logout);

    return useMutation({
        mutationFn: authApi.logout,
        onSuccess: () => {
            logout();
        }
    })
}
