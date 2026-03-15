import React from 'react';
import ReactDOM from 'react-dom/client';

// ① Bootstrap customization (must come before component styles)
import './bootstrap/bootstrap.scss';

// ② Global styles
import './styles/global.scss';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
