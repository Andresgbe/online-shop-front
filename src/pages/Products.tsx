import { useState, useEffect, useCallback } from 'react';
import { productsService, categoriesService } from '../services/products';
import ProductCard from '../components/ProductCard';
import type { ProductFilters } from '../services/products';
import type { Product, Category } from '../types';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
      <div className="bg-gray-200 h-56 w-full" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-1/3" />
        <div className="flex items-center justify-between pt-1">
          <div className="h-5 bg-gray-200 rounded w-1/4" />
          <div className="h-8 bg-gray-200 rounded-lg w-1/3" />
        </div>
      </div>
    </div>
  );
}

// Este es el componente principal de la página.
// useState: guarda datos que cuando cambian, React re-renderiza la pantalla.
// useEffect: ejecuta código cuando algo cambia (como filtros o la página).
// useCallback: evita que loadProducts se recree innecesariamente.
export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [inStock, setInStock] = useState(false);
  const [sortBy, setSortBy] = useState<'createdAt' | 'price' | 'name'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [page, setPage] = useState(1);
  const LIMIT = 12;

  // Debounce: espera 300ms después de que el usuario deja de escribir
  // para hacer la búsqueda. Evita llamar a la API en cada tecla.
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Cuando cambia cualquier filtro, volvemos a la página 1
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedCategory, minPrice, maxPrice, inStock, sortBy, sortOrder]);

  // Carga las categorías una sola vez cuando la página abre
  useEffect(() => {
    categoriesService.getAll().then(setCategories).catch(console.error);
  }, []);

  // Función que llama a la API y carga los productos
  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const filters: ProductFilters = { page, limit: LIMIT, sortBy, sortOrder };
      if (debouncedSearch) filters.search = debouncedSearch;
      if (selectedCategory) filters.categoryId = selectedCategory;
      if (minPrice) filters.minPrice = Number(minPrice);
      if (maxPrice) filters.maxPrice = Number(maxPrice);
      if (inStock) filters.inStock = true;
      const response = await productsService.getAll(filters);
      setProducts(response.data);
      setTotal(response.meta.total);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, selectedCategory, minPrice, maxPrice, inStock, sortBy, sortOrder, page]);

  // Se ejecuta cada vez que loadProducts cambia (es decir, cuando cambia un filtro)
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const totalPages = Math.ceil(total / LIMIT);

  const handleSortChange = (value: string) => {
    const [by, order] = value.split('-') as [typeof sortBy, typeof sortOrder];
    setSortBy(by);
    setSortOrder(order);
  };

  const clearFilters = () => {
    setSearch(''); setSelectedCategory(''); setMinPrice('');
    setMaxPrice(''); setInStock(false); setSortBy('createdAt');
    setSortOrder('desc'); setPage(1);
  };

  const hasActiveFilters = search || selectedCategory || minPrice || maxPrice || inStock;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">

          {/* SIDEBAR DE FILTROS */}
          <aside className="w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-gray-900">Filtros</h2>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="text-xs text-gray-400 hover:text-gray-700">
                    Limpiar
                  </button>
                )}
              </div>

              {/* Filtro por categoría — viene de la API, no hardcodeado */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Categorías</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="category" checked={selectedCategory === ''} onChange={() => setSelectedCategory('')} className="accent-gray-900" />
                    <span className="text-sm text-gray-700">Todas</span>
                  </label>
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="category" checked={selectedCategory === cat.id} onChange={() => setSelectedCategory(cat.id)} className="accent-gray-900" />
                      <span className="text-sm text-gray-700">{cat.name}</span>
                      {cat._count && <span className="ml-auto text-xs text-gray-300">{cat._count.products}</span>}
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtro por precio */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Precio (USD)</h3>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" min={0} />
                  <span className="text-gray-300">—</span>
                  <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900" min={0} />
                </div>
              </div>

              {/* Filtro solo en stock */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="accent-gray-900 w-4 h-4" />
                <span className="text-sm text-gray-700">Solo en stock</span>
              </label>
            </div>
          </aside>

          {/* CONTENIDO PRINCIPAL */}
          <main className="flex-1 min-w-0">
            {/* Barra de búsqueda y ordenamiento */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-3 py-2.5 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-700"
              >
                <option value="createdAt-desc">Más recientes</option>
                <option value="createdAt-asc">Más antiguos</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="name-asc">Nombre A-Z</option>
                <option value="name-desc">Nombre Z-A</option>
              </select>
            </div>

            {/* Contador de resultados */}
            {!isLoading && (
              <p className="text-sm text-gray-400 mb-4">
                {total === 0
                  ? 'No se encontraron productos'
                  : `Mostrando ${products.length} de ${total} resultado${total !== 1 ? 's' : ''}`}
              </p>
            )}

            {/* Grid de productos / skeletons / estado vacío */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No encontramos productos</h3>
                <p className="text-sm text-gray-400 mb-6">Intenta con otros filtros o términos de búsqueda</p>
                <button onClick={clearFilters} className="text-sm px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
            )}

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">
                  ← Anterior
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setPage(p)} className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${p === page ? 'bg-gray-900 text-white' : 'border border-gray-200 hover:bg-gray-50 text-gray-700'}`}>
                    {p}
                  </button>
                ))}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">
                  Siguiente →
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}