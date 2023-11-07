import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';
import { Banner } from '../shared/Banner';
import { Featured } from '../shared/Featured';
import { FluidHero } from '../shared/FluidHero';

gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
  const main = useRef(null);

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
          fontSize: '2rem',
        },
        'l'
      ).to(
        '.banner',
        {
          top: '20vh',
        },
        'l'
      );

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: '.fluid',
          start: 'top top',
          end: 'bottom center',
          scrub: 1,
        },
      });

      tl2.to('.fluidFig', {
        scale: 1.2,
        filter: 'grayscale(.5)',
      });

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

  return (
    <div ref={main}>
      <Banner></Banner>
      <Featured></Featured>
      <FluidHero></FluidHero>
      <section className="bg-green h-screen sticky top-0 z-10 mt-[100vh]"></section>
    </div>
  );
};
