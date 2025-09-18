import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Hash, Clock, ChevronDown, ChevronUp } from 'lucide-react';

export default function SummaryCard({ topic, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showKeywords, setShowKeywords] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleKeywords = (e) => {
    e.stopPropagation();
    setShowKeywords(!showKeywords);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -8, 
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer group border border-gray-100 dark:border-gray-700"
    >
      {/* Header com gradiente */}
      <div className={`bg-gradient-to-r ${topic.color} p-4 text-white relative overflow-hidden`}>
        {/* Padrão decorativo */}
        <div className="absolute top-0 right-0 opacity-20">
          <div className="w-20 h-20 rounded-full bg-white transform translate-x-6 -translate-y-6" />
          <div className="w-12 h-12 rounded-full bg-white transform translate-x-4 -translate-y-16" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                #{topic.id}
              </span>
              <motion.div
                animate={isExpanded ? { rotate: 180 } : { rotate: 0 }}
                className="p-1"
              >
                <ChevronDown size={16} />
              </motion.div>
            </div>
            <div className="text-xs opacity-75">
              {topic.wordCount} palavras
            </div>
          </div>
          
          <h3 className="font-bold text-lg leading-tight group-hover:text-white/90 transition-colors">
            {topic.title}
          </h3>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-5" onClick={toggleExpanded}>
        <AnimatePresence mode="wait">
          <motion.div
            key={isExpanded ? 'expanded' : 'collapsed'}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {isExpanded ? topic.fullContent : topic.summary}
            </p>
            
            {/* Palavras-chave */}
            {topic.keywords && topic.keywords.length > 0 && (
              <div className="mb-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={toggleKeywords}
                  className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-2"
                >
                  {showKeywords ? <EyeOff size={14} /> : <Eye size={14} />}
                  {showKeywords ? 'Ocultar' : 'Ver'} palavras-chave
                </motion.button>
                
                <AnimatePresence>
                  {showKeywords && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-wrap gap-2"
                    >
                      {topic.keywords.map((keyword, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 hover:shadow-sm transition-shadow"
                        >
                          <Hash size={10} />
                          {keyword}
                        </motion.span>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            
            {/* Footer com estatísticas */}
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  ~{Math.ceil(topic.wordCount / 200)} min
                </span>
              </div>
              
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-blue-500 dark:text-blue-400"
              >
                {isExpanded ? '👆 Clique para recolher' : '👆 Clique para expandir'}
              </motion.span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Indicador de hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
        initial={false}
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
      />
    </motion.div>
  );
}