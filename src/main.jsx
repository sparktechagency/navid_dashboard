import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { Routes } from './Routes/Routes.jsx';
import store from './Redux/store.js';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 1500 }}
      />
      <RouterProvider router={Routes} />
    </Provider>
  </React.StrictMode>
);
