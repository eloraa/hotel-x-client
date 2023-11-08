import { useContext, useState } from 'react';
import { Button } from '../utils/Button';
import { DataContext } from '../Root';
import { ConfirmToast } from '../utils/ConfirmToast';
import { useSecureReq } from '../hooks/useSecureReq';
import { AuthContext } from '../providers/AuthProvider';
import { Toast } from '../utils/Toast';

export const Bookings = () => {
  const { bookings } = useContext(DataContext);
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
      .catch(() => {});
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
                    {!isDeleting && (
                      <button onClick={() => handleDelete(booking.roomId, booking.room_type)} className="text-red font-bold">
                        Cancel
                      </button>
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
