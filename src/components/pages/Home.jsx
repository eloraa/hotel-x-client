import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
  const main = useRef(null);

  useLayoutEffect(() => {
    if (main.current) {
      gsap.to('.heading', {
        scrollTrigger: {
          trigger: '.main',
          start: 'top top',
          end: 'bottom center',
          scrub: 1,
        },
        fontSize: '2vw',
      });
    }
  }, []);

  return (
    <div ref={main}>
      <section className="animate-dissolve-in md:px-10 px-5 main">
        <div>
          <div className="fixed inset-x-0 md:px-10 px-5 top-20 pt-10 text-[5.5vw] heading -z-10">
            <h1 className="text-justify [text-align-last:justify]">Unleash Your Adventure Discover Explore Enjoy!</h1>
          </div>
          <div className="h-[40vh]"></div>
          <figure className="mt-10 pt-40 md:pt-52 pb-10 banner h-screen relative">
            <div className="absolute inset-x-0 bg-white bottom-0 h-1/2 -z-10"></div>
            <img className="rounded-lg object-cover" src="/assets/images/banner.png" alt="" />
          </figure>
        </div>
      </section>
    </div>
  );
};
