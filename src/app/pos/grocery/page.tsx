'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/ProductCard';
import { ShoppingCart, Search, Filter } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/navbar';

const categories = ['Fresh Produce', 'Dairy & Eggs', 'Meat & Seafood', 'Bakery', 'Beverages'];

const products = [
  {
    id: 'g1',
    name: 'Organic Bananas',
    price: 2.99,
    category: 'Fresh Produce',
    qty: 18,
    image: '/image/grocery/banana.jpg',
  },
  {
    id: 'g2',
    name: 'Fresh Spinach',
    price: 1.99,
    category: 'Fresh Produce',
    qty: 11,
    image: '/image/grocery/spinach.jpg',
  },
  {
    id: 'g3',
    name: 'Milk',
    price: 3.99,
    category: 'Dairy & Eggs',
    qty: 8,
    image: '/image/grocery/milk.jpg',
  },
  {
    id: 'g4',
    name: 'Eggs',
    price: 4.49,
    category: 'Dairy & Eggs',
    qty: 10,
    image: '/image/grocery/eggs.jpg',
  },
  {
    id: 'g5',
    name: 'Bread',
    price: 5.99,
    category: 'Bakery',
    qty: 19,
    image: '/image/grocery/bread.jpg',
  },
  {
    id: 'g6',
    name: 'Greek Yogurt',
    price: 5.99,
    category: 'Dairy & Eggs',
    qty: 15,
    image: '/image/grocery/yogurt.jpg',
  },
  {
    id: 'g7',
    name: 'Red Apples',
    price: 3.49,
    category: 'Fresh Produce',
    qty: 0,
    image: '/image/grocery/apples.jpg',
  },
  {
    id: 'g8',
    name: 'Orange Juice',
    price: 4.99,
    category: 'Beverages',
    qty: 13,
    image: '/image/grocery/orange.jpg',
  },
];

const dashboardStats = {
  totalSales: 78450,
  totalOrders: 2156,
  totalCustomers: 1543,
  totalProducts: products.length,
  avgOrderValue: 36.4,
  salesGrowth: 22.8,
  popularProduct: 'Organic Bananas',
  rating: 4.7,
};

export default function GroceryDashboard() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-green-50'>
      <Navbar
        title='Grocery'
        description='Fresh food and daily essentials'
        Icon={ShoppingCart}
        iconbg1='blue-400'
        iconbg2='blue-600'
        cartIconBg='bg-blue'
      />

      <div className='max-w-7xl mx-auto px-6 py-8'>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Sidebar */}
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className='w-full lg:w-1/5 space-y-6'>
            {/* Search */}
            <div className='bg-white rounded-xl shadow-lg p-6'>
              <h3 className='font-bold text-gray-900 mb-4 flex items-center gap-2'>Search</h3>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                <input
                  type='text'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder='Search groceries...'
                  className='w-full pl-10 pr-4 py-2  text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-0'
                />
              </div>
            </div>

            {/* Categories */}
            <div className='bg-white rounded-xl shadow-lg p-6'>
              <h3 className='font-bold text-gray-900 mb-4 flex items-center gap-2'>
                <Filter className='w-5 h-5' />
                Categories
              </h3>
              <div className='space-y-2'>
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`w-full text-left p-2 rounded-lg transition-colors ${
                    selectedCategory === 'All' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-50  text-gray-700'
                  }`}
                >
                  All Products
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left p-2 rounded-lg transition-colors ${
                      selectedCategory === category ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-50  text-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className='w-full lg:w-3/4'>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                {selectedCategory === 'All' ? 'All Products' : selectedCategory}
                <span className='text-lg font-normal text-gray-600 ml-2'>({filteredProducts.length} items)</span>
              </h2>

              <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard
                      {...product}
                      module='Grocery'
                      btnBg='blue'
                      onAddToCart={() => showToast(`${product.name} added to cart`)}
                    />
                  </motion.div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className='text-center py-12'>
                  <ShoppingCart className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                  <p className='text-gray-500'>No products found matching your criteria</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className='fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-50'
        >
          {toastMessage}
        </motion.div>
      )}
    </div>
  );
}
