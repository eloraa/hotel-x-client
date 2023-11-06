import { Outlet } from 'react-router-dom';
import { Header } from './shared/Header';

export const Root = () => {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
    </>
  );
};
