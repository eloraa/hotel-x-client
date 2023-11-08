import { useContext, useState } from 'react';
import { Button } from '../utils/Button';
import { DataContext } from '../Root';
import { ConfirmToast } from '../utils/ConfirmToast';
import { useSecureReq } from '../hooks/useSecureReq';
import { AuthContext } from '../providers/AuthProvider';
import { Toast } from '../utils/Toast';
import { getDate, getDayDiff } from '../utils/utils';
import { Link } from 'react-router-dom';

export const Bookings = () => {
  const { bookings, setBookings } = useContext(DataContext);
  const { user } = useContext(AuthContext);

  const instance = useSecureReq();
  const [isDeleting, setDeleting] = useState(false);

  const handleDelete = (id, name) => {
    setDeleting(true);
    ConfirmToast(
      <div className="text-sm font-semibold">
        Are you sure you want to cancel the room <strong>{name}</strong>
      </div>
    )
      .then(() => {
        const data = {
          uid: user.uid,
          roomId: id,
        };
        instance
          .put('/booking', data)
          .then(res => {
            if (res.data.success) {
              if (bookings && bookings.length) {
                setBookings(bookings.filter(e => e.roomId !== id));
              }
              setDeleting(false);
              Toast('Successfully deleted');
            }
          })
          .catch(err => {
            console.log(err.response);
            setDeleting(false);
            Toast('Something went wrong');
          });
      })
      .catch(() => {
        setDeleting(false);
      });
  };

  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = (e, id) => {
    e.preventDefault();

    if (!isUpdating) {
      setIsUpdating(true);
      return;
    }

    const date = e.target.date.value;
    if (isNaN(new Date(date).getTime())) {
      Toast('Select a valid date.');
      return;
    }

    instance
      .patch('/booking/update', {
        uid: user.uid,
        email: user.email,
        roomId: id,
        date: date,
      })
      .then(res => {
        if (res.data.success) {
          setIsUpdating(false);
          Toast('Successfully update booking for the the room');
          setBookings(
            bookings.filter(e => {
              if (e.roomId === id) e.date = date;
              return e;
            })
          );
        } else Toast('something is wrong');
      })
      .catch(err => {
        console.log(err.response);
        Toast('Something went wrong');
      });
  };

  return (
    <div className="md:px-10 px-5 py-12">
      <h1 className="text-4xl font-bold uppercase">Your Bookings</h1>
      <div className="mt-16">
        {bookings && bookings.length ? (
          <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-10">
            {bookings &&
              bookings.length &&
              bookings.map(booking => (
                <div key={booking._id}>
                  <div className="flex justify-between items-center">
                    <Link to={'/room/' + booking.roomId}>
                      <h1 className="text-md font-semibold">{booking.room_type}</h1>
                    </Link>
                    <h4 className="text-sm">{booking.date}</h4>
                  </div>
                  <figure className="h-[420px] mt-4">
                    <img className="object-cover" src={booking.room_images[0]} alt="" />
                  </figure>
                  <div>
                    <form onSubmit={e => handleSubmit(e, booking.roomId)} className="mt-6">
                      <div className="mt-2 border-b border-dark-white relative flex items-center">
                        {isUpdating && (
                          <div className="absolute">
                            <input onClick={e => e.target.showPicker()} className="outline-none border-none appearance-none" type="date" name="date" min={new Date().toISOString().split('T')[0]} />
                          </div>
                        )}
                        <Button
                          offset={true}
                          className={`w-full pb-4 [&>.icon]:w-4 [&>.icon]:h-4 [&>.icon]:transition-transform ${isUpdating ? '[&>.icon]:-100' : '[&>.icon]:scale-0'}`}
                          iconClass="icon"
                        >
                          Update
                        </Button>
                      </div>
                    </form>
                  </div>
                  <div className="flex mt-4 justify-between text-sm">
                    {!isDeleting && getDayDiff(booking.date, getDate(new Date())) > 2 && (
                      <div onClick={() => handleDelete(booking.roomId, booking.room_type)} className="text-red font-bold w-full">
                        <Button className="w-full [&>.icon]:w-4 [&>.icon]:h-4" iconClass="icon" offset={true} type="del">
                          Cancel the bookings
                        </Button>
                      </div>
                    )}
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
