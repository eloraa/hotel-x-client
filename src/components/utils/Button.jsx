import { bool, node, string } from 'prop-types';

export const Button = ({ children, noIcon, type }) => {
  return (
    <button className="flex justify-between items-center bg-off-white py-4 px-6 rounded-full gap-24">
      <h1 className="font-bold uppercase text-sm">{children}</h1>
      {!noIcon && type !== 'open' && (
        <div className="w-3 h-3">
          <svg>
            <use xlinkHref="/assets/vector/symbols.svg#arrow-right"></use>
          </svg>
        </div>
      )}
      {type === 'open' && (
        <div className="w-3 h-3">
          <svg>
            <use xlinkHref="/assets/vector/symbols.svg#open"></use>
          </svg>
        </div>
      )}
    </button>
  );
};

Button.propTypes = {
  children: node,
  noIcon: bool,
  type: string,
};
