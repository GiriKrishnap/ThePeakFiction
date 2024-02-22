import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Store from './redux/Store';
import { GoogleOAuthProvider } from "@react-oauth/google"
import { SocketProvider } from './util/NotifiSoketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
    <SocketProvider>

      <GoogleOAuthProvider clientId='914371032098-fiucf9n409fm0ka4gfpvnnt0kucs1itb.apps.googleusercontent.com' >

        <React.StrictMode>
          <App />
        </React.StrictMode>

      </GoogleOAuthProvider>

    </SocketProvider>
  </Provider>
);


