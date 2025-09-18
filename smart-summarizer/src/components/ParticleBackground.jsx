import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TextInput from './components/TextInput';
import SummaryCard from './components/SummaryCard';
import LoadingSpinner from './components/LoadingSpinner';
import ExportButton from './components/ExportButton';
import { generateSummary } from './utils/summarizer';
import { exportToMarkdown } from './utils/exporter';
import { Sparkles, Moon, Sun, Github, Coffee, Zap } from 'lucide-react';

function App() {
  const [text, setText] = useState('');
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Aplica o tema escuro
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleGenerate = async () => {
    if (text.trim().length < 100) return;
    
    setIsLoading(true);
    setTopics([]); // Limpa resultados anteriores
    
    // Simula processamento (substitua por API real se necessário)
    setTimeout(() => {
      try {
        const summary = generateSummary(text);
        setTopics(summary);
      } catch (error) {
        console.error('Erro ao gerar resumo:', error);
        // Aqui você pode adicionar um toast de erro
      } finally {
        setIsLoading(false);
      }
    }, 2500);
  };

  const handleExport = () => {
    if (topics.length > 0) {
      const title = `Resumo - ${new Date().toLocaleDateString('pt-BR')}`;
      exportToMarkdown(topics, title);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const demoText = `A inteligência artificial (IA) está revolucionando diversos setores da economia global. Desde a automatização de processos industriais até a personalização de experiências digitais, a IA tem demonstrado um potencial transformador sem precedentes.

No setor de saúde, algoritmos de machine learning estão sendo utilizados para diagnósticos mais precisos e tratamentos personalizados. Radiologistas agora contam com sistemas que podem detectar anomalias em exames de imagem com precisão superior à humana em muitos casos.

Na educação, plataformas adaptativas utilizam IA para personalizar o aprendizado de acordo com o ritmo e estilo de cada estudante. Isso permite uma experiência educacional mais eficiente e inclusiva.

O setor financeiro também se beneficia enormemente da IA, com sistemas de detecção de fraudes em tempo real, análise de riscos mais sofisticada e atendimento ao cliente automatizado através de chatbots inteligentes.

Contudo, essa revolução tecnológica também traz desafios importantes. Questões sobre privacidade de dados, substituição de empregos e vieses algorítmicos precisam ser cuidadosamente endereçadas para garantir um desenvolvimento ético e sustentável da IA.`;

  const loadDemo = () => {
    setText(demoText);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      darkMode 
        ? 'dark bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-cyan-50'
    }`}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="relative">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                  className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl"
                >
                  <Sparkles className="text-white" size={28} />
                </motion.div>
                <motion.div
                  animate={{ scale: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                />
              </div>
              
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Smart Summarizer
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ✨ Transforme textos longos em resumos organizados
                </p>
              </div>
            </motion.div>
            
            <div className="flex items-center gap-3">
              {/* Botão Demo */}
              {!text && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={loadDemo}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <Zap size={16} />
                  Demo
                </motion.button>
              )}
              
              {/* Toggle tema */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700"
              >
                <AnimatePresence mode="wait">
                  {darkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun size={20} className="text-yellow-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={20} className="text-gray-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <TextInput
            text={text}
            setText={setText}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div key="loading">
              <LoadingSpinner />
            </motion.div>
          )}
          
          {topics.length > 0 && !isLoading && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1 }}
            >
              {/* Header dos resultados */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    📋 Resumo Gerado
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {topics.length} tópicos principais identificados
                  </p>
                </div>
                
                <ExportButton
                  topics={topics}
                  onExport={handleExport}
                  disabled={topics.length === 0}
                />
              </div>

              {/* Grid de Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {topics.map((topic, index) => (
                  <SummaryCard
                    key={topic.id}
                    topic={topic}
                    index={index}
                  />
                ))}
              </div>

              {/* Stats finais */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  📊 Estatísticas do Resumo
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {topics.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Tópicos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {topics.reduce((acc, topic) => acc + topic.wordCount, 0)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Palavras</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {[...new Set(topics.flatMap(t => t.keywords))].length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Palavras-chave</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {Math.ceil(topics.reduce((acc, topic) => acc + topic.wordCount, 0) / 200)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Min. leitura</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400"
          >
            Feito com <Coffee size={16} className="text-amber-500" /> e muito ❤️
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default App;