import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

// sessionStorage.clear();

// if (window.navigator.userAgent.toLowerCase().indexOf('firefox')) {
//   alert("현재 브라우저는 파이어폭스입니다.\n파이어폭스는 개발할때 일부 불편한 부분이 있습니다.\n크롬 브라우저를 추천드립니다.");
// }

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render
  (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
