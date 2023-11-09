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
import { Profile } from './components/pages/Profile';
import { PrivateRoute } from './components/utils/PrivateRoute';
import { Gallery } from './components/pages/Gallery';
import { Registration } from './components/pages/Registration';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Room } from './components/pages/Room';
import { Rooms } from './components/pages/Rooms';
import { Bookings } from './components/pages/Bookings';
import { Testimonials } from './components/pages/Testimonials';
import { Careers } from './components/pages/Careers';
import { Terms } from './components/pages/Terms';
import { Faq } from './components/pages/Faq';

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
        element: <Registration></Registration>,
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: '/gallery',
        element: <Gallery></Gallery>,
      },
      {
        path: '/rooms',
        element: <Rooms></Rooms>,
      },
      {
        path: '/room/:id',
        element: <Room></Room>,
        loader: async ({ params }) => await fetch(`${import.meta.env.VITE_BACKENDSERVER}/review/${params.id}`),
      },
      {
        path: '/booking',
        element: (
          <PrivateRoute>
            <Bookings></Bookings>
          </PrivateRoute>
        ),
      },
      {
        path: '/testimonials',
        element: <Testimonials></Testimonials>,
      },
      {
        path: '/careers',
        element: <Careers></Careers>,
        loader: async () => await fetch(import.meta.env.VITE_BACKENDSERVER + '/career'),
      },
      {
        path: '/gallery',
        element: <Gallery></Gallery>,
      },
      {
        path: '/terms',
        element: <Terms></Terms>,
      },
      {
        path: '/faq',
        element: <Faq></Faq>,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AppProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
      </AppProvider>
    </AuthProvider>
  </React.StrictMode>
);
