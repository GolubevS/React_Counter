import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as StoreProvider } from 'react-redux';
import App from './App.tsx';
import store from './store/store.ts';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider store={store}>
        <App />
    </StoreProvider>
  </StrictMode>,
)
