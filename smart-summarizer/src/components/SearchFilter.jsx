import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Hash, Clock, SortAsc, SortDesc } from 'lucide-react';

export default function SearchFilter({ 
  topics, 
  onFilteredTopics, 
  searchTerm, 
  onSearchChange 
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('order'); // order, words, keywords
  const [sortOrder, setSortOrder] = useState('asc'); // asc, desc
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  // Extrair todas as palavras-chave únicas
  const allKeywords = [...new Set(topics.flatMap(topic => topic.keywords || []))];

  // Filtrar e ordenar tópicos
  useEffect(() => {
    let filtered = [...topics];

    // Filtro por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(topic =>
        topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.fullContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (topic.keywords && topic.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }

    // Filtro por palavras-chave selecionadas
    if (selectedKeywords.length > 0) {
      filtered = filtered.filter(topic =>
        selectedKeywords.some(keyword => 
          topic.keywords && topic.keywords.includes(keyword)
        )
      );
    }

    // Ordenação
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'words':
          comparison = a.wordCount - b.wordCount;
          break;
        case 'keywords':
          comparison = (a.keywords?.length || 0) - (b.keywords?.length || 0);
          break;
        case 'order':
        default:
          comparison = a.id - b.id;
          break;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    onFilteredTopics(filtered);
  }, [searchTerm, selectedKeywords, sortBy, sortOrder, topics, onFilteredTopics]);

  const toggleKeyword = (keyword) => {
    setSelectedKeywords(prev => 
      prev.includes(keyword) 
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    );
  };

  const clearFilters = () => {
    onSearchChange('');
    setSelectedKeywords([]);
    setSortBy('order');
    setSortOrder('asc');
  };

  const hasActiveFilters = searchTerm || selectedKeywords.length > 0 || sortBy !== 'order' || sortOrder !== 'asc';

  return (
    <div className="mb-6">
      {/* Barra de busca */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar nos resumos, títulos ou palavras-chave..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X size={16} className="text-gray-400" />
            </button>
          )}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`
            flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all
            ${isFilterOpen || hasActiveFilters
              ? 'bg-blue-500 text-white shadow-lg' 
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }
          `}
        >
          <Filter size={18} />
          Filtros
          {hasActiveFilters && (
            <span className="w-2 h-2 bg-white rounded-full" />
          )}
        </motion.button>
      </div>

      {/* Painel de filtros */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800 dark:text-white">
                Filtros Avançados
              </h3>
              {hasActiveFilters && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                >
                  <X size={14} />
                  Limpar filtros
                </motion.button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ordenação */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ordenar por:
                </label>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="order">Ordem original</option>
                    <option value="words">Número de palavras</option>
                    <option value="keywords">Palavras-chave</option>
                  </select>
                  
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    {sortOrder === 'asc' ? 
                      <SortAsc size={18} className="text-gray-600 dark:text-gray-300" /> : 
                      <SortDesc size={18} className="text-gray-600 dark:text-gray-300" />
                    }
                  </button>
                </div>
              </div>

              {/* Palavras-chave */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Filtrar por palavras-chave:
                </label>
                <div className="max-h-32 overflow-y-auto">
                  <div className="flex flex-wrap gap-2">
                    {allKeywords.map((keyword, index) => (
                      <motion.button
                        key={keyword}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.02 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleKeyword(keyword)}
                        className={`
                          inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all
                          ${selectedKeywords.includes(keyword)
                            ? 'bg-blue-500 text-white shadow-lg'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }
                        `}
                      >
                        <Hash size={10} />
                        {keyword}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Estatísticas dos filtros */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    Filtros ativos: {
                      [
                        searchTerm && 'busca',
                        selectedKeywords.length > 0 && `${selectedKeywords.length} palavras-chave`,
                        sortBy !== 'order' && 'ordenação',
                      ].filter(Boolean).join(', ')
                    }
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}