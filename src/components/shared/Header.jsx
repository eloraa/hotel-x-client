import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/App';
import { AuthContext } from '../providers/AuthProvider';
import { scroll } from '../utils/utils';
import { Toast } from '../utils/Toast';

export const Header = ({ alt }) => {
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);
  const { screen } = useContext(AppContext);
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        Toast('Signed out successfully.');
      })
      .catch(() => Toast('An error occurred. Please try again later'));
  };
  useEffect(() => {
    if(location.state === '/contact') {
      scroll(document.querySelector('.contact'))
      location.state = '/'
    }
    setNavOpen(false);
  }, [location]);

  const showContact = () => {
    setNavOpen(false)
    if(location.pathname !== '/') {
      navigate('/', { state: '/contact' })
      return
    }
    scroll(document.querySelector('.contact'))
  }

  return (
    <header className="py-[.85rem] md:px-10 px-5 flex items-center text-sm justify-between sticky top-0 z-[999] transition-[padding,margin-top] duration-100">
      {!(screen === 'fluid') && <div className="absolute inset-0 bg-white/80 backdrop-blur -z-10"></div>}
      <Link to="/">
        <h1 className={`relative z-[9999] group ${screen === 'fluid' ? 'text-white' : 'text-blue'}`}>
          <div className="w-14">
            <svg viewBox="0 0 56 15">
              <path
                className="group-hover:animate-glow transition-[filter]"
                d="M21.3173 2.61103C21.4953 4.20274 21.5701 4.87153 21.8479 4.96806C22.0492 5.03801 22.3571 4.80747 22.8882 4.40987L22.9997 4.32645C23.6687 3.79679 24.2575 3.45252 24.3378 3.50549C24.3913 3.58493 24.0702 4.11459 23.6152 4.6972C23.1335 5.3063 22.8124 5.88892 22.8927 6.02133C22.973 6.12726 23.8026 6.33912 24.7124 6.41857C25.6491 6.5245 26.7463 6.6834 27.2012 6.76284C27.8702 6.92174 27.9238 6.94822 27.4688 7.1336C27.1744 7.23953 26.1308 7.39843 25.1674 7.50436C22.6251 7.76918 22.4913 7.92808 23.5617 9.22572C24.0434 9.83482 24.3913 10.3645 24.3378 10.4439C24.2575 10.4969 23.6687 10.1261 22.973 9.62296L21.7687 8.69607L21.6081 9.43758C21.5279 9.83482 21.3941 10.6823 21.3138 11.3443C21.241 11.9446 21.1022 12.719 21.0171 13.1939L21.0171 13.1941L20.9926 13.3305L20.8321 14.125L20.618 13.3835C20.5109 12.9862 20.3236 11.874 20.2433 10.9206C20.1363 9.99372 19.949 9.14628 19.8152 9.06683C19.6814 8.98738 19.0926 9.30517 18.4771 9.78186C17.8884 10.2321 17.3531 10.5499 17.2729 10.4969C17.2193 10.4174 17.594 9.80834 18.1024 9.14628L19.0391 7.92808L18.1827 7.76918C17.9949 7.73821 17.7014 7.69515 17.3575 7.64473L17.3572 7.64468L17.3569 7.64464L17.3569 7.64464C16.8189 7.56575 16.1581 7.46885 15.5869 7.37194C14.6503 7.23953 13.8207 7.08063 13.7672 7.00119C13.7136 6.94822 14.7306 6.76284 16.0151 6.57747C17.2996 6.39209 18.4771 6.12726 18.6109 6.02133C18.7447 5.9154 18.4503 5.33278 17.9686 4.72368C17.4869 4.14107 17.1658 3.58493 17.2193 3.50549C17.2996 3.45252 17.9151 3.82328 18.5841 4.32645L18.6147 4.34971L18.6147 4.34972C19.2155 4.80714 19.5463 5.05899 19.7536 4.9826C20.0075 4.88902 20.0759 4.30286 20.2283 2.99866L20.2283 2.99863L20.2433 2.8699C20.6447 -0.599313 20.9659 -0.784691 21.287 2.34025L21.3173 2.61103Z"
                fill="currentColor"
              />
              <path
                d="M1.49506 7.31942V5.76387H10.8284V7.31942H1.49506ZM9.72005 0.319427H11.3728V13.9305H9.72005V0.319427ZM0.581177 0.319427H2.23395V13.9305H0.581177V0.319427Z"
                fill={screen === 'fluid' ? 'currentColor' : 'black'}
              />
              <path d="M27.893 1.87498V0.319427H36.5458V1.87498H33.0458V13.9305H31.393V1.87498H27.893Z" fill={screen === 'fluid' ? 'currentColor' : 'black'} />
              <path
                d="M39.2066 13.9305V12.375H46.0705V13.9305H39.2066ZM39.2066 1.87498V0.319427H46.0705V1.87498H39.2066ZM39.2066 7.31942V5.76387H45.6816V7.31942H39.2066ZM38.2927 0.319427H39.9455V13.9305H38.2927V0.319427Z"
                fill={screen === 'fluid' ? 'currentColor' : 'black'}
              />
              <path d="M48.9834 0.319427H50.6361V12.375H55.9833V13.9305H48.9834V0.319427Z" fill={screen === 'fluid' ? 'currentColor' : 'black'} />
            </svg>
          </div>
        </h1>
      </Link>
      <div className="flex items-center gap-6 md:relative">
        {!alt && (
          <button className={`hover:text-white rounded-full p-5 relative group transition-colors max-h-[55px] ${navOpen || screen === 'fluid' ? 'bg-white' : 'bg-dark-white'}`}>
            <div className="absolute inset-0 bg-blue rounded-full scale-0 transition-transform group-hover:scale-100"></div>
            <div className="w-4 h-4 z-10 relative">
              <svg>
                <use xlinkHref="/assets/vector/symbols.svg#search"></use>
              </svg>
            </div>
          </button>
        )}

        {!alt &&
          (location.pathname === '/login' || location.pathname === 'register' ? (
            location.pathname === '/login' ? (
              <Link to="/register">
                <button className="bg-black text-white rounded-full py-4 px-10 font-semibold uppercase max-md:hidden">Register</button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="bg-black text-white rounded-full py-4 px-10 font-semibold uppercase max-md:hidden">Login</button>
              </Link>
            )
          ) : user ? (
            <button onClick={handleSignOut} className="bg-black text-white rounded-full py-4 px-10 font-semibold uppercase max-md:hidden">
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="bg-black text-white rounded-full py-4 px-10 font-semibold uppercase max-md:hidden">Login</button>
            </Link>
          ))}

        <button
          onClick={() => setNavOpen(!navOpen)}
          className={`hover:text-white rounded-full p-4 group [&.close_.line]:rotate-45 [&.close_.line2]:-rotate-45 [&.close_.lines]:translate-x-[1.5px] relative transition-colors ${
            navOpen ? 'close bg-white' : 'bg-dark-white'
          } ${screen === 'fluid' ? 'bg-white' : ''}`}
        >
          <div className="absolute inset-0 bg-blue rounded-full scale-0 transition-transform group-hover:scale-100"></div>
          <div className="w-5 h-5 flex flex-col gap-1.5 justify-center items-center relative z-10">
            <div className="h-[2px] w-full bg-current rounded-full lines line origin-[22%_center] transition-[transform,background-color]"></div>
            <div className="h-[2px] w-full bg-current rounded-full lines line2 origin-[22%_center] transition-[transform,background-color]"></div>
          </div>
        </button>

        <div className={`absolute top-full md:pt-10 max-md:left-0 max-md:px-5 pb-4 ${alt ? 'w-full md:w-[calc(100%+15rem)] md:right-0' : 'w-full'} ${navOpen ? '' : 'pointer-events-none'}`}>
          <div className={`w-full bg-white rounded-lg py-8 px-4 font-semibold text-xl uppercase transition-[transform,opacity] duration-500 ${navOpen ? '' : '-rotate-2 translate-y-10 opacity-0'}`}>
            <ul>
              <li className="w-full">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-blue py-3 px-6 block pointer-events-none [&>div]:hidden'
                      : 'hover:bg-blue/[.08] w-full rounded-full py-3 px-6 transition-[background-color] duration-200 flex justify-between items-center group'
                  }
                >
                  Home
                  <div className="w-4 h-4 transition-transform scale-0 group-hover:scale-100 duration-500">
                    <svg>
                      <use xlinkHref="/assets/vector/symbols.svg#arrow-right"></use>
                    </svg>
                  </div>
                </NavLink>
              </li>
              <li className="w-full">
                <NavLink
                  to="/rooms"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-blue py-3 px-6 block pointer-events-none [&>div]:hidden'
                      : 'hover:bg-blue/[.08] w-full rounded-full py-3 px-6 transition-[background-color] duration-200 flex justify-between items-center group'
                  }
                >
                  Rooms
                  <div className="w-4 h-4 transition-transform scale-0 group-hover:scale-100 duration-500">
                    <svg>
                      <use xlinkHref="/assets/vector/symbols.svg#arrow-right"></use>
                    </svg>
                  </div>
                </NavLink>
              </li>
              <li className="w-full">
                <NavLink
                  to="/booking"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-blue py-3 px-6 block pointer-events-none [&>div]:hidden'
                      : 'hover:bg-blue/[.08] w-full rounded-full py-3 px-6 transition-[background-color] duration-200 flex justify-between items-center group'
                  }
                >
                  My Bookings
                  <div className="w-4 h-4 transition-transform scale-0 group-hover:scale-100 duration-500">
                    <svg>
                      <use xlinkHref="/assets/vector/symbols.svg#arrow-right"></use>
                    </svg>
                  </div>
                </NavLink>
              </li>
              <li className="w-full">
                <NavLink
                  to="/testimonials"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-blue py-3 px-6 block pointer-events-none [&>div]:hidden'
                      : 'hover:bg-blue/[.08] w-full rounded-full py-3 px-6 transition-[background-color] duration-200 flex justify-between items-center group'
                  }
                >
                  Testimonials
                  <div className="w-4 h-4 transition-transform scale-0 group-hover:scale-100 duration-500">
                    <svg>
                      <use xlinkHref="/assets/vector/symbols.svg#arrow-right"></use>
                    </svg>
                  </div>
                </NavLink>
              </li>
              <li className="w-full">
                <NavLink
                  to="/careers"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-blue py-3 px-6 block pointer-events-none [&>div]:hidden'
                      : 'hover:bg-blue/[.08] w-full rounded-full py-3 px-6 transition-[background-color] duration-200 flex justify-between items-center group'
                  }
                >
                  Careers
                  <div className="w-4 h-4 transition-transform scale-0 group-hover:scale-100 duration-500">
                    <svg>
                      <use xlinkHref="/assets/vector/symbols.svg#arrow-right"></use>
                    </svg>
                  </div>
                </NavLink>
              </li>
              <li className="w-full">
                <button
                  onClick={showContact}
                  className="hover:bg-blue/[.08] w-full rounded-full py-3 px-6 transition-[background-color] duration-200 flex justify-between items-center group uppercase"
                >
                  Contact Us
                  <div className="w-4 h-4 transition-transform scale-0 group-hover:scale-100 duration-500">
                    <svg>
                      <use xlinkHref="/assets/vector/symbols.svg#arrow-right"></use>
                    </svg>
                  </div>
                </button>
              </li>
            </ul>
          </div>
          <div
            className={`w-full ${user ? 'bg-white' : 'bg-black'} text-white text-sm rounded-lg font-semibold mt-4 transition-[transform,opacity] duration-500 ${
              navOpen ? '' : 'rotate-2 translate-y-10 opacity-0'
            }`}
          >
            {user ? (
              <div className="flex py-6 px-10 gap-4 text-black items-center">
                <figure>
                  <Link to="/profile" className="w-10 h-10 overflow-hidden rounded-full bg-green block">
                    <img className="w-full h-full object-cover" src={user.photoURL ? user.photoURL : '/assets/images/placeholder/profile.png'} alt="" />
                  </Link>
                </figure>
                <Link to="/profile" className="grid gap-2">
                  {user?.displayName && <h1 className="text-ellipsis whitespace-nowrap leading-3 text-base font-bold">{user.displayName}</h1>}
                  <h2 className="text-ellipsis whitespace-nowrap leading-3 text-xs">{user.email}</h2>
                </Link>
              </div>
            ) : location.pathname === '/login' ? (
              <Link to="/register">
                <button className="w-full py-4 px-4 uppercase">Register</button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="w-full py-4 px-4 uppercase">Login</button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div
        className={`fixed md:w-1/2 max-md:inset-0 bg-black right-0 inset-y-0 md:[background:linear-gradient(270deg,rgba(11,11,18,.5)_0%,rgba(11,11,18,0)_100%)] [background:linear-gradient(350deg,rgba(11,11,18,.5)_70%,rgba(11,11,18,0)_100%)] z-[-1] transition-opacity pointer-events-none select-none duration-500 ${
          navOpen ? 'opacity-20' : 'opacity-0'
        }`}
      ></div>
    </header>
  );
};

Header.propTypes = {
  alt: PropTypes.bool,
};
