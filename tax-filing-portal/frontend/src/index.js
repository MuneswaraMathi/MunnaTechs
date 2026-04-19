import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App';
import './index.css';

// Axios global defaults: send cookies and the XSRF-TOKEN cookie as a header
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
