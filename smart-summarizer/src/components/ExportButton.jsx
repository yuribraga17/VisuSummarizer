import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, Check, Sparkles } from 'lucide-react';

export default function ExportButton({ topics, onExport, disabled }) {
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const handleExport = async () => {
    if (disabled) return;
    
    setIsExporting(true);
    
    // Simula o tempo de export
    setTimeout(() => {
      onExport();
      setIsExporting(false);
      setExported(true);
      
      // Reset do estado após 3 segundos
      setTimeout(() => {
        setExported(false);
      }, 3000);
    }, 1000);
  };

  const totalWords = topics.reduce((acc, topic) => acc + topic.wordCount, 0);
  const totalKeywords = [...new Set(topics.flatMap(t => t.keywords))].length;

  return (
    <div className="flex flex-col items-end gap-2">
      {/* Estatísticas do resumo */}
      {topics.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-right text-sm text-gray-600 dark:text-gray-400"
        >
          <div className="flex items-center gap-4 text-xs">
            <span>📊 {topics.length} tópicos</span>
            <span>📝 {totalWords.toLocaleString()} palavras</span>
            <span>🔑 {totalKeywords} palavras-chave</span>
          </div>
        </motion.div>
      )}
      
      {/* Botão principal */}
      <motion.button
        whileHover={{ 
          scale: disabled ? 1 : 1.02, 
          boxShadow: disabled ? "none" : "0 10px 30px -10px rgba(34, 197, 94, 0.5)" 
        }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        onClick={handleExport}
        disabled={disabled || isExporting}
        className={`
          flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300
          ${exported 
            ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white'
            : disabled 
              ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg'
          }
        `}
      >
        <AnimatePresence mode="wait">
          {exported ? (
            <motion.div
              key="exported"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              className="flex items-center gap-2"
            >
              <Check size={20} />
              <span>Exportado com sucesso!</span>
            </motion.div>
          ) : isExporting ? (
            <motion.div
              key="exporting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={20} />
              </motion.div>
              <span>Gerando arquivo...</span>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Download size={20} />
              <span>Exportar Markdown</span>
              {topics.length > 0 && (
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="ml-1 px-2 py-1 bg-white/20 rounded-full text-xs font-medium"
                >
                  .md
                </motion.span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      
      {/* Dica sobre o export */}
      {topics.length > 0 && !exported && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-gray-500 dark:text-gray-400 text-right max-w-xs"
        >
          💡 O arquivo incluirá todos os tópicos, palavras-chave e estatísticas
        </motion.p>
      )}
    </div>
  );
}