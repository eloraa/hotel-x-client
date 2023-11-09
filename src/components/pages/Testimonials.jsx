import { useQuery } from '@tanstack/react-query';
import { Toast } from '../utils/Toast';
import { useNormalReq } from '../hooks/useNormalReq';
import { Review } from '../shared/Review';

export const Testimonials = () => {
    
  const instance = useNormalReq();
  const { isPending, error, data } = useQuery({
    queryKey: ['reviews'],
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const { data } = await instance.get('/review');
      return data;
    },
  });
  if (isPending) return;
  if (error) return Toast('Something went wrong');
  return (
    <div className='animate-dissolve-in'>
      <div className="relative xl:h-screen [background:linear-gradient(0deg,rgba(11,11,18,0.00)_0%,rgba(11,11,18,0.10)_17.63%,rgba(11,11,18,0.10)_71.99%,rgba(11,11,18,0.00)_96.88%)] flex flex-wrap items-center justify-between xl:justify-around md:px-10 px-5 gap-10 max-xl:py-16">
        <div className="px-10 py-12 bg-white rounded-lg xl:w-1/3 md:w-1/2 md:max-w-xs">
          <p className="font-medium leading-6 text-sm">
            I&apos;ve stayed at hotels around the world, but Hotel is something truly special. The level of service and attention to detail is unparalleled. I always feel like a valued guest, not just
            a room number.
          </p>
          <div className="border-t border-dark-white mt-24 pt-8 flex justify-between items-center">
            <div>
              <h1 className="font-bold">Sarah K.</h1>
              <h4 className="mt-1 text-sm text-neutral-600">Frequent Traveler</h4>
            </div>
            <figure className="w-10 h-10">
              <img className="object-cover" src="/assets/images/placeholder/01.png" alt="" />
            </figure>
          </div>
        </div>
        <div className="px-10 py-12 bg-white rounded-lg xl:w-1/3 md:w-1/2 md:max-w-xs">
          <p className="font-medium leading-6 text-sm">
            The culinary experience at Hotel is a masterpiece. Chef Sarah Walker&apos;s creations are not just dishes; they are works of art. The commitment to using fresh, local ingredients shines
            through in every bite
          </p>
          <div className="border-t border-dark-white mt-24 pt-8 flex justify-between items-center">
            <div>
              <h1 className="font-bold">Emily R</h1>
              <h4 className="mt-1 text-sm text-neutral-600">Food Enthusiast</h4>
            </div>
            <figure className="w-10 h-10">
              <img className="object-cover" src="/assets/images/placeholder/02.png" alt="" />
            </figure>
          </div>
        </div>
        <div className="px-10 py-12 bg-white rounded-lg xl:w-1/3 md:w-1/2 md:max-w-xs max-xl:mx-auto">
          <p className="font-medium leading-6 text-sm">
            Reliable and efficient. Hotel has become my go-to choice for business trips. The convenience, the warm hospitality, and the quality of service make it a seamless experience every time
          </p>
          <div className="border-t border-dark-white mt-24 pt-8 flex justify-between items-center">
            <div>
              <h1 className="font-bold">Michael P</h1>
              <h4 className="mt-1 text-sm text-neutral-600">Business Traveler</h4>
            </div>
            <figure className="w-10 h-10">
              <img className="object-cover" src="/assets/images/placeholder/03.png" alt="" />
            </figure>
          </div>
        </div>
      </div>
      {data && data.length && (
        <div className="relative z-10 bg-white py-32 md:px-10 px-5">
          <h1 className="text-center text-4xl font-bold">WHAT OUR USER SAYS</h1>
          <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-10 mt-28">
            {data.map((review, i) => (
              <Review key={i} review={review}></Review>
            ))}
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
};
