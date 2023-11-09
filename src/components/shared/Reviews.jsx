import { useContext, useEffect } from 'react';
import { useNormalReq } from '../hooks/useNormalReq';
import { string } from 'prop-types';
import { Toast } from '../utils/Toast';
import { ReviewContext } from '../providers/ReviewProvider';
import { Ratings } from '../utils/Ratings';

export const Reviews = ({ roomId }) => {
  const instance = useNormalReq();

  const { reviews, setReviews, refresh } = useContext(ReviewContext);

  useEffect(() => {
    if (roomId) {
      instance
        .get('/review/' + roomId)
        .then(res => {
          setReviews(res.data);
        })
        .catch(() => {
          Toast('Something went wrong');
        });
    }
  }, [refresh]);
  if (!roomId) return;

  return (
    <>
      {reviews && reviews.length ? (
        <div className="py-28">
          <h1 className="text-xl font-semibold">User Review</h1>
          <div className="mt-16 grid md:grid-cols-3 xl:grid-cols-4 gap-10">
            {reviews.map((review, i) => (
              <div key={i} className='py-10 px-8 bg-[#f4f4f4] rounded-lg'>
                <div className="flex items-center gap-4">
                  <figure className="w-10 h-10 overflow-hidden rounded-full">
                    <img className="object-cover" src={review?.photoURL ? review?.photoURL : '/assets/images/placeholder/profile.png'} alt="" />
                  </figure>
                  <div>
                    <h1>{review?.name}</h1>
                    <h1><Ratings className="text-blue [&>div>.icon]:w-3 [&>div>.icon]:h-3 gap-2" iconClass="icon" count={parseInt(review?.rating)}></Ratings></h1>
                  </div>
                </div>
                <p className='mt-10'>{review.details}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

Reviews.propTypes = {
  roomId: string,
};
