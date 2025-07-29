'use client';

import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';

interface NavbarProps {
  title: string;
  description: string;
  Icon: any;
  iconbg1: string;
  iconbg2: string;
  cartIconBg: string;
}

const navbar = ({ title, description, Icon, iconbg1, iconbg2, cartIconBg }: NavbarProps) => {
  const { state, dispatch } = useCart();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className='bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50'
    >
      <div className='max-w-7xl mx-auto px-6 py-4'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-3'>
              <div className={`w-12 h-12 bg-gradient-to-br from-${iconbg1} to-${iconbg2}  rounded-xl flex items-center justify-center`}>
                <Icon className='w-6 h-6 text-white' />
              </div>
              <div>
                <h1 className='text-2xl font-bold text-gray-900'>{title}</h1>
                <p className='text-gray-600'>{description}</p>
              </div>
            </div>
          </div>

          {/* Right: Cart + Logout */}
          <div className='flex items-center gap-4'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className={`relative ${cartIconBg}-600 text-white p-3 rounded-xl hover:${cartIconBg}-700 transition-colors shadow-lg`}
            >
              <ShoppingBag className='w-6 h-6' />
              {state.items.length > 0 && (
                <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold'>
                  {state.items.length}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default navbar;
