import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

// Renderiza o App para HTML estático no momento do build (SSG).
export function render() {
  return renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
