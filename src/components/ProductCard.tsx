'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  category: string;
  module: string;
  image?: string;
  qty?: number;
  description?: string;
  btnBg: string;
  onAddToCart?: () => void;
}

export const ProductCard = ({ id, name, price, category, module, image, qty, btnBg, description, onAddToCart }: ProductCardProps) => {
  const { state, dispatch } = useCart();

  const inCart = state.items.find((item) => item.id === id);

  const handleClick = () => {
    if (inCart) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({
        type: 'ADD_ITEM',
        payload: { id, name, price, category, module },
      });
      if (onAddToCart) onAddToCart();
    }
  };

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className='bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden relative group'
    >
      {/* Image and Overlay */}
      <div className='h-36 relative bg-gray-100 overflow-hidden'>
        {image ? (
          <img src={image} alt={name} className='object-cover w-full h-full' />
        ) : (
          <div className='flex items-center justify-center h-full text-gray-400'>No Image</div>
        )}

        {qty === 0 && (
          <div className='absolute inset-0 bg-black/70 text-white flex items-center justify-center text-sm font-bold'>Out of Stock</div>
        )}
      </div>

      {/* Details */}
      <div className='p-3'>
        <div className='flex items-center justify-between mb-1'>
          <h3 className='font-semibold text-gray-900 text-base leading-tight'>{name}</h3>
          <div className='text-xs text-gray-600'>${price.toFixed(2)}</div>
        </div>

        {qty === 0 ? (
          <p className='text-xs text-gray-600 mb-2 line-clamp-2'>Out of stock</p>
        ) : (
          <p className='text-xs text-gray-600 mb-2 line-clamp-2'>Qty: {qty}</p>
        )}

        <div className='flex items-center justify-center'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            disabled={qty === 0}
            className={`w-full px-3 py-2 rounded-md font-medium flex items-center justify-center gap-1 text-sm ${
              inCart ? 'bg-red-600 hover:bg-red-700' : `bg-${btnBg}-600 hover:bg-${btnBg}-700`
            } text-white transition-colors`}
          >
            {inCart ? (
              <>Remove</>
            ) : (
              <>
                <Plus className='w-4 h-4' />
                Add to Cart
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
