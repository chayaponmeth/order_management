import React from 'react';
import ReactDOM from 'react-dom/client';  // Correct import for React 18+
import App from './App.js';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);