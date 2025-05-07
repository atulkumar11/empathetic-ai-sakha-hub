
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './components/theme-provider';

// Add mood-based theme styles
import './mood-themes.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" attribute="class">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
