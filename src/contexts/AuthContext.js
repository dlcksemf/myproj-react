import useAuth from 'components/hooks/useAuth';
import { createContext, useContext } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  console.log('AuthProvider Working!');
  const [auth, setAuth, login, logout] = useAuth();

  return (
    <AuthContext.Provider value={{ login, logout, auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

function useContextAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useContextAuth };
