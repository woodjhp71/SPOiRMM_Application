/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // SPOiRMM color scheme
        'spoirmm': {
          'blue': '#3B82F6',      // Recipient of Benefit
          'red': '#EF4444',       // Provider of Benefit
          'green': '#10B981',     // Benefit Enablers (Staff)
          'yellow': '#F59E0B',    // Regulators & Representatives
          'purple': '#8B5CF6',    // Jurisdiction Tool
          'orange': '#F97316',    // Market Tool
          'teal': '#14B8A6',      // Enterprise Tool
          'light-blue': '#0EA5E9', // Organisation Tool
          'dark-blue': '#1E40AF', // Agreements Tool
          'brown': '#A16207',     // Resources Tool
        }
      }
    },
  },
  plugins: [],
} 