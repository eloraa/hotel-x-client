import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
  const main = useRef(null);
  const [playing, setPlaying] = useState(false)

  useLayoutEffect(() => {
    if (main.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.main',
          start: 'top top',
          end: 'bottom center',
          scrub: 1,
        },
      });

      tl.to(
        '.heading',
        {
          fontSize: '2vw',
        },
        'l'
      ).to(
        '.banner',
        {
          top: '20vh',
        },
        'l'
      );

      let sections = gsap.utils.toArray('sections');

      sections.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'bottom bottom',
          pin: i === sections.length - 1 ? false : true,
          end: i === 0 ? '+=200%' : '+=100%',
          pinSpacing: false,
        });
      });
    }
  }, []);


  const playVideo = e => {
    e.target.removeEventListener('ended', () => setPlaying(false))
    if(e.target.paused) {
      e.target.play()
      setPlaying(true)
    }
    else {
      e.target.pause()
      setPlaying(false)
    }
    e.target.addEventListener('ended', () => setPlaying(false))
  }

  return (
    <div ref={main}>
      <div className="animate-dissolve-in main md:px-10 px-5 pb-[30rem]">
        <div>
          <div className="fixed inset-x-0 md:px-10 px-5 top-20 pt-10 text-[5.5vw] heading -z-10">
            <h1 className="text-justify [text-align-last:justify]">Unleash Your Adventure Discover Explore Enjoy!</h1>
          </div>
          <div className="h-[140vh]"></div>
          <figure className="mt-10 banner inset-x-0 h-[60vh] fixed top-[70vh] md:mx-10 mx-5 hover:scale-[.99] transition-transform duration-500 overflow-hidden cursor-pointer">
            <div className={`absolute inset-0 z-10 flex justify-center items-center pointer-events-none transition-opacity ${playing ? 'opacity-0' : 'opacity-100'}`}>
              <div className='w-24 h-24 bg-white rounded-full p-8'>
                <svg>
                  <use xlinkHref="/assets/vector/symbols.svg#play"></use>
                </svg>
              </div>
            </div>
            <video onClick={playVideo} className="rounded-lg object-cover hover:scale-[1.1] transition-transform duration-500" src="/assets/videos/banner.mp4"></video>
          </figure>
        </div>
      </div>
      <section className="py-16 h-screen sticky top-0 bg-white">
        <div className="flex justify-between">
          <div className="flex gap-5">
            <button>
              <figure className="w-32 h-56">
                <img src="#" alt="" />
              </figure>
              <h4 className="font-bold text-xs mt-4 text-left">102</h4>
            </button>
            <button>
              <figure className="w-32 h-56">
                <img src="#" alt="" />
              </figure>
              <h4 className="font-bold text-xs mt-4 text-left">102</h4>
            </button>
            <button>
              <figure className="w-32 h-56">
                <img src="#" alt="" />
              </figure>
              <h4 className="font-bold text-xs mt-4 text-left">102</h4>
            </button>
          </div>
          <h1 className="uppercase font-bold text-4xl">FEATURED ROOMs</h1>
        </div>

        <div className="mt-8 grid grid-cols-2">
          <div></div>
          <figure>
            <img src="#" alt="" />
          </figure>
        </div>
      </section>
      <section className="py-16 h-screen sticky top-0 bg-black"></section>
    </div>
  );
};
