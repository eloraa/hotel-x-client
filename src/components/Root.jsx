import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './shared/Header';
import { useContext, useEffect } from 'react';
import { AppContext } from './context/App';

export const Root = () => {

  const { setScreen } = useContext(AppContext)
  const location = useLocation()
  useEffect(() => {
    if(location.pathname === '/login' || location.pathname === '/register') {   
      setScreen('fluid')
    }
    else {
      setScreen(null)
    }
  }, [setScreen, location])
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
};
