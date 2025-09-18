import nlp from 'compromise';

export function generateSummary(text) {
  if (!text || text.trim().length < 100) {
    return [];
  }

  const doc = nlp(text);
  const sentences = doc.sentences().out('array');
  
  // Extrai palavras-chave
  const nouns = doc.nouns().out('array');
  const adjectives = doc.adjectives().out('array');
  const keywords = [...new Set([...nouns, ...adjectives])]
    .filter(word => word.length > 3)
    .slice(0, 10);

  // Divide o texto em parágrafos
  const paragraphs = text.split('\n\n').filter(p => p.trim().length > 50);
  
  // Se não há parágrafos bem definidos, divide por sentenças
  const contentParts = paragraphs.length > 2 ? paragraphs : sentences;
  
  // Gera tópicos baseado no conteúdo
  const topics = contentParts.slice(0, 6).map((content, index) => {
    const firstSentence = content.split('.')[0] + '.';
    const wordCount = content.split(' ').length;
    
    return {
      id: index + 1,
      title: generateTopicTitle(content, index),
      summary: content.length > 150 
        ? content.substring(0, 147) + '...'
        : content,
      fullContent: content,
      keywords: extractKeywordsFromText(content).slice(0, 3),
      color: getTopicColor(index),
      wordCount: wordCount
    };
  });

  return topics;
}

function extractKeywordsFromText(text) {
  // Lista de palavras irrelevantes (stop words em português)
  const stopWords = ['que', 'para', 'com', 'uma', 'dos', 'das', 'por', 'como', 'mais', 'muito', 'pode', 'deve', 'seja', 'são', 'tem', 'ter', 'foi', 'ser', 'está', 'isso', 'esse', 'essa', 'este', 'esta', 'seu', 'sua', 'seus', 'suas', 'onde', 'quando', 'como', 'porque', 'sobre', 'até', 'entre', 'durante', 'desde', 'depois', 'antes', 'ainda', 'também', 'apenas', 'sempre', 'nunca', 'todo', 'toda', 'todos', 'todas', 'outro', 'outra', 'outros', 'outras'];
  
  const words = text.toLowerCase().match(/\b\w{4,}\b/g) || [];
  const wordCount = {};
  
  words.forEach(word => {
    if (!stopWords.includes(word)) {
      wordCount[word] = (wordCount[word] || 0) + 1;
    }
  });
  
  return Object.keys(wordCount)
    .sort((a, b) => wordCount[b] - wordCount[a])
    .slice(0, 5);
}

function generateTopicTitle(content, index) {
  const titles = [
    'Ponto Principal',
    'Destaque Importante', 
    'Conceito Chave',
    'Informação Relevante',
    'Aspecto Fundamental',
    'Elemento Central'
  ];
  
  // Tenta extrair um título mais inteligente da primeira frase
  const firstWords = content.split(' ').slice(0, 4).join(' ');
  const cleanTitle = firstWords.replace(/[^\w\s]/gi, '').trim();
  
  return cleanTitle.length > 5 && cleanTitle.length < 50 
    ? cleanTitle 
    : titles[index] || `Tópico ${index + 1}`;
}

function getTopicColor(index) {
  const colors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500', 
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500',
    'from-teal-500 to-green-500',
    'from-rose-500 to-pink-500',
    'from-amber-500 to-orange-500'
  ];
  return colors[index % colors.length];
}