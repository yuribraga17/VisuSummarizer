import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Clock, Hash } from 'lucide-react';

export default function ReadingMode({ isOpen, onClose, topics, currentTheme }) {
  if (!isOpen) return null;

  const totalWords = topics.reduce((acc, topic) => acc + topic.wordCount, 0);
  const estimatedTime = Math.ceil(totalWords / 200);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-4 md:inset-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header do modo leitura */}
          <div className="sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 p-6 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <BookOpen className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Modo Leitura
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {estimatedTime} min de leitura
                    </span>
                    <span>{topics.length} tópicos</span>
                    <span>{totalWords.toLocaleString()} palavras</span>
                  </div>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X size={24} className="text-gray-600 dark:text-gray-400" />
              </motion.button>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="p-6 overflow-y-auto max-h-full">
            <div className="max-w-4xl mx-auto">
              {topics.map((topic, index) => (
                <motion.article
                  key={topic.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-12 last:mb-6"
                >
                  {/* Título do tópico */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {topic.id}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white leading-tight">
                      {topic.title}
                    </h3>
                  </div>

                  {/* Conteúdo */}
                  <div className="prose prose-lg max-w-none dark:prose-invert mb-6">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      {topic.fullContent}
                    </p>
                  </div>

                  {/* Palavras-chave e estatísticas */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
                    {topic.keywords && topic.keywords.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Hash size={14} />
                        <span>Palavras-chave:</span>
                        <div className="flex gap-1">
                          {topic.keywords.map((keyword, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-4">
                      <span>{topic.wordCount} palavras</span>
                      <span>~{Math.ceil(topic.wordCount / 200)} min</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Resumo final */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: topics.length * 0.1 + 0.5 }}
              className="mt-12 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <h4 className="font-bold text-gray-800 dark:text-white mb-4">
                📊 Resumo da Leitura
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {topics.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Tópicos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {totalWords}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Palavras</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {estimatedTime}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Minutos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {[...new Set(topics.flatMap(t => t.keywords))].length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Conceitos</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}