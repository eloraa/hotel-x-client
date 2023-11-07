import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { Header } from './shared/Header';
import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from './context/App';
import { Toaster } from 'react-hot-toast';

export const Root = () => {
  const { setScreen } = useContext(AppContext);
  const locations = useLocation();
  const [isLoaded, setLoaded] = useState(false);
  const main = useRef();

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

  return (
    <>
      <Header></Header>

      <main className="animate-dissolve" ref={main}>
        <Outlet></Outlet>
      </main>

      <ScrollRestoration />
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
};
