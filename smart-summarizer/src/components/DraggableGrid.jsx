import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import SummaryCard from './SummaryCard';
import { GripVertical, RotateCcw } from 'lucide-react';

export default function DraggableGrid({ 
  topics, 
  currentTheme, 
  onTopicsReorder 
}) {
  const [items, setItems] = useState(topics);
  const [isDragging, setIsDragging] = useState(false);

  const handleReorder = (newOrder) => {
    setItems(newOrder);
    onTopicsReorder(newOrder);
  };

  const resetOrder = () => {
    const originalOrder = [...topics].sort((a, b) => a.id - b.id);
    setItems(originalOrder);
    onTopicsReorder(originalOrder);
  };

  const hasChangedOrder = JSON.stringify(items.map(i => i.id)) !== JSON.stringify(topics.map(t => t.id).sort());

  return (
    <div>
      {/* Header com controles */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ 
              scale: isDragging ? [1, 1.1, 1] : 1,
              rotate: isDragging ? [0, 5, -5, 0] : 0
            }}
            transition={{ duration: 0.5, repeat: isDragging ? Infinity : 0 }}
            className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg"
          >
            <GripVertical className="text-blue-600 dark:text-blue-400" size={20} />
          </motion.div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">
              Arraste para reorganizar
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isDragging ? 'Solte para fixar posição' : 'Clique e arraste os cards'}
            </p>
          </div>
        </div>

        {hasChangedOrder && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetOrder}
            className="flex items-center gap-2 px-3 py-2 text-sm text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all"
          >
            <RotateCcw size={16} />
            Restaurar ordem
          </motion.button>
        )}
      </div>

      {/* Grid reordenável */}
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={handleReorder}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {items.map((topic, index) => (
          <Reorder.Item
            key={topic.id}
            value={topic}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            className="cursor-grab active:cursor-grabbing"
            whileDrag={{ 
              scale: 1.05,
              rotate: 2,
              zIndex: 50,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative group">
              {/* Indicador de drag */}
              <motion.div
                className="absolute -left-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                whileHover={{ x: 2 }}
              >
                <div className="p-1 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
                  <GripVertical size={14} className="text-gray-400" />
                </div>
              </motion.div>

              {/* Card atualizado com tema */}
              <EnhancedSummaryCard 
                topic={{...topic, color: getThemeColor(currentTheme, index)}} 
                index={index}
                isDragging={isDragging}
              />
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* Indicador de mudanças */}
      {hasChangedOrder && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
        >
          <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
            ✨ Ordem personalizada aplicada! Os cards foram reorganizados conforme sua preferência.
          </p>
        </motion.div>
      )}
    </div>
  );
}

// Card aprimorado para o grid draggable
function EnhancedSummaryCard({ topic, index, isDragging }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showKeywords, setShowKeywords] = useState(false);

  return (
    <motion.div
      layout
      whileHover={ !isDragging ? { 
        y: -8, 
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        transition: { type: "spring", stiffness: 400, damping: 10 }
      } : {}}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer group border border-gray-100 dark:border-gray-700"
      onClick={() => !isDragging && setIsExpanded(!isExpanded)}
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
                <GripVertical size={16} />
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

      {/* Conteúdo expandível */}
      <motion.div 
        className="p-5"
        animate={{ height: isExpanded ? 'auto' : 'auto' }}
      >
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          {isExpanded ? topic.fullContent : topic.summary}
        </p>
        
        {/* Palavras-chave com animação */}
        {topic.keywords && topic.keywords.length > 0 && (
          <div className="mb-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                setShowKeywords(!showKeywords);
              }}
              className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-2"
            >
              <motion.div
                animate={{ rotate: showKeywords ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ▼
              </motion.div>
              {showKeywords ? 'Ocultar' : 'Ver'} palavras-chave
            </motion.button>
            
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: showKeywords ? 'auto' : 0, 
                opacity: showKeywords ? 1 : 0 
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2">
                {topic.keywords.map((keyword, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 hover:shadow-sm transition-shadow"
                  >
                    #{keyword}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        )}
        
        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3">
          <span>~{Math.ceil(topic.wordCount / 200)} min de leitura</span>
          <span className="text-blue-500 dark:text-blue-400">
            {isExpanded ? '👆 Clique para recolher' : '👆 Clique para expandir'}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Helper para obter cor do tema
function getThemeColor(themeName, index) {
  const themes = {
    blue: [
      'from-blue-500 to-cyan-500',
      'from-indigo-500 to-blue-500', 
      'from-cyan-500 to-teal-500',
      'from-blue-600 to-purple-500',
      'from-teal-500 to-cyan-500',
      'from-sky-500 to-blue-500'
    ],
    purple: [
      'from-purple-500 to-pink-500',
      'from-indigo-500 to-purple-500',
      'from-pink-500 to-rose-500',
      'from-violet-500 to-purple-500',
      'from-fuchsia-500 to-pink-500',
      'from-purple-600 to-indigo-500'
    ],
    green: [
      'from-green-500 to-emerald-500',
      'from-teal-500 to-green-500',
      'from-emerald-500 to-cyan-500',
      'from-lime-500 to-green-500',
      'from-green-600 to-teal-500',
      'from-emerald-600 to-green-600'
    ],
    orange: [
      'from-orange-500 to-red-500',
      'from-amber-500 to-orange-500',
      'from-red-500 to-pink-500',
      'from-yellow-500 to-orange-500',
      'from-orange-600 to-amber-500',
      'from-red-600 to-orange-600'
    ],
    pink: [
      'from-pink-500 to-rose-500',
      'from-rose-500 to-pink-500',
      'from-fuchsia-500 to-pink-500',
      'from-pink-600 to-purple-500',
      'from-rose-600 to-red-500',
      'from-pink-400 to-rose-400'
    ]
  };
  
  const themeColors = themes[themeName] || themes.blue;
  return themeColors[index % themeColors.length];
}