import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');

    return savedUser ? { ...JSON.parse(savedUser), token: savedToken } : null;
  });

  const isLoggedIn = user !== null;

  useEffect(() => {
    if (user && user.token) {
      const { token, ...userDetails } = user;
      localStorage.setItem('user', JSON.stringify(userDetails));
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL;

      const response = await fetch(`${baseUrl}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem(
          'user',
          JSON.stringify({ _id: data._id, name: data.name, email: data.email })
        );
        setUser({ ...data, token: data.token });
        return { success: true };
      } else {
        return {
          success: false,
          message: data.message || 'Неправильний email або пароль',
        };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const register = async (email, name, password) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL;

      const response = await fetch(`${baseUrl}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem(
          'user',
          JSON.stringify({ _id: data._id, name: data.name, email: data.email })
        );
        setUser({ ...data, token: data.token });
        return { success: true };
      } else {
        return {
          success: false,
          message: data.message || 'Помилка реєстрації',
        };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
