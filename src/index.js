import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ReduxProvider from './redux/index';

import App from './App';
import * as serviceWorker from './serviceWorker';
import initializer from './utils/initializer';
import './axiosConfig/index';
import './lang/index';
import 'bootstrap/dist/css/bootstrap.min.css';

import './assets/fonts/en/stylesheet.css';

initializer();

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
