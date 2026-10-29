import { createContext, useContext, useEffect, useState } from "react";
import { getMyProfile } from "../api/usersApi";
import { logout as logoutRequest } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function refreshUser() {
        try {
            const profile = await getMyProfile();
            setUser(profile);
            return profile;
        } catch {
            setUser(null);
            return null;
        }
    }

    async function logout() {
        try {
            await logoutRequest();
        } catch (error) {
            console.error(error);
        } finally {
            setUser(null);
        }
    }

    useEffect(() => {
        refreshUser().finally(() => setLoading(false));
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, setUser, refreshUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
}
