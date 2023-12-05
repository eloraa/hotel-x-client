import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';
import { Banner } from '../shared/Banner';
import { Featured } from '../shared/Featured';
import { FluidHero } from '../shared/FluidHero';
import { Footer } from '../shared/Footer';
import { Helmet } from 'react-helmet-async';

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

    }
  }, []);

  return (
    <div ref={main}>
      <Helmet>
        <title>Home | Hotel</title>
      </Helmet>
      <Banner></Banner>
      <Featured></Featured>
      <FluidHero></FluidHero>
      <Footer></Footer>
    </div>
  );
};
