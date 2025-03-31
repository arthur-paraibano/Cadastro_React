import React from 'react';
import ReactDOM from 'react-dom/client'; // Importe de 'react-dom/client' em vez de 'react-dom'
import App from './App';
import { AuthProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);