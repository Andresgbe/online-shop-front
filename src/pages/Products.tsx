import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Camisa Básica Blanca',
    description: 'Camisa 100% algodón',
    price: 15.00,
    stock: 25,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80'],
    isActive: true,
    categoryId: 'cat1',
    category: { id: 'cat1', name: 'Ropa', slug: 'ropa', description: null },
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Pantalón Jean Clásico',
    description: 'Jean azul de corte recto',
    price: 35.50,
    stock: 10,
    images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80'],
    isActive: true,
    categoryId: 'cat1',
    category: { id: 'cat1', name: 'Ropa', slug: 'ropa', description: null },
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Zapatos Deportivos',
    description: 'Ideales para correr',
    price: 45.00,
    stock: 0, 
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80'],
    isActive: true,
    categoryId: 'cat2',
    category: { id: 'cat2', name: 'Calzado', slug: 'calzado', description: null },
    createdAt: new Date().toISOString(),
  }
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex flex-col md:flex-row gap-8">
      
      {/* SIDEBAR: Filtros */}
      <aside className="w-full md:w-64 shrink-0 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Filtros</h2>
          
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-3">Categorías</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="category" className="text-gray-900 focus:ring-gray-900" defaultChecked />
                <span className="text-gray-600">Todas</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="category" className="text-gray-900 focus:ring-gray-900" />
                <span className="text-gray-600">Ropa</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="category" className="text-gray-900 focus:ring-gray-900" />
                <span className="text-gray-600">Calzado</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-3">Precio</h3>
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                placeholder="Min" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <span className="text-gray-400">-</span>
              <input 
                type="number" 
                placeholder="Max" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-gray-900 focus:ring-gray-900" />
              <span className="text-gray-700 font-medium">Solo en stock</span>
            </label>
          </div>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1">
        
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <svg 
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-500">
            Mostrando <span className="font-semibold text-gray-900">{MOCK_PRODUCTS.length}</span> resultados
          </p>
          <select className="border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block p-2.5 outline-none">
            <option value="newest">Más recientes</option>
            <option value="price_asc">Precio: Menor a Mayor</option>
            <option value="price_desc">Precio: Mayor a Menor</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
}