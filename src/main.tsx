import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // globals.css yerine index.css kullanılıyor
import { BrowserRouter } from 'react-router-dom'; // BrowserRouter buraya taşındı

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* PREMIUM UI: BrowserRouter uygulamanın en dış katmanında, tek bir yerden yönetiliyor */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
