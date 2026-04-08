import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuthStore } from './store/auth';

import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  // loadUser: al iniciar la app, revisa si hay tokens en localStorage
  // y si los hay, los usa para obtener el perfil del usuario.
  // Así la sesión se mantiene aunque el usuario recargue la página.
  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Rutas públicas — dentro de Layout (tienen navbar) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Rutas privadas — dentro de Layout + protección de auth */}
        {/* Aquí irán: /cart, /orders, /profile cuando los construyas */}
        <Route element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            {/* <Route path="/cart" element={<Cart />} /> */}
            {/* <Route path="/orders" element={<Orders />} /> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}