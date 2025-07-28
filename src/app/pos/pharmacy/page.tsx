'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/cart-context';
import { ProductCard } from '@/components/product-card';
import { Pill, Search, Filter } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/navbar';

const categories = ['Over-the-Counter', 'Vitamins', 'First Aid', 'Health Devices', 'Supplements'];

const products = [
  { id: 'p1', name: 'Paracetamol 500mg', price: 5.99, category: 'Over-the-Counter', qty: 15, image: 'image/pharmacy/paracetamol.jpg' },
  { id: 'p2', name: 'Vitamin D3 Tablets', price: 12.99, category: 'Vitamins', qty: 30, image: 'image/pharmacy/vitamenD3.jpg' },
  {
    id: 'p3',
    name: 'Blood Pressure Monitor',
    price: 45.99,
    category: 'Health Devices',
    qty: 10,
    image: 'image/pharmacy/blood_pressure.jpg',
  },
  { id: 'p4', name: 'First Aid Kit', price: 25.99, category: 'First Aid', qty: 18, image: 'image/pharmacy/first_aid.jpg' },
  { id: 'p5', name: 'Multivitamin Complex', price: 18.99, category: 'Vitamins', qty: 25, image: 'image/pharmacy/multivitamen.jpg' },
  { id: 'p6', name: 'Thermometer Digital', price: 15.99, category: 'Health Devices', qty: 27, image: 'image/pharmacy/thermometer.jpg' },
  { id: 'p7', name: 'Cough Syrup', price: 8.99, category: 'Over-the-Counter', qty: 13, image: 'image/pharmacy/coughserup.jpg' },
  { id: 'p8', name: 'Bandages Pack', price: 6.99, category: 'First Aid', qty: 11, image: 'image/pharmacy/bandages.jpg' },
];

export default function PharmacyDashboard() {
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
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-blue-50'>
      <Navbar />

      <div className='max-w-7xl mx-auto px-6 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Sidebar */}
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className='lg:col-span-1 space-y-6'>
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
                    selectedCategory === 'All' ? 'bg-green-100 text-green-700' : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  All Products
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left p-2 rounded-lg transition-colors ${
                      selectedCategory === category ? 'bg-green-100 text-green-700' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className='lg:col-span-3'>
            {/* Products Grid */}
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
                    <ProductCard {...product} module='Pharmacy' onAddToCart={() => showToast(`${product.name} added to cart`)} />
                  </motion.div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className='text-center py-12'>
                  <Pill className='w-16 h-16 text-gray-300 mx-auto mb-4' />
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
