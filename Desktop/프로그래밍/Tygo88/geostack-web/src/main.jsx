import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // 있어도 되고 없어도 됨

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
