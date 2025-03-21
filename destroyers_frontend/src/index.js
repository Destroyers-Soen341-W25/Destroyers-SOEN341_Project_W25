import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter} from "react-router-dom";
import './App.css';
import App from './App';
import {Provider} from "./components/ui/provider";
import {Toaster} from "./components/ui/toaster";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider>
              <Toaster />
              <App />
          </Provider>
      </BrowserRouter>
  </React.StrictMode>
);
