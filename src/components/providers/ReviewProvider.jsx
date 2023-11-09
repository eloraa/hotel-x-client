import { node } from 'prop-types';
import { createContext, useState } from 'react';

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState();
  const [refresh, setRefresh] = useState(false);
  return <ReviewContext.Provider value={{ reviews, setReviews, refresh, setRefresh }}>{children}</ReviewContext.Provider>;
};
ReviewProvider.propTypes = {
  children: node,
};
