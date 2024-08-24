import { StrictMode } from 'react';
import ReactDom from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './contex/AppContext.jsx';

ReactDom.createRoot(document.getElementById('root')).render(
  
    <BrowserRouter> 
      <AppContextProvider>
      <App />   
      </AppContextProvider>
    </BrowserRouter>
);
