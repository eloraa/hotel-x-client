import { useState } from 'react';
import { Button } from '../utils/Button';
import { Ratings } from '../utils/Ratings';

export const Featured = () => {

  const [activeSlide, setActiveSlide] = useState(1)

  const changeSlide = i => {
        setActiveSlide(i);
  };


  return (
    <section className="py-16 h-screen md:px-10 px-5 sticky top-0 bg-white pt-36">
      <div className="flex justify-between max-md:flex-col-reverse">
        <div className="flex gap-5 flex-wrap">
          <button onMouseOver={() => changeSlide(1)}>
            <figure className="md:w-32 md:h-56 h-32 w-16">
              <img src="#" alt="" />
            </figure>
            <h4 className="font-bold text-xs mt-4 text-left">102</h4>
          </button>
          <button onMouseOver={() => changeSlide(2)}>
            <figure className="md:w-32 md:h-56 h-32 w-16">
              <img src="#" alt="" />
            </figure>
            <h4 className="font-bold text-xs mt-4 text-left">102</h4>
          </button>
          <button onMouseOver={() => changeSlide(3)}>
            <figure className="md:w-32 md:h-56 h-32 w-16">
              <img src="#" alt="" />
            </figure>
            <h4 className="font-bold text-xs mt-4 text-left">102</h4>
          </button>
        </div>
        <h1 className="uppercase font-bold text-4xl">FEATURED ROOMs</h1>
      </div>
      <div className="relative">
        <div className={`mt-12 grid md:grid-cols-2 gap-8 absolute bg-red pb-16 transition-opacity ${activeSlide === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div>
            <div className="flex items-center justify-between font-bold">
              <h1 className="text-4xl uppercase">Grand Suite</h1>
              <h4 className="text-sm">102</h4>
            </div>
            <p className="font-medium mt-6">
              Indulge in opulence in our Grand Suite, featuring a breathtaking view of the city skyline. This expansive suite offers a separate living and dining area, a king-sized bed, and a private
              terrace.
            </p>
            <div className="flex gap-5 mt-6">
              <Ratings count={3} type="diamond"></Ratings>
              <h4 className="text-sm font-semibold">5 Star Rating</h4>
            </div>
            <div className="mt-16">
              <Button type="open">Book Now</Button>
            </div>
          </div>
          <figure className="max-md:min-h-[320px]">
            <img className="object-cover" src="#" alt="" />
          </figure>
        </div>
        <div className={`mt-12 grid grid-cols-2 gap-8 absolute bg-green pb-16 transition-opacity ${activeSlide === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div>
            <div className="flex items-center justify-between font-bold">
              <h1 className="text-4xl uppercase">Apatoto DIyechi</h1>
              <h4 className="text-sm">102</h4>
            </div>
            <p className="font-medium mt-6">
              Indulge in opulence in our Grand Suite, featuring a breathtaking view of the city skyline. This expansive suite offers a separate living and dining area, a king-sized bed, and a private
              terrace.
            </p>
            <div className="flex gap-5 mt-6">
              <Ratings count={4} type="diamond"></Ratings>
              <h4 className="text-sm font-semibold">5 Star Rating</h4>
            </div>
            <div className="mt-16">
              <Button type="open">Book Now</Button>
            </div>
          </div>
          <figure className="max-md:min-h-[320px]">
            <img className="object-cover" src="#" alt="" />
          </figure>
        </div>
        <div className={`mt-12 grid grid-cols-2 gap-8 absolute bg-blue pb-16 transition-opacity ${activeSlide === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div>
            <div className="flex items-center justify-between font-bold">
              <h1 className="text-4xl uppercase">Holy Town</h1>
              <h4 className="text-sm">102</h4>
            </div>
            <p className="font-medium mt-6">
              Indulge in opulence in our Grand Suite, featuring a breathtaking view of the city skyline. This expansive suite offers a separate living and dining area, a king-sized bed, and a private
              terrace.
            </p>
            <div className="flex gap-5 mt-6">
              <Ratings count={5} type="diamond"></Ratings>
              <h4 className="text-sm font-semibold">5 Star Rating</h4>
            </div>
            <div className="mt-16">
              <Button type="open">Book Now</Button>
            </div>
          </div>
          <figure className="max-md:min-h-[320px]">
            <img className="object-cover" src="#" alt="" />
          </figure>
        </div>
      </div>
    </section>
  );
};
