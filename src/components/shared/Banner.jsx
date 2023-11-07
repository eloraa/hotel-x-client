import { useState } from "react";

export const Banner = () => {
  const [playing, setPlaying] = useState(false);
  const playVideo = e => {
    e.target.removeEventListener('ended', () => setPlaying(false));
    if (e.target.paused) {
      e.target.play();
      setPlaying(true);
    } else {
      e.target.pause();
      setPlaying(false);
    }
    e.target.addEventListener('ended', () => setPlaying(false));
  };
  return (
    <div className="animate-dissolve-in main md:px-10 px-5 pb-[30rem] relative">
        <div className="fixed -z-10 inset-0 bg-white"></div>
      <div>
        <div className="fixed inset-x-0 md:px-10 px-5 top-20 pt-10 text-[2rem] md:text-[3.8rem] xl:text-[5.5vw] heading -z-10">
          <h1 className="text-justify [text-align-last:justify]">Unleash Your Adventure Discover Explore Enjoy!</h1>
        </div>
        <div className="h-[140vh]"></div>
        <figure className="mt-10 banner inset-x-0 h-[60vh] fixed top-[70vh] md:mx-10 mx-5 hover:scale-[.99] transition-transform duration-500 overflow-hidden cursor-pointer">
          <div className={`absolute inset-0 z-10 flex justify-center items-center pointer-events-none transition-opacity ${playing ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-24 h-24 bg-white rounded-full p-8">
              <svg>
                <use xlinkHref="/assets/vector/symbols.svg#play"></use>
              </svg>
            </div>
          </div>
          <video poster="/assets/images/banner.png" onClick={playVideo} className="rounded-lg object-cover hover:scale-[1.1] transition-transform duration-500" src="/assets/videos/banner.mp4"></video>
        </figure>
      </div>
    </div>
  );
};
