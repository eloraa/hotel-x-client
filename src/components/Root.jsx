import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { Header } from './shared/Header';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from './context/App';
import { Toaster, useToaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { useSecureReq } from './hooks/useSecureReq';
import { AuthContext } from './providers/AuthProvider';
import { Toast } from './utils/Toast';
import { getStoredValue } from './utils/localstorage';
import moment from 'moment';

export const DataContext = createContext(null);
export const Root = () => {
  const { setScreen } = useContext(AppContext);
  const { user, getToken, loading } = useContext(AuthContext);
  const locations = useLocation();
  const [isLoaded, setLoaded] = useState(false);
  const main = useRef();

  const { toasts } = useToaster();

  const [toasters, setToasters] = useState(false);

  useEffect(() => {
    if (toasts.length && toasts.filter(toast => toast.visible).length) {
      setToasters(true);
    } else setToasters(false);
  }, [toasts]);

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      if (main.current.classList.contains('animate-dissolve')) {
        main.current?.classList.remove('animate-dissolve');
        clearInterval(interval);
      }
    }, 500);

    if (locations.pathname === '/login' || locations.pathname === '/register') {
      setScreen('fluid');
    } else {
      setScreen(null);
    }

    return () => clearInterval(interval);
  }, [setScreen, locations]);

  useEffect(() => {
    if (!isLoaded) {
      document.addEventListener('click', e => {
        let target = e.target;
        while (target && target !== document.body) {
          if (target.tagName === 'A') {
            if (main.current?.classList.contains('animate-dissolve')) {
              main.current?.classList.remove('animate-dissolve');
              void main.current.offsetWidth;
              main.current?.classList.add('animate-dissolve');
            }
            if (
              main.current &&
              target.pathname &&
              target.pathname !== '/login' &&
              target.pathname !== '/register' &&
              locations.pathname !== '/login' &&
              locations.pathname !== '/register' &&
              locations.pathname !== target.pathname
            ) {
              main.current?.classList.add('animate-dissolve');
            }
            return;
          }
          target = target.parentNode;
        }
      });
    } else {
      return () => {};
    }
    setLoaded(true);
  }, [isLoaded, locations.pathname]);

  const [bookings, setBookings] = useState(null);
  const location = useLocation();
  const instance = useSecureReq();
  useEffect(() => {
    if (user && !loading) {
      instance
        .get('/booking/' + user.uid)
        .then(res => {
          setBookings(res.data);
        })
        .catch(err => {
          console.log(err);
          Toast('Something went wrong');
        });

      if (moment(getStoredValue('expires')).isBefore()) getToken(user);
    }
  }, [user, location, loading]);

  return (
    <>
        <DataContext.Provider value={{ setBookings, bookings }}>
          <HelmetProvider>
            <Header></Header>

            <main className="animate-dissolve" ref={main}>
              <Outlet></Outlet>
            </main>
          </HelmetProvider>
        </DataContext.Provider>

      <ScrollRestoration />
      <Toaster position="bottom-center" reverseOrder={false} />

      <div
        className={`fixed inset-x-0 h-1/2 bottom-0 [background:linear-gradient(90deg,rgba(255,255,255,0.00)_-0.89%,rgba(255,255,255,0.00)_33.17%,rgba(255,255,255,0.00)_74.15%,rgba(255,255,255,0.00)_101.29%),linear-gradient(0deg,rgba(11,11,18,0.10)_0%,rgba(11,11,18,0.00)_100%)] z-20 pointer-events-none transition-opacity ${
          toasters ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>
    </>
  );
};
