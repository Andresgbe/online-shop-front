import { useNavigate } from 'react-router-dom';
import type { Product } from '../types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const navigate = useNavigate();
  const outOfStock = product.stock === 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl overflow-hidden w-full max-w-2xl shadow-2xl flex flex-col sm:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sm:w-1/2 h-64 sm:h-auto bg-gray-100 shrink-0 overflow-hidden">
          {product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <button
            onClick={onClose}
            className="self-end text-gray-400 hover:text-gray-700 transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <span className="text-xs text-gray-400 uppercase tracking-wider mb-2">
            {product.category.name}
          </span>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {product.name}
          </h2>

          <span className="text-2xl font-bold text-gray-900 mb-4">
            ${Number(product.price).toFixed(2)}
          </span>

          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            {product.description ?? 'Este producto no tiene descripción disponible.'}
          </p>

          {!outOfStock && (
            <p className="text-xs text-gray-400 mb-4">
              {product.stock} unidades disponibles
            </p>
          )}

          <div className="mt-auto flex flex-col gap-2">
            <button
              disabled={outOfStock}
              className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {outOfStock ? 'Agotado' : 'Agregar al carrito'}
            </button>
        {/*  
           <button
              onClick={() => navigate(`/products/${product.id}`)}
              className="w-full py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50 transition-colors"
            >
              Ver detalle completo →
            </button> 
        */}
          </div>
        </div>
      </div>
    </div>
  );
}