import React, { useState, useMemo } from 'react';
import { Flame, Clock, Plus, Eye, Search, Heart, Sparkles, SlidersHorizontal, Check } from 'lucide-react';
import { BreadProduct, ProductCategory } from '../types';
import { PRODUCTS } from '../data/bakeryData';

interface MenuSectionProps {
  onSelectProduct: (product: BreadProduct) => void;
  onQuickAdd: (product: BreadProduct) => void;
  favorites: string[];
  onToggleFavorite: (productId: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectProduct,
  onQuickAdd,
  favorites,
  onToggleFavorite,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc'>('featured');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'vegan' | 'vegetarian' | 'organic'>('all');

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'breads', label: 'Artisan Breads' },
    { id: 'pastries', label: 'Fresh Pastries' },
    { id: 'drinks', label: 'Coffee & Drinks' },
    { id: 'spreads', label: 'Whipped Butters' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.flavorNotes.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesDietary =
        dietaryFilter === 'all' || (item.dietary && item.dietary.includes(dietaryFilter));

      return matchesCategory && matchesSearch && matchesDietary;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    });
  }, [activeCategory, searchQuery, sortBy, dietaryFilter]);

  return (
    <section id="menu" className="py-20 bg-[#111113] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-amber-400 uppercase mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>JUSTDAN ONLINE STORE &amp; MENU</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Artisan Breads, French Pastries <br />
              <span className="text-zinc-400 font-normal">&amp; Handcrafted Drinks.</span>
            </h2>
          </div>

          <p className="text-sm text-zinc-400 max-w-md">
            Order online for fast doorstep delivery, or pick up hot from our 24/7 automated stone-hearth kiosks.
          </p>
        </div>

        {/* E-Commerce Search, Filter & Sort Controls */}
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4 mb-8">
          {/* Top row: Category tabs & Search */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                const count =
                  cat.id === 'all'
                    ? PRODUCTS.length
                    : PRODUCTS.filter((p) => p.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as ProductCategory)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer shrink-0 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/20'
                        : 'bg-zinc-950/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                        isActive ? 'bg-zinc-950 text-amber-400' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:max-w-xs shrink-0">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search breads, croissants, cold brew..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Sub Row: Dietary Filters & Sorting */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800/80 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider">
                Dietary:
              </span>
              {(['all', 'vegan', 'vegetarian', 'organic'] as const).map((diet) => (
                <button
                  key={diet}
                  onClick={() => setDietaryFilter(diet)}
                  className={`px-2.5 py-1 rounded-lg text-xs capitalize transition-colors cursor-pointer ${
                    dietaryFilter === diet
                      ? 'bg-zinc-800 text-amber-400 border border-amber-500/40 font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {diet === 'all' ? 'All' : diet}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-2.5 py-1 text-xs rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="featured">Best Sellers &amp; Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Empty Search State */}
        {filteredProducts.length === 0 && (
          <div className="py-16 text-center space-y-3 bg-zinc-900/30 border border-zinc-800 rounded-3xl">
            <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
            <h3 className="font-display text-lg font-bold text-white">No items found</h3>
            <p className="text-xs text-zinc-400">
              No products match &ldquo;{searchQuery}&rdquo;. Try another search keyword or clear filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setDietaryFilter('all');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const isFav = favorites.includes(product.id);
            return (
              <div
                key={product.id}
                className="group relative rounded-3xl bg-zinc-900/50 border border-zinc-800/80 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:-translate-y-1"
              >
                <div>
                  {/* Image Showcase */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-80" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {product.isPopular && (
                        <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-zinc-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                          Best Seller
                        </span>
                      )}
                      {product.isNew && (
                        <span className="px-2.5 py-1 rounded-lg bg-orange-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                          New Batch
                        </span>
                      )}
                    </div>

                    {/* Right side: Bake time & Favorite heart button */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <div className="px-2.5 py-1 rounded-lg bg-zinc-950/85 backdrop-blur-md border border-zinc-700/70 text-zinc-200 text-[11px] font-mono flex items-center gap-1.5 shadow-md">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>
                          {product.bakeTimeMinutes > 0
                            ? `${product.bakeTimeMinutes}m Bake`
                            : product.category === 'drinks'
                            ? 'Chilled Brew'
                            : 'Chilled'}
                        </span>
                      </div>

                      <button
                        onClick={() => onToggleFavorite(product.id)}
                        className={`p-1.5 rounded-lg backdrop-blur-md border transition-all cursor-pointer ${
                          isFav
                            ? 'bg-red-500/20 border-red-500 text-red-400'
                            : 'bg-zinc-950/80 border-zinc-700 text-zinc-400 hover:text-white'
                        }`}
                        title={isFav ? 'Remove from wishlist' : 'Save to wishlist'}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Quick Preview trigger */}
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-zinc-950/80 hover:bg-zinc-900 backdrop-blur-md text-zinc-300 hover:text-white border border-zinc-700 transition-all opacity-0 group-hover:opacity-100 flex items-center gap-1 text-xs cursor-pointer"
                      title="Inspect item details"
                    >
                      <Eye className="w-4 h-4 text-amber-400" />
                      <span>Details</span>
                    </button>
                  </div>

                  {/* Content details */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                      <span className="text-amber-400/90 font-medium">
                        {product.crustType}
                      </span>
                      <span>
                        {product.volumeOrWeight || `${product.calories} kcal`}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Flavor Notes tag line */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {product.flavorNotes.map((note, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] text-zinc-400 bg-zinc-800/60 px-2 py-0.5 rounded"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Price & Add to Bag Strip */}
                <div className="p-5 sm:p-6 pt-0 flex items-center justify-between border-t border-zinc-800/60 mt-4">
                  <div>
                    <span className="text-[10px] text-zinc-400 block uppercase tracking-wider">Price</span>
                    <span className="font-mono text-lg font-bold text-white">
                      GH₵ {product.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800/60 hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      Customize
                    </button>
                    <button
                      onClick={() => onQuickAdd(product)}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/10 cursor-pointer active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
