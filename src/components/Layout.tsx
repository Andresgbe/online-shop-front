import { Outlet, Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

export default function Layout() {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            <div className="flex gap-8 items-center">
              <Link to="/" className="text-xl font-bold text-gray-900">
                Shop
              </Link>
              <Link to="/products" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Productos
              </Link>
            </div>

            <div className="flex gap-4 items-center">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-gray-600">Hola, {user?.name}</span>
                  <button
                    onClick={logout}
                    className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                  >
                    Salir
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                    Ingresar
                  </Link>
                  <Link
                    to="/register"
                    className="text-sm font-medium bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}