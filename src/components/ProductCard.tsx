import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images.length > 0 
    ? product.images[0] 
    : 'https://via.placeholder.com/300x300?text=No+Image';

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
      <div className="aspect-square w-full overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">
            {product.name}
          </h3>
          <span className="font-bold text-gray-900 whitespace-nowrap">
            ${Number(product.price).toFixed(2)}
          </span>
        </div>
        
        {product.category && (
          <p className="text-sm text-gray-500 mb-4">{product.category.name}</p>
        )}
        
        <div className="mt-auto pt-4 border-t border-gray-100">
          <button
            disabled={product.stock === 0}
            className="w-full py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}