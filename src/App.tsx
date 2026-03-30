import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/auth';

import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

const Home = () => (
  <div className="text-center mt-20">
    <h1 className="text-4xl font-bold text-gray-900">Bienvenido a la Tienda</h1>
    <p className="mt-4 text-gray-500">Encuentra los mejores productos aquí.</p>
  </div>
);

function App() {
  const { loadUser, isLoading } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 font-medium">Cargando sesión...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<div>Perfil del Usuario (Protegido)</div>} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;