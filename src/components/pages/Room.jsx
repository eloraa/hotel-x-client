import 'swiper/css';
import { Helmet } from 'react-helmet-async';
import { useNormalReq } from '../hooks/useNormalReq';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Toast } from '../utils/Toast';
import { Error } from '../shared/Error';
import { Swiper, SwiperSlide } from 'swiper/react';
import { register } from 'swiper/element/bundle';
import { useContext, useEffect, useState } from 'react';
import { Button } from '../utils/Button';
import { useSecureReq } from '../hooks/useSecureReq';
import { AuthContext } from '../providers/AuthProvider';
import { DataContext } from '../Root';
import { RatingsInput } from '../utils/RatingsInput';

export const Room = () => {
  useEffect(() => {
    register();
  }, []);
  const instance = useNormalReq();
  const secureReq = useSecureReq();
  const { user } = useContext(AuthContext);
  const { bookings } = useContext(DataContext);
  const [popup, setPopup] = useState(false)
  const navigate = useNavigate();

  const params = useParams();

  const { refetch, isPending, error, data } = useQuery({
    queryKey: ['room'],
    queryFn: async () => {
      const { data } = await instance.get('/rooms/' + params.id);
      return data;
    },
  });
  if (error) return Toast('Something went wrong');

  if (isPending) return;
  if (!data) return <Error alt={true}></Error>;


  let booking;
  if (data && bookings) booking = bookings.filter(e => e.roomId === data._id);
  const handleSubmit = e => {
    e.preventDefault();

    if (!user) {
      navigate('/login', { state: location.pathname });
      return;
    }

    const date = e.target.date.value;
    if (isNaN(new Date(date).getTime())) {
      Toast('Select a valid date.');
      return;
    }

    secureReq
      .post('/booking/book', {
        uid: user.uid,
        email: user.email,
        roomId: data._id,
        date: date,
      })
      .then(res => {
        if (res.data.success) {
          refetch();
          Toast('Successfully booked the room');
          navigate('/booking');
        } else Toast('Already booked or something is wrong');
      })
      .catch(err => {
        console.log(err.response);
        Toast('Something went wrong');
      });
  };

  const handleReview = e => {
    e.preventDefault();

    if (!user) {
      navigate('/login', { state: location.pathname });
      return;
    }

    const date = new Date();
    const name = e.target.name.value;
    const details = e.target.details.value;
    const rating = e.target.rating.value;

    if (details.length < 15)
      return Toast(
        <>
          Your review details should be at least <b>15 characters</b> long
        </>
      );
    if (!name || !details || !rating || name === '' || details === '' || rating === '') return Toast('Check your input value');

    secureReq
      .post('/review', {
        uid: user.uid,
        email: user.email,
        name,
        date,
        details,
        roomId: data._id,
      })
      .then(res => {
        if (res.data.success) {
          setPopup(false)
          Toast('Successfully added the review');
        } else Toast('something went wrong');
      })
      .catch(err => {
        console.log(err.response);
        Toast('Something went wrong');
      });
  };

  return (
    <>
      <Helmet>
        <title>Room | Hotel</title>
      </Helmet>

      <div className="md:px-10 px-5 py-12">
        <h1 className="text-4xl font-bold">{data.room_type}</h1>

        <div className="mt-10">
          <Swiper navigation={{ nextEl: '.next', prevEl: '.prev' }} className="h-full w-full" mousewheel={false} loop={true} autoplay={{ delay: 3000 }}>
            {data &&
              data?.room_images?.map((image, i) => (
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
          <div className="flex justify-between text-sm font-medium mt-16 gap-5 max-md:flex-wrap">
            <p>{data.room_description}</p>
            <div className="whitespace-nowrap font-normal flex gap-10 max-md:flex-wrap">
              <div>
                <h4>Room Size</h4>
                <h1 className="mt-1 font-semibold">{data.room_size}</h1>
              </div>
              <div>
                <h4>Perks</h4>
                <h1 className="flex gap-1 mt-1 flex-wrap font-semibold">{data && data.available_with_room.map((perk, i) => <span key={i}>{perk}</span>)}</h1>
              </div>
              <div>
                <h1 className="font-bold text-right">${data.price_per_night}</h1>
                <h1 className="mt-1 font-semibold">Total Review 12</h1>
              </div>
            </div>
          </div>
          <div className="mt-10">
            {!user || (data.remaining_count && booking && !booking.length) ? (
              <form onSubmit={handleSubmit} className="flex items-center gap-5 max-md:flex-wrap">
                <Button type="open">Book Now</Button>
                <h4 className="text-neutral-400">Select a date: </h4>
                <div>
                  <input type="date" name="date" min={new Date().toISOString().split('T')[0]} />
                </div>
              </form>
            ) : (
              <>
                <div className={`fixed inset-0 [background:linear-gradient(90deg,rgba(155,155,155,.35)_0%,rgba(255,255,255,0.20)_8.55%,rgba(255,255,255,_0.20)_97.55%,rgba(155,155,155,.35)_100%),linear-gradient(0deg,rgba(11,11,18,0.10)_0%,rgba(11,11,18,0.00)_100%)] flex items-center justify-center transition-opacity z-10 popup ${popup ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={(e) => e.target.classList.contains('popup') && setPopup(false) }>
                  <div className="flex flex-col justify-center items-center w-full md:px-10 px-5 md:w-[28rem] max-w-md">
                    <div className="md:px-10 px-5 py-14 bg-white rounded-lg text-center max-md:w-full w-full">
                      <h1 className="font-semibold">Write us a Review</h1>
                      <form onSubmit={handleReview} className="mt-6 grid gap-4">
                        <div className="w-full">
                          <input className="w-full py-4 outline-none px-6 rounded-md bg-off-white" type="text" name="name" placeholder="Name" defaultValue={user?.displayName} required />
                        </div>
                        <div className="w-full">
                          <textarea className="w-full py-4 outline-none px-6 rounded-md bg-off-white resize-none" name="details" rows={4} placeholder="Write are you thinking?" required></textarea>
                        </div>
                        <div className="w-full flex items-center gap-4 py-4">
                          <RatingsInput className="w-full flex items-center justify-center gap-5" iconClass="bg-blue"></RatingsInput>
                        </div>
                        <button className="bg-black w-full max-md:mt-6 py-5 text-white font-bold rounded-md active:scale-[.99] transition-transform text-sm">Submit</button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="bg-dark-white rounded-lg mt-8 px-8 py-6 font-semibold w-full md:w-auto inline-block">
                  {booking && booking.length ? (
                    <div className="flex items-center justify-between flex-wrap md:gap-10 max-md:justify-center text-center">
                      <h4>You have already booked this room</h4>
                      <Button onClick={() => setPopup(true)} offset={true} className="gap-x-6 [&>.icon]:stroke-1 [&>.icon]:stroke-blue max-md:mt-8 text-blue" iconClass="icon">
                        Write us a review
                      </Button>
                    </div>
                  ) : (
                    'Not Available'
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
