import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { scroll } from '../utils/utils';
import { Toast } from '../utils/Toast';
import axios from 'axios';
import { createMap } from '../utils/createMap';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

export const Footer = () => {
  const [isSubbed, setIsSubbed] = useState(false);
  const [validMail, setValidMail] = useState(false);

  useEffect(() => {
    createMap(28.94772, 52.23164, 'map');
  }, []);

  const handleEmail = e => {
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value)) setValidMail(true);
    else setValidMail(false);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (isSubbed) return;

    let email;
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.email.value)) email = e.target.email.value;
    else Toast('Enter a valid Email.');

    if (email) {
      axios
        .post(`${import.meta.env.VITE_BACKENDSERVER}/newsletter`, { email })
        .then(result => {
          if (result.data.success) {
            Toast('Thanks for subscribing to our Newsletter.');
            setIsSubbed(true);
          }
          if (result.data.errors) {
            throw result.data.errors;
          }
        })
        .catch(err => {
          if (err.response.data.errors[0]?.messages[0] === '"email" already exists') {
            Toast('You have already subscribed to our newsletter.');
            setIsSubbed(true);
            return;
          }
          Toast('Something went wrong.');
        });
    }
  };
  return (
    <footer className="md:px-10 px-5 contact relative md:h-screen bg-white mt-[120vh] z-10 py-12 pt-24 md:pt-32 md:flex-col md:flex max-md:pb-32">
      <div className="grid md:grid-cols-2 md:gap-28">
        <div>
          <h1 className="max-w-sm text-3xl md:text-5xl">Subscribe to our newsletter</h1>
          {isSubbed ? (
            <div className="bg-dark-white rounded-lg mt-8 px-8 py-6 font-semibold">Thanks for subscribing to our newsletter</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex bg-dark-white rounded-lg mt-8 px-8">
                <div className="w-full">
                  <input onChange={handleEmail} className="w-full py-6 bg-transparent outline-none" placeholder="Email" type="email" name="email" />
                </div>
                <button className={`transition-transform ${validMail ? 'scale-100' : 'scale-0 pointer-events-none duration-500'}`}>
                  <div className="w-5 h-5">
                    <svg>
                      <use xlinkHref="/assets/vector/symbols.svg#arrow-right"></use>
                    </svg>
                  </div>
                </button>
              </div>
            </form>
          )}
        </div>
        <div className="flex flex-col justify-between max-md:mt-8">
          <div>
            <h1 className="text-4xl text-justify [text-align-last:justify] font-semibold">9 Florabunda Cir, Orange City, Florida 32763, USA</h1>
          </div>
          <div className="flex justify-between items-center text-sm font-semibold flex-wrap max-md:mt-8 gap-4">
            <a href="mailto:hello@hotel.com">hello@hotel.com</a>
            <ul className="flex items-center gap-5 max-md:justify-between max-md:w-full">
              <li>
                <a href="#">Twitter/X</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div id="map" className="h-[320px] rounded-lg overflow-hidden mt-10 mb-24"></div>
      <div className="flex items-center justify-between font-medium mt-32 flex-wrap md:mt-auto">
        <p className="max-md:text-center max-md:w-full">©2023 Hotel Inc. All Right Reserved.</p>
        <ul className="flex items-center gap-5 max-md:w-full max-md:mt-8 max-md:text-xs justify-between">
          <li>
            <Link to="/terms">Terms & Condition</Link>
          </li>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
        </ul>
      </div>
      <div className="absolute inset-x-0 flex items-center justify-center bottom-10 md:bottom-9">
        <button onClick={() => scroll(0)} className="bg-white font-bold uppercase text-sm py-4 px-6 rounded-full flex items-center gap-11">
          <div className="w-5 h-3">
            <svg>
              <use xlinkHref="/assets/vector/symbols.svg#arrow-top"></use>
            </svg>
          </div>{' '}
          Go to top
          <div className="w-5 h-3">
            <svg>
              <use xlinkHref="/assets/vector/symbols.svg#arrow-top"></use>
            </svg>
          </div>
        </button>
      </div>
      <div className="absolute inset-x-0 md:w-1/2 bottom-0 h-1/2 bg-black mx-auto -z-10 [background:linear-gradient(90deg,#FFF_0%,rgba(255,255,255,0.00)_25.56%,rgba(255,255,255,0.00)_78.08%,#FFF_100%),linear-gradient(0deg,rgba(11,11,18,0.10)_0%,rgba(11,11,18,0.00)_100%);]"></div>
    </footer>
  );
};
