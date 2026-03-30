import { useEffect, useState } from 'react';
import { productsService } from '../services/products';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';


export default function Home() {
  // 1. Definimos los estados (Data, Loading, Error)
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Efecto secundario para buscar la data al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Usamos nuestro servicio. El backend por defecto trae limit: 12 y ordenado por fecha
        const response = await productsService.getAll();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('No se pudieron cargar los productos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []); // El array vacío asegura que solo se ejecute una vez al cargar la página

  // 3. Renderizamos la vista basada en el estado
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Catálogo de Productos</h1>
        <p className="mt-2 text-gray-500">Explora nuestra colección.</p>
      </div>

      {isLoading ? (
        // Estado de carga (Loading)
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : products.length === 0 ? (
        // Estado vacío (Empty State)
        <div className="text-center py-20 text-gray-500 bg-white rounded-2xl border border-gray-200">
          No hay productos disponibles en este momento.
        </div>
      ) : (
        // Estado de éxito (Success) - Delegamos la UI al Dumb Component
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}