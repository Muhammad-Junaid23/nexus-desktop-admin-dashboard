'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/cart-context';
import { X, Plus, Minus, ShoppingBag, Receipt } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export const CartSidebar = () => {
  const { state, dispatch } = useCart();
  const [showReceipt, setShowReceipt] = useState(false);

  // Get the module from the query params (defaulting to "Default" if not found)
  const pathname = usePathname();
  const moduleName = pathname.split('/')[2] || 'Default';

  const handleCheckout = () => {
    setShowReceipt(true);
  };

  return (
    <>
      <AnimatePresence>
        {state.isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40'
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className='fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col'
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className='p-6 border-b border-gray-200 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <ShoppingBag className='w-6 h-6 text-blue-600' />
                  <h2 className='text-xl font-bold text-gray-900'>{moduleName.charAt(0).toUpperCase() + moduleName.slice(1)} Cart</h2>
                </div>
                <button onClick={() => dispatch({ type: 'TOGGLE_CART' })} className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
                  <X className='w-5 h-5 text-gray-700' />
                </button>
              </div>

              {/* Cart Items */}
              <div className='flex-1 overflow-y-auto p-6'>
                {state.items.length === 0 ? (
                  <div className='text-center py-12'>
                    <ShoppingBag className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                    <p className='text-gray-500'>Your cart is empty</p>
                  </div>
                ) : (
                  <div className='space-y-4'>
                    {state.items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className='bg-gray-50 rounded-lg p-4'
                      >
                        <div className='flex justify-between items-start mb-2'>
                          <div>
                            <h3 className='font-medium text-gray-900'>{item.name}</h3>
                            <p className='text-sm text-gray-500'>
                              {item.module} • {item.category}
                            </p>
                          </div>
                          <button
                            onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                            className='text-red-500 hover:text-red-700 p-1'
                          >
                            <X className='w-4 h-4' />
                          </button>
                        </div>

                        <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-3'>
                            <button
                              onClick={() =>
                                dispatch({
                                  type: 'UPDATE_QUANTITY',
                                  payload: { id: item.id, quantity: item.quantity - 1 },
                                })
                              }
                              className='w-8 h-8 rounded-full text-gray-700 bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors'
                            >
                              <Minus className='w-4 h-4' />
                            </button>
                            <span className='font-medium w-8 text-center text-gray-700'>{item.quantity}</span>
                            <button
                              onClick={() =>
                                dispatch({
                                  type: 'UPDATE_QUANTITY',
                                  payload: { id: item.id, quantity: item.quantity + 1 },
                                })
                              }
                              className='w-8 h-8 rounded-full text-gray-700 bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors'
                            >
                              <Plus className='w-4 h-4' />
                            </button>
                          </div>
                          <span className='font-bold text-lg text-gray-700'>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {state.items.length > 0 && (
                <div className='p-6 border-t border-gray-200'>
                  <div className='flex justify-between items-center mb-4'>
                    <span className='text-xl font-bold text-gray-700'>Total:</span>
                    <span className='text-2xl font-bold text-blue-600'>${state.total.toFixed(2)}</span>
                  </div>
                  <div className='space-y-3'>
                    <button
                      onClick={handleCheckout}
                      className='w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2'
                    >
                      <Receipt className='w-5 h-5' />
                      Checkout
                    </button>
                    <button
                      onClick={() => dispatch({ type: 'CLEAR_CART' })}
                      className='w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors'
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
