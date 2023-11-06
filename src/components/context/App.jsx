import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [screen, setScreen] = useState(null);
  return <AppContext.Provider value={{ screen, setScreen }}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node,
};
