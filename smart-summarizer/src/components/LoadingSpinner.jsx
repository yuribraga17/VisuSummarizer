import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Zap } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16"
    >
      {/* Ícones animados */}
      <div className="relative mb-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <Sparkles size={48} className="text-blue-500" />
        </motion.div>
        
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Brain size={24} className="text-purple-500" />
        </motion.div>
      </div>

      {/* Texto animado */}
      <motion.h3
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2"
      >
        Analisando seu texto...
      </motion.h3>
      
      <motion.p
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        className="text-gray-500 dark:text-gray-400 text-center max-w-md"
      >
        Identificando tópicos principais e extraindo insights importantes
      </motion.p>

      {/* Barra de progresso animada */}
      <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-6 overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
        />
      </div>

      {/* Indicadores de processo */}
      <div className="flex items-center gap-4 mt-6">
        {[
          { icon: Zap, text: "Processando", delay: 0 },
          { icon: Brain, text: "Analisando", delay: 1 },
          { icon: Sparkles, text: "Resumindo", delay: 2 }
        ].map(({ icon: Icon, text, delay }, index) => (
          <motion.div
            key={text}
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              delay: delay * 0.5 
            }}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
          >
            <Icon size={16} />
            <span>{text}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}