import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Root } from './components/Root';
import AuthProvider from './components/providers/AuthProvider';
import { Error } from './components/shared/Error';
import { Login } from './components/pages/Login';
import { Home } from './components/pages/Home';
import { AppProvider } from './components/context/App';
import { Register } from './components/pages/register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AppProvider>
        <RouterProvider router={router}></RouterProvider>
      </AppProvider>
    </AuthProvider>
  </React.StrictMode>
);
