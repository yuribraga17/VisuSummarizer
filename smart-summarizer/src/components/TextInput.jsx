import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, RotateCcw, Upload, Sparkles } from 'lucide-react';

export default function TextInput({ text, setText, onGenerate, isLoading }) {
  const [dragOver, setDragOver] = useState(false);

  const handleClear = () => {
    setText('');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setText(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const wordCount = text.split(' ').filter(w => w.trim()).length;
  const charCount = text.length;
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <FileText className="text-blue-600 dark:text-blue-400" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Cole seu texto aqui
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Artigos, relatórios, transcrições ou qualquer texto longo
            </p>
          </div>
        </div>
        
        {text && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClear}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
          >
            <RotateCcw size={16} />
            Limpar
          </motion.button>
        )}
      </div>
      
      {/* Textarea com drag & drop */}
      <div
        className={`relative border-2 border-dashed rounded-lg transition-all ${
          dragOver 
            ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Cole aqui seu texto ou arraste um arquivo .txt para esta área..."
          className="w-full h-48 p-4 bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all rounded-lg"
        />
        
        {!text && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <Upload className="mx-auto mb-2 text-gray-400" size={32} />
              <p className="text-gray-500 dark:text-gray-400">
                Cole seu texto ou arraste um arquivo aqui
              </p>
            </div>
          </div>
        )}
      </div>
      
      {/* Stats e botão */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-1">
            📝 {charCount.toLocaleString()} caracteres
          </span>
          <span className="flex items-center gap-1">
            💭 {wordCount.toLocaleString()} palavras
          </span>
          {wordCount > 0 && (
            <span className="flex items-center gap-1">
              ⏱️ ~{estimatedReadTime} min de leitura
            </span>
          )}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: "0 10px 30px -10px rgba(59, 130, 246, 0.5)" }}
          whileTap={{ scale: 0.98 }}
          onClick={onGenerate}
          disabled={isLoading || text.trim().length < 100}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all disabled:hover:scale-100"
        >
          <Sparkles size={18} />
          {isLoading ? 'Processando...' : 'Gerar Resumo'}
          {!isLoading && text.trim().length >= 100 && (
            <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
              ✨ Pronto
            </span>
          )}
        </motion.button>
      </div>
      
      {/* Dica para textos muito curtos */}
      {text.trim().length > 0 && text.trim().length < 100 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg"
        >
          <p className="text-sm text-amber-700 dark:text-amber-300">
            💡 <strong>Dica:</strong> Para melhores resultados, use textos com pelo menos 100 caracteres. 
            Texto atual: {text.trim().length} caracteres.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}