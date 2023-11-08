import { bool, func, node, string } from 'prop-types';

export const Button = ({ children, noIcon, type, offset, className, iconClass, onClick }) => {
  return (
    <button onClick={onClick} className={`flex justify-between items-center ${!offset ? 'bg-off-white py-4 px-6' : ''} rounded-full gap-24 ${className}` }>
      <h1 className="font-bold uppercase text-sm">{children}</h1>
      {!noIcon && !type && (
        <div className={`w-3 h-3 ${iconClass}`}>
          <svg>
            <use xlinkHref="/assets/vector/symbols.svg#arrow-right"></use>
          </svg>
        </div>
      )}
      {type === 'open' && (
        <div className={`w-3 h-3 ${iconClass}`}>
          <svg>
            <use xlinkHref="/assets/vector/symbols.svg#open"></use>
          </svg>
        </div>
      )}
      
      {type === 'del' && (
        <div className={`w-3 h-3 ${iconClass}`}>
          <svg>
            <use xlinkHref="/assets/vector/symbols.svg#delete"></use>
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
  offset: bool,
  className: string,
  iconClass: string,
  onClick: func
};
