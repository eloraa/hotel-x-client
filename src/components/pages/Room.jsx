import { Helmet } from 'react-helmet-async';
import { useNormalReq } from '../hooks/useNormalReq';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Toast } from '../utils/Toast';
import { Error } from '../shared/Error';
import { Swiper, SwiperSlide } from 'swiper/react';
import { register } from 'swiper/element/bundle';
import 'swiper/css';
import { useEffect } from 'react';
import { Button } from '../utils/Button';

export const Room = () => {
  useEffect(() => {
    register();
  }, []);
  const instance = useNormalReq();

  const params = useParams();

  const { isPending, error, data } = useQuery({
    queryKey: ['room'],
    queryFn: async () => {
      const { data } = await instance.get('/rooms/' + params.id);
      return data;
    },
  });
  if (error) Toast('Something went wrong');

  if (isPending) return;
  if (!data) return <Error alt={true}></Error>;

  return (
    <>
      <Helmet>
        <title>Room | Hotel</title>
      </Helmet>

      <div className="md:px-10 px-5 py-12">
        <h1 className="text-4xl font-bold">{data.room_type}</h1>
        <div className="mt-10">
          <Swiper navigation={{ nextEl: '.next', prevEl: '.prev' }} className="h-full w-full" mousewheel={false} loop={true} autoplay={{ delay: 3000 }}>
            {data.room_images.map((image, i) => (
              <SwiperSlide key={i}>
                <figure className="h-[380px] hover:scale-[.99] transition-transform">
                  <img className="object-cover rounded-lg hover:scale-[1.1] transition-transform" src={image} alt="" />
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex items-center gap-6 mt-6 justify-end pr-2">
            <div className="w-4 h-4 rotate-180 stroke-black stroke-1 prev cursor-pointer">
              <svg>
                <use xlinkHref="/assets/vector/symbols.svg#arrow-right"></use>
              </svg>
            </div>
            <div className="w-4 h-4 stroke-black stroke-1 next cursor-pointer">
              <svg>
                <use xlinkHref="/assets/vector/symbols.svg#arrow-right"></use>
              </svg>
            </div>
          </div>
          <div className="flex justify-between text-sm font-medium mt-16">
            <p>{data.room_description}</p>
            <div className="whitespace-nowrap flex gap-10">
              <div>
                <h4>Room Size</h4>
                <h1 className='mt-1'>{data.room_size}</h1>
              </div>
              <div>
                <h4>Perks</h4>
                <h1 className="flex gap-1 mt-1">
                  {data.available_with_room.map((perk, i) => (
                    <span key={i}>{perk}</span>
                  ))}
                </h1>
              </div>
              <div>
                <h1 className="font-bold">${data.price_per_night}</h1>
                <h1 className='mt-1'>Total Review 12</h1>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <form className="flex items-center gap-5">
              <Button type="open">Book Now</Button>
              <h4 className='text-neutral-400'>Select a date: </h4>
              <div>
                <input type="date" name="date" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
