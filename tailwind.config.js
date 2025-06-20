/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4ecca3',
        'primary-dark': '#45b393',
        background: '#1a1a2e',
        surface: '#16213e',
        'surface-light': '#0f3460',
        'text-primary': '#e0e0e0',
        'text-secondary': '#8892b0',
        error: '#ff6b6b',
        success: '#4ecca3',
        warning: '#ffd93d'
      },
             spacing: {
         'xs': '8px',
         'sm': '16px',
         'md': '24px',
         'lg': '32px',
         'xl': '48px',
         'padding-xl': '48px'
       },
      borderRadius: {
        'theme': '12px'
      },
      boxShadow: {
        'small': '0 2px 4px rgba(0,0,0,0.1)',
        'medium': '0 4px 8px rgba(0,0,0,0.2)',
        'large': '0 8px 16px rgba(0,0,0,0.3)'
      },
      fontFamily: {
        'code': ['Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        'gradient-text': 'linear-gradient(45deg, #4ecca3, #45b393)',
      }
    },
  },
  plugins: [],
} 