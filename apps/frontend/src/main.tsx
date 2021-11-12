import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import { ConfigContext, configContextValue } from './context/routesContext';
import { store } from './store/store';

ReactDOM.render(
  <React.StrictMode>
    <ConfigContext.Provider value={configContextValue}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ConfigContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
