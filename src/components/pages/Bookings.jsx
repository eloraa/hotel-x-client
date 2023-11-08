import { useContext } from 'react';
import { Button } from '../utils/Button';
import { DataContext } from '../Root';

export const Bookings = () => {
    const { bookings } = useContext(DataContext)
  return (
    <div className="md:px-10 px-5 py-12">
      <h1 className="text-4xl font-bold uppercase">Your Bookings</h1>
      <div className="mt-16">
        {bookings && bookings.length ? (
          <div className='grid md:grid-cols-3 xl:grid-cols-4 gap-10'>
            {bookings &&
              bookings.length &&
              bookings.map(booking => (
                <div key={booking._id}>
                  <div className="flex justify-between">
                    <h1 className="text-md font-semibold">{booking.room_type}</h1>
                    <h4 className="text-sm">{booking.date}</h4>
                  </div>
                  <figure className="h-[420px] mt-2">
                    <img className="object-cover" src={booking.room_images[0]} alt="" />
                  </figure>

                  <div className="flex mt-4 justify-between text-sm">
                    <div>
                      <Button>Update</Button>
                    </div>
                    <button className="text-red font-bold">Remove</button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          "You haven't book any room"
        )}
      </div>
    </div>
  );
};
