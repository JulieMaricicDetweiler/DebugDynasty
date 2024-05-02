import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import { AuthProvider } from './components/authContext/authContext';
import { CurrentProjectProvider } from './components/ProjectContext/projectContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <CurrentProjectProvider>
        <App />
      </CurrentProjectProvider>
    </AuthProvider>
  </React.StrictMode>
);
