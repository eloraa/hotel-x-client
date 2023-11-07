import { number, string } from 'prop-types';

export const Ratings = ({ count, type }) => {
  if (type === 'diamond')
    return (
      <div className="flex items-center gap-3">
        {[...Array(5).keys()].map(index => (
          <div key={index} className={index < count ? 'text-black' : 'text-dark-white'}>
            <div className="w-5 h-5">
              <svg>
                <use xlinkHref="/assets/vector/symbols.svg#diamond"></use>
              </svg>
            </div>
          </div>
        ))}
      </div>
    );
  return (
    <div className="flex items-center gap-3">
      {[...Array(5).keys()].map(index => (
        <div key={index} className={index < count ? 'text-black' : 'text-dark-white'}>
          <div className="w-5 h-5">
            <svg>
              <use xlinkHref="/assets/vector/symbols.svg#star"></use>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

Ratings.propTypes = {
  count: number,
  type: string,
};
