// Theme Manager - Sistema de temas avançado
export const THEMES = {
  blue: {
    name: 'Azul Oceano',
    primary: 'from-blue-500 to-cyan-500',
    secondary: 'from-blue-600 to-cyan-600',
    accent: 'blue-500',
    background: 'from-blue-50 via-white to-cyan-50',
    darkBackground: 'from-blue-900 via-gray-800 to-cyan-900',
    cardColors: [
      'from-blue-500 to-cyan-500',
      'from-indigo-500 to-blue-500',
      'from-cyan-500 to-teal-500',
      'from-blue-600 to-purple-500',
      'from-teal-500 to-cyan-500',
      'from-sky-500 to-blue-500'
    ]
  },
  purple: {
    name: 'Roxo Místico',
    primary: 'from-purple-500 to-pink-500',
    secondary: 'from-purple-600 to-pink-600',
    accent: 'purple-500',
    background: 'from-purple-50 via-white to-pink-50',
    darkBackground: 'from-purple-900 via-gray-800 to-pink-900',
    cardColors: [
      'from-purple-500 to-pink-500',
      'from-indigo-500 to-purple-500',
      'from-pink-500 to-rose-500',
      'from-violet-500 to-purple-500',
      'from-fuchsia-500 to-pink-500',
      'from-purple-600 to-indigo-500'
    ]
  },
  green: {
    name: 'Verde Natureza',
    primary: 'from-green-500 to-emerald-500',
    secondary: 'from-green-600 to-emerald-600',
    accent: 'green-500',
    background: 'from-green-50 via-white to-emerald-50',
    darkBackground: 'from-green-900 via-gray-800 to-emerald-900',
    cardColors: [
      'from-green-500 to-emerald-500',
      'from-teal-500 to-green-500',
      'from-emerald-500 to-cyan-500',
      'from-lime-500 to-green-500',
      'from-green-600 to-teal-500',
      'from-emerald-600 to-green-600'
    ]
  },
  orange: {
    name: 'Laranja Sunset',
    primary: 'from-orange-500 to-red-500',
    secondary: 'from-orange-600 to-red-600',
    accent: 'orange-500',
    background: 'from-orange-50 via-white to-red-50',
    darkBackground: 'from-orange-900 via-gray-800 to-red-900',
    cardColors: [
      'from-orange-500 to-red-500',
      'from-amber-500 to-orange-500',
      'from-red-500 to-pink-500',
      'from-yellow-500 to-orange-500',
      'from-orange-600 to-amber-500',
      'from-red-600 to-orange-600'
    ]
  },
  pink: {
    name: 'Rosa Vibrante',
    primary: 'from-pink-500 to-rose-500',
    secondary: 'from-pink-600 to-rose-600',
    accent: 'pink-500',
    background: 'from-pink-50 via-white to-rose-50',
    darkBackground: 'from-pink-900 via-gray-800 to-rose-900',
    cardColors: [
      'from-pink-500 to-rose-500',
      'from-rose-500 to-pink-500',
      'from-fuchsia-500 to-pink-500',
      'from-pink-600 to-purple-500',
      'from-rose-600 to-red-500',
      'from-pink-400 to-rose-400'
    ]
  }
};

export function getThemeColors(themeName, index) {
  const theme = THEMES[themeName] || THEMES.blue;
  return theme.cardColors[index % theme.cardColors.length];
}

export function applyTheme(themeName, darkMode = false) {
  const theme = THEMES[themeName] || THEMES.blue;
  const root = document.documentElement;
  
  // CSS Custom Properties para o tema
  root.style.setProperty('--theme-primary', theme.primary);
  root.style.setProperty('--theme-secondary', theme.secondary);
  root.style.setProperty('--theme-accent', theme.accent);
  root.style.setProperty('--theme-background', darkMode ? theme.darkBackground : theme.background);
  
  return theme;
}