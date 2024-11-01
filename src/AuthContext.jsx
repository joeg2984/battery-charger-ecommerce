import { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "./supabase";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const updateSession = (access_token, User_id) => {
        setToken(access_token);
        setUser(User_id);
        sessionStorage.setItem('sb-access-token', access_token);
        sessionStorage.setItem('sb-user', User_id);
    }

    const clearSession = () => {
        setToken(null);
        setUser(null);
        sessionStorage.removeItem('sb-access-token');
        sessionStorage.removeItem('sb-user');
    }

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error.message);
            return;
        }
        clearSession();
    }

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                updateSession(session.access_token, session.user.id);
            }
            if (!session && event === 'SIGNED_OUT') {
                clearSession();
            }
        });

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
