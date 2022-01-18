import useLocalStorage from 'components/hooks/useLocalStorage';
const { createContext, useCallback, useContext } = require('react');

const AuthContext = createContext();

const INITIAL_AUTH = { isLoggedIn: false };

function AuthProvider({ children }) {
  const [auth, setAuth] = useLocalStorage('auth', INITIAL_AUTH);

  const login = useCallback(
    ({ access, refresh, username, first_name, last_name }) => {
      setAuth({
        isLoggedIn: true,
        access,
        refresh,
        username,
        first_name,
        last_name,
      });
    },
    [setAuth],
  );

  const logout = useCallback(() => {
    setAuth({
      isLoggedIn: false,
    });
  }, [setAuth]);

  return (
    <AuthContext.Provider value={{ login, logout, auth }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { useAuth, AuthProvider };
