import React from 'react';
import './index.css';
import App from './components/app/app';
import {createRoot} from "react-dom/client";

function AppRender() {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);
root.render(<AppRender />);

