import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isLoggedIn = user !== null;

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const response = await fetch(
        `http://localhost:3001/users?email=${email}&password=${password}`
      );
      const users = await response.json();

      const foundUser = users[0];

      if (foundUser) {
        setUser(foundUser);
        return { success: true };
      } else {
        return { success: false, message: 'Неправильний email або пароль' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const register = async (email, name, password) => {
    try {
      const checkResponse = await fetch(
        `http://localhost:3001/users?email=${email}`
      );
      const existingUser = await checkResponse.json();

      if (existingUser.length > 0) {
        return { success: false, message: 'Цей email вже зареєстровано' };
      }

      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password }),
      });

      const newUser = await response.json();

      if (response.ok) {
        setUser(newUser);
        return { success: true };
      } else {
        return { success: false, message: 'Помилка сервера при реєстрації' };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
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

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
