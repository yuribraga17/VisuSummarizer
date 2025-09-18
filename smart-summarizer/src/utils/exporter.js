import { saveAs } from 'file-saver';

export function exportToMarkdown(topics, originalTitle = 'Resumo Inteligente') {
  let markdown = `# ${originalTitle}\n\n`;
  markdown += `*Resumo gerado automaticamente em ${new Date().toLocaleDateString('pt-BR')}*\n\n`;
  markdown += `---\n\n`;
  
  topics.forEach((topic, index) => {
    markdown += `## ${index + 1}. ${topic.title}\n\n`;
    markdown += `${topic.fullContent}\n\n`;
    
    if (topic.keywords && topic.keywords.length > 0) {
      markdown += `**🔑 Palavras-chave:** \`${topic.keywords.join('`, `')}\`\n\n`;
    }
    
    markdown += `**📊 Estatísticas:** ${topic.wordCount} palavras\n\n`;
    markdown += `---\n\n`;
  });
  
  markdown += `\n## 📈 Resumo Geral\n\n`;
  markdown += `- **Total de tópicos:** ${topics.length}\n`;
  markdown += `- **Total de palavras:** ${topics.reduce((acc, topic) => acc + topic.wordCount, 0)}\n`;
  markdown += `- **Palavras-chave únicas:** ${[...new Set(topics.flatMap(t => t.keywords))].length}\n`;
  markdown += `- **Gerado em:** ${new Date().toLocaleString('pt-BR')}\n\n`;
  
  markdown += `---\n`;
  markdown += `*Criado com Smart Summarizer - Transforme textos longos em resumos organizados*`;
  
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
  const filename = `resumo-${new Date().toISOString().slice(0, 10)}-${Date.now()}.md`;
  saveAs(blob, filename);
}