import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core'


const MantineUI = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineUI />
    </BrowserRouter>
  </React.StrictMode>
);


