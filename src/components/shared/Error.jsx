import PropTypes from 'prop-types';
import { Header } from './Header';
import { viewport } from '../utils/utils';
import { useNavigate } from 'react-router-dom';

export const Error = ({ alt }) => {
  const { height } = viewport();
  const naviage = useNavigate()
  return (
    <>
      {!alt && <Header alt={true}></Header>}
      <div className="h-full grid place-content-center absolute inset-0 overflow-hidden [transform-style:preserve-3d]" style={{ height }}>
        <div className='flex items-center justify-center group [transform-style:preserve-3d]'>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="314" height="129" viewBox="0 0 314 129" fill="none">
              <path d="M95.592 99.9H73.792V128.5H63.992V99.9H2.59199L0.791992 89.7L68.192 0.5H73.792V92.1H97.192L95.592 99.9ZM10.792 92.1H63.992V20.7L10.792 92.1Z" fill="black" />
              <path d="M311.608 99.9H289.808V128.5H280.008V99.9H218.608L216.808 89.7L284.208 0.5H289.808V92.1H313.208L311.608 99.9ZM226.808 92.1H280.008V20.7L226.808 92.1Z" fill="black" />
            </svg>
          </div>
          <div className='absolute not mix-blend-difference flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" fill="none">
              <path
                d="M69.0009 23.2163C70.6127 37.6327 71.2899 43.69 73.8062 44.5643C75.6295 45.1979 78.4185 43.1098 83.2285 39.5087L83.2348 39.504C83.56 39.2605 83.8945 39.0101 84.2385 38.7531C90.298 33.956 95.6304 30.8379 96.3575 31.3176C96.8422 32.0371 93.9337 36.8343 89.8132 42.1111C85.4504 47.6278 82.5419 52.9046 83.269 54.1039C83.9962 55.0634 91.5099 56.9822 99.7508 57.7018C108.234 58.6612 118.172 60.1003 122.292 60.8199C128.351 62.2591 128.836 62.4989 124.716 64.1779C122.05 65.1373 112.597 66.5765 103.871 67.5359C80.8452 69.9344 79.6334 71.3736 89.3285 83.1266C93.6913 88.6433 96.8422 93.4404 96.3575 94.16C95.6304 94.6397 90.298 91.2817 83.9962 86.7244L73.0891 78.3294L71.6348 85.0454C70.9077 88.6433 69.6958 96.3187 68.9687 102.315C68.3095 107.752 67.0525 114.765 66.2817 119.066L66.2813 119.068L66.2653 119.158C66.1921 119.566 66.1233 119.95 66.0601 120.304L64.6059 127.5L62.6668 120.784C61.6973 117.186 60.0007 107.112 59.2735 98.4774C58.304 90.0824 56.6074 82.407 55.3955 81.6874C54.1836 80.9679 48.8513 83.8461 43.2766 88.1636C37.9442 92.2411 33.0966 95.1194 32.3695 94.6397C31.8847 93.9201 35.278 88.4034 39.8833 82.407L48.3665 71.3736L40.6104 69.9344C38.9094 69.6539 36.2505 69.264 33.1364 68.8073L33.133 68.8068L33.1306 68.8065C28.2585 68.092 22.2734 67.2143 17.0997 66.3366C8.61639 65.1373 1.10265 63.6982 0.617904 62.9786C0.133127 62.4989 9.34354 60.8199 20.9777 59.1409C32.6119 57.4619 43.2766 55.0634 44.4884 54.1039C45.7003 53.1445 43.0342 47.8676 38.6713 42.3509C34.3085 37.0741 31.4 32.0371 31.8847 31.3176C32.6119 30.8379 38.1866 34.1958 44.2461 38.7531L44.5229 38.9638L44.523 38.964C49.9647 43.1069 52.9607 45.3878 54.8377 44.6959C57.1372 43.8484 57.7573 38.5395 59.1372 26.7271L59.1373 26.7269L59.2735 25.561C62.9092 -5.86019 65.8178 -7.53919 68.7263 20.7639C68.8165 21.5672 68.9037 22.3472 68.9884 23.1043L69.0009 23.2163Z"
                fill="white"
              />
            </svg>
          </div>
          <div className='animate-3d-rotate absolute [&>span]:absolute [transform-style:preserve-3d] [&>span]:[transform:rotateY(calc(var(--i)*calc(360deg/40)))_translateZ(240px)] [&>span]:bg-blue text-green transition-colors group-hover:[&>span]:bg-green group-hover:text-blue [&>span]:w-12 [&>span]:h-12 [&>span]:flex [&>span]:items-center [&>span]:justify-center font-bold text-lg'>
            <span style={{ "--i": 1 }}>N</span>
            <span style={{ "--i": 2 }}>O</span>
            <span style={{ "--i": 3 }}>T</span>
            <span style={{ "--i": 4 }}></span>
            <span style={{ "--i": 5 }}>F</span>
            <span style={{ "--i": 6 }}>O</span>
            <span style={{ "--i": 7 }}>U</span>
            <span style={{ "--i": 8 }}>N</span>
            <span style={{ "--i": 9 }}>D</span>
            <span style={{ "--i": 10 }}> </span>
            <span style={{ "--i": 11 }}>N</span>
            <span style={{ "--i": 12 }}>O</span>
            <span style={{ "--i": 13 }}>T</span>
            <span style={{ "--i": 14 }}> </span>
            <span style={{ "--i": 15 }}>F</span>
            <span style={{ "--i": 16 }}>O</span>
            <span style={{ "--i": 17 }}>U</span>
            <span style={{ "--i": 18 }}>N</span>
            <span style={{ "--i": 19 }}>D</span>
            <span style={{ "--i": 20 }}> </span>
            <span style={{ "--i": 21 }}>N</span>
            <span style={{ "--i": 22 }}>O</span>
            <span style={{ "--i": 23 }}>T</span>
            <span style={{ "--i": 24 }}> </span>
            <span style={{ "--i": 25 }}>F</span>
            <span style={{ "--i": 26 }}>O</span>
            <span style={{ "--i": 27 }}>U</span>
            <span style={{ "--i": 28 }}>N</span>
            <span style={{ "--i": 29 }}>D</span>
            <span style={{ "--i": 30 }}> </span>
            <span style={{ "--i": 31 }}>N</span>
            <span style={{ "--i": 32 }}>O</span>
            <span style={{ "--i": 33 }}>T</span>
            <span style={{ "--i": 34 }}> </span>
            <span style={{ "--i": 35 }}>F</span>
            <span style={{ "--i": 36 }}>O</span>
            <span style={{ "--i": 37 }}>U</span>
            <span style={{ "--i": 38 }}>N</span>
            <span style={{ "--i": 39 }}>D</span>
            <span style={{ "--i": 40 }}> </span>
          </div>
        </div>
        <button className='mt-10 font-bold uppercase' onClick={() => naviage(-1)}>Go Back</button>
      </div>
      {/* {!alt && <Footer></Footer>} */}
    </>
  );
};

Error.propTypes = {
  alt: PropTypes.bool,
};
