import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { THEMES } from '../utils/themeManager';

export default function ThemeSelector({ currentTheme, onThemeChange, darkMode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700"
      >
        <Palette size={20} className="text-gray-600 dark:text-gray-300" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 top-12 z-50 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 min-w-[280px]"
            >
              <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <Palette size={16} />
                Escolha seu tema
              </h3>
              
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(THEMES).map(([key, theme]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onThemeChange(key);
                      setIsOpen(false);
                    }}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg transition-all text-left
                      ${currentTheme === key 
                        ? 'bg-gray-100 dark:bg-gray-700 ring-2 ring-blue-500' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }
                    `}
                  >
                    {/* Preview das cores */}
                    <div className="flex gap-1">
                      {theme.cardColors.slice(0, 3).map((color, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full bg-gradient-to-r ${color}`}
                        />
                      ))}
                    </div>
                    
                    <span className="flex-1 font-medium text-gray-700 dark:text-gray-300">
                      {theme.name}
                    </span>
                    
                    {currentTheme === key && (
                      <Check size={16} className="text-blue-500" />
                    )}
                  </motion.button>
                ))}
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  💡 O tema será aplicado a todos os cards e elementos
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}