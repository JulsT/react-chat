import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

jest.mock('../containers/ChatPage', () => () => 'ChatPage');
jest.mock('../containers/WelcomePage', () => () =>  'WelcomePage');
jest.mock('../containers/PrivateRoute', () => () => 'PrivateRoute');


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});