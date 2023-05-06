import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState, useCallback, useEffect } from 'react';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/navbar/Navbar';
import { AuthContext } from './context/authContext';

const queryClient = new QueryClient();

function App() {
  const [token, setToken] = useState<null | string>(null);
  const [userId, setUserId] = useState<null | string>(null);

  const login = useCallback((userId: string, token: string) => {
    setToken(token);
    setUserId(userId);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logout" element={<Login />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!false,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          {routes}
        </BrowserRouter>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

export default App;
