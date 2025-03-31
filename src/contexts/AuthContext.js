import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const parseLocalStorage = (key, defaultValue) => {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item);
      } catch (e) {
        console.error(`Erro ao parsear ${key} do localStorage:`, e);
        return defaultValue;
      }
    }
    return defaultValue;
  };

  const [user, setUser] = useState(parseLocalStorage('user', null));
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const login = (userData, jwtToken) => {

    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = useMemo(() => ({ user, token, login, logout }), [user, token]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}