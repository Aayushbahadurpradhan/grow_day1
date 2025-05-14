import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';
import { Provider } from 'react-redux';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { apiSlice } from './api/apiSlice';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ApiProvider api={apiSlice}>
        <App />
      </ApiProvider>
    </ThemeProvider>
  </React.StrictMode>
);
