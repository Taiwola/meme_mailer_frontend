'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/app/component/navbar';
import Footer from '@/app/component/footer';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast';

interface AuthState {
    user: {
        _id: string,
    } | null; // Allow user to be either an object or null
    isAuthenticated: boolean;
}

interface AppContextProps {
    authState: AuthState;
    setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
    theme: string;
    toggleTheme: () => void;
    notifications: string[];
    addNotification: (message: string) => void;
    removeNotification: (index: number) => void;
    authToken: string;
    setToken:  React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextProps | null>(null);

export const Providers = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const [queryClient] = useState(() => new QueryClient);
    const [authState, setAuthState] = useState<AuthState>({ user: null, isAuthenticated: false });
    const [theme, setTheme] = useState('light');
    const [notifications, setNotifications] = useState<string[]>([]);
    const [authToken, setToken] = useState('');

    const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    const addNotification = (message: string) => setNotifications((prev) => [...prev, message]);
    const removeNotification = (index: number) => setNotifications((prev) => prev.filter((_, i) => i !== index));

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedIsAuthenticated = localStorage.getItem('isAuthenticated') === "true";
        const storedUser = localStorage.getItem('userId');
        if (storedToken && storedIsAuthenticated && storedUser) {
            setAuthState({ user: { _id: storedUser }, isAuthenticated: true });
            setToken(storedToken);
        }
    }, []);
    
   
    // Store auth state to localStorage on change
    useEffect(() => {
        if (authState.isAuthenticated) {
            localStorage.setItem('token', authToken);
            localStorage.setItem('isAuthenticated', "true");
            localStorage.setItem('userId', authState.user?._id || '');
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('userId');
        }
    }, [authState, authToken]);

    return (
        <AppContext.Provider
            value={{
                authState,
                setAuthState,
                theme,
                toggleTheme,
                notifications,
                addNotification,
                removeNotification,
                authToken,
                setToken
            }}
        >
             <Toaster /> 
            {pathname === '/' || pathname === '/sign-in' || pathname === '/sign-up' ? (
                <>

                    <Navbar />
                        <QueryClientProvider client={queryClient}>
                {children}    
            </QueryClientProvider>
                    <Footer />
                </>
            ) : (
                <QueryClientProvider client={queryClient}>
                {children}    
            </QueryClientProvider>
            )}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within a Providers');
    }
    return context;
};
