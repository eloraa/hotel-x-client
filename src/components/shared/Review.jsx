import { object } from 'prop-types';
import { Ratings } from '../utils/Ratings';

export const Review = ({ review }) => {
  return (
    <div className="py-10 px-8 bg-[#f4f4f4] rounded-lg">
      <div className="flex items-center gap-4">
        <figure className="w-10 h-10 overflow-hidden rounded-full">
          <img className="object-cover" src={review?.photoURL ? review?.photoURL : '/assets/images/placeholder/profile.png'} alt="" />
        </figure>
        <div>
          <h1>{review?.name}</h1>
          <h1>
            <Ratings className="text-blue [&>div>.icon]:w-3 [&>div>.icon]:h-3 gap-2" iconClass="icon" count={parseInt(review?.rating)}></Ratings>
          </h1>
        </div>
      </div>
      <p className="mt-10 text-[.95rem]">{review.details}</p>
    </div>
  );
};

Review.propTypes = {
  review: object,
};
