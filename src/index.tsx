import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { LoginService, FingerprintScanner } from 'services';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const loginService = new LoginService();
const scanner = new FingerprintScanner();

root.render(
  <React.StrictMode>
    <App loginService={loginService} scanner={scanner} />
  </React.StrictMode>
);
