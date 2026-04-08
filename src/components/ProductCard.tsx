import { useState } from 'react';
import type { Product } from '../types';
import ProductModal from './ProductModal';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const outOfStock = product.stock === 0;

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
      >
        <div className="relative h-56 overflow-hidden bg-gray-50">
          {product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          {outOfStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
                Sin stock
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-900 text-sm leading-snug line-clamp-2 mb-1">
            {product.name}
          </h3>
          <p className="text-xs text-gray-400 mb-3">{product.category.name}</p>
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-gray-900">
              ${Number(product.price).toFixed(2)}
            </span>
            <button
              onClick={(e) => e.stopPropagation()}
              disabled={outOfStock}
              className="text-sm px-5 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-medium"
            >
              {outOfStock ? 'Agotado' : 'Agregar'}
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ProductModal
          product={product}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}