import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useNormalReq } from '../hooks/useNormalReq';
import { Toast } from '../utils/Toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQueryParams } from '../hooks/useQueryParams';
import { useEffect } from 'react';

export const Rooms = () => {
  const instance = useNormalReq();
  const queryParams = useQueryParams();
  const navigate = useNavigate();
  const location = useLocation();

  const getData = async () => {
    const { data } = await instance.get('/rooms');
    return data;
  };

  const mutation = useMutation({
    onSettled: () => {
      QueryClient.invalidateQueries('rooms');
    },
  });
  const { isPending, error, data } = useQuery({
    queryKey: ['rooms'],
    queryFn: () => getData(),
  });

  useEffect(() => {
    if (data) {
      if (queryParams.get('sort') === 'low' || queryParams.get('sort') === 'high') {
        const newData = data.sort((a, b) => (queryParams.get('sort') === 'low' ? a.price_per_night - b.price_per_night : b.price_per_night - a.price_per_night));
        mutation.mutate(newData);
        return () => {};
      } else return () => {};
    }
  }, [location, data, queryParams]);

  if (error) Toast('Something went wrong');

  if (isPending) return;
  const handleChange = e => {
    navigate('/rooms?sort=' + e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Room | Hotel</title>
      </Helmet>
      <div className="md:px-10 px-5 py-12">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-4xl uppercase">Rooms</h1>

          <div className="flex items-center gap-1 text-sm bg-off-white rounded-lg cursor-pointer relative">
            <div className="flex items-center gap-1">
              <h4 className="text-neutral-400 absolute left-6">Sort By:</h4>
              <select name="sort" className="appearance-none outline-none bg-transparent border-none font-semibold py-4 pl-20 pr-16 z-10 cursor-pointer" onChange={handleChange} defaultValue={queryParams.get('sort')}>
                <option disabled selected>Sort</option>
                <option value="high">Price High to Low</option>
                <option value="low">Price Low to High</option>
              </select>
            </div>
            <div className="w-3 h-3 rotate-90 stroke-black stroke-1 absolute right-6">
              <svg>
                <use xlinkHref="/assets/vector/symbols.svg#arrow-right"></use>
              </svg>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-20">
          {data.map(room => (
            <div key={room._id}>
              <Link to={'/room/' + room._id}>
                <figure className="h-[320px] hover:scale-[.99] transition-transform overflow-hidden">
                  <img className="object-cover rounded-lg hover:scale-[1.1] transition-transform" src={room.room_images[0]} alt="" />
                </figure>
                <div className='flex justify-between items-center mt-5 font-semibold '>
                  <h1 className="text-lg">{room.room_type}</h1>
                  <h4 className='text-sm'>${room.price_per_night}</h4>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
