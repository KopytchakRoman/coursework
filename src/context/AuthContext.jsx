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
      const response = await fetch('/api/users.json');
      const users = await response.json();
      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );
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

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// --- ВИПРАВЛЕННЯ ---
// Ми додаємо цей коментар, щоб сказати ESLint ігнорувати
// цю помилку, оскільки 'useAuth' - це хук, а не компонент.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
