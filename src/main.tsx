import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {LanguageProvider} from './i18n';
import {SeoHead} from './seo/SeoHead';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <SeoHead />
      <App />
    </LanguageProvider>
  </StrictMode>,
);
