import { useState } from 'react';
import { Button } from '../utils/Button';
import { Ratings } from '../utils/Ratings';
import { useNormalReq } from '../hooks/useNormalReq';
import { Toast } from '../utils/Toast';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export const Featured = () => {
  const [activeSlide, setActiveSlide] = useState(1);

  const changeSlide = i => {
    setActiveSlide(i);
  };
  const instance = useNormalReq();

  const { isPending, error, data } = useQuery({
    queryKey: ['featuredRooms'],
    queryFn: async () => {
      const { data } = await instance.get('/rooms/featured')
      return data
    },
  });


  if(error) Toast('Something went wrong')

  if(isPending) return
  return (
    <section className="py-16 md:px-10 px-5 md:sticky top-0 bg-white pt-24 relative z-10">
      <div className="flex justify-between max-md:flex-col-reverse gap-8">
        <div className="flex gap-5 flex-wrap">
          {data &&
            data.map((e, i) => (
              <button key={i} onMouseOver={() => changeSlide(i + 1)}>
                <figure className="lg:w-32 lg:h-56 h-32 w-16">
                  <img src={e.room_images[0]} className="object-cover" alt="" />
                </figure>
                <h4 className="font-bold text-xs mt-4 text-left">{e.room_id}</h4>
              </button>
            ))}
        </div>
        <h1 className="uppercase font-bold text-4xl">FEATURED ROOMs</h1>
      </div>
      <div className="relative">
        {data &&
          data.map((e, i) => (
            <div
              key={e._id}
              className={`pt-6 grid md:grid-cols-2 gap-8 top-0 left-0 bg-white pb-16 transition-opacity ${activeSlide === i + 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${
                i ? 'absolute' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between font-bold">
                  <h1 className="text-4xl uppercase">{e.room_type}</h1>
                  <h4 className="text-sm">{e.room_id}</h4>
                </div>
                <p className="font-medium mt-6">{e.room_description}</p>
                <div className="flex gap-5 mt-6">
                  <Ratings count={5} type="diamond"></Ratings>
                  <h4 className="text-sm font-semibold">5 Star Rating</h4>
                </div>
                <div className="mt-16">
                  <Link to={'/room/' + e._id}>
                    <Button type="open">Book Now</Button>
                  </Link>
                </div>
              </div>
              <figure className="max-md:min-h-[320px]">
                <img className="object-cover" src={e.room_images[0]} alt="" />
              </figure>
            </div>
          ))}
      </div>
    </section>
  );
};
