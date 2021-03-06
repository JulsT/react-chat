import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';
import configureStore from './store';
import {Provider} from 'react-redux';

const rootEl = document.getElementById('root');
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl);
if (module.hot) {
  module.hot.accept('./components/App', () => {
    ReactDOM.render(<Provider store={store}>
      <App />
    </Provider>, rootEl);
  });
}
registerServiceWorker();
