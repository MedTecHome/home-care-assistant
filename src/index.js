import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from '@material-ui/core/styles';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { AuthContextProvider } from './contexts/AuthContext';
import theme1 from './themes/theme1';
import { MessageContextProvider } from './MessageHandle/MessageContext';
import MessageComponent from './MessageHandle/MessageComponent';
import CustomBoundary from './MessageHandle/CustomBoundary';

library.add(fab, faCheckSquare, faCoffee);

ReactDOM.render(
  <ThemeProvider theme={theme1}>
    <MessageContextProvider>
      <CustomBoundary>
        <MessageComponent />
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </CustomBoundary>
    </MessageContextProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
