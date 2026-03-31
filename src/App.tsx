// BrowserRouter: envuelve toda la app y activa el sistema de rutas
// Routes: contenedor de todas las rutas
// Route: define una ruta específica (path + componente a mostrar)
// Navigate: redirige automáticamente de una ruta a otra
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Toaster: muestra notificaciones tipo toast (éxito, error, etc)
import { Toaster } from 'react-hot-toast';

// Las páginas que va a manejar el router
// Products aún no existe, la creamos en el paso 3
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <BrowserRouter>
      {/* Toaster va aquí arriba para que funcione en toda la app */}
      <Toaster position="top-right" />
      <Routes>
        {/* Si alguien va a "/" lo mandamos directo a "/products" */}
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}