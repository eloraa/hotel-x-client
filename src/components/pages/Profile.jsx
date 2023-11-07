import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { selectFile } from '../utils/utils';
import { saveToStorage } from '../providers/StorageProvider';

export const Profile = () => {
  const formRef = useRef(null);
  const [editState, setEditState] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const { user, updateUser, verifyEmail } = useContext(AuthContext);
  const [displayNameValue, setdisplayNameValue] = useState(user?.displayName ? user?.displayName : '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL ? user?.photoURL : '');
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const handleImageUpload = () => {
    if (isUpdating) return;
    formRef.current.photo.click();
  };

  const handleFileSelect = async e => {
    if (isUpdating) return;
    const file = await selectFile(e);
    if (file) {
      formRef.current.photoURL.disabled = true;
      setSelectedImage(file);
    } else formRef.current.photoURL.disabled = false;
  };

  let isVerifying;
  const handleFormSubmit = e => {
    e.preventDefault();

    if (isUpdating) return;
    let name, photoURL;
    name = e.target.displayName.value || null;
    photoURL = e.target.photoURL.value || null;

    if (name && name.length > 30) {
      console.log('Name cannot exceeds 30 characters');
      return;
    }

    if (photoURL && !/((https?|www):\/\/)[-a-zA-Z0-9+&@#/%=~_|$?!:,.]*[-a-zA-Z0-9+&@#/%=~_|$]/g.test(photoURL)) {
      console.log('Enter a valid URL');
      return;
    }

    // it gives cors error;. will work on later
    const file = e.target?.photo?.files[0];

    if (file) {
      console.log('Updating profile...');
      if (!file.type.startsWith('image/')) {
        console.log('Upload a valid image.');
        return;
      }
      setIsUpdating(true);

      saveToStorage(file, user.uid, 'profile')
        .then(url => {
          updateUser(name, url)
            .then(() => {
              console.log('User Updated Successfully');
              navigate('/');
            })
            .catch(() => {
              setIsUpdating(false);
              console.log('Something went wrong');
            });
        })
        .catch(() => {
          setIsUpdating(false);
          console.log('something went wrong');
        });

      return;
    } else if (selectedImage) {
      console.log('Updating profile...');
      setIsUpdating(true);
      if (name === null) name = '';
      updateUser(name, selectedImage)
        .then(() => {
          console.log('User Updated Successfully');
          navigate('/');
        })
        .catch(() => {
          setIsUpdating(false);
          console.log('Something went wrong');
        });
      return;
    } else {
      if (name !== user.displayName || photoURL !== user.photoURL) {
        console.log('Updating profile...');
        setIsUpdating(true);
        if (name === null) name = '';
        if (photoURL === null) photoURL = '';
        updateUser(name, photoURL)
          .then(() => {
            console.log('User Updated Successfully');
            navigate('/');
          })
          .catch(() => {
            setIsUpdating(false);
            console.log('Something went wrong');
          });
        return;
      }
      console.log('Nothing to update.');
    }
  };

  return (
    <>
      <main className={`py-6 md:px-10 px-5 animate-dissolve-in ${isUpdating ? 'opacity-10 cursor-not-allowed [&_*]:cursor-not-allowed select-none' : ''}`}>
        <div className="flex justify-between items-center mb-16">
          <h1 className="font-semibold text-xl">{editState && 'Update '}Your Profile</h1>
          <button
            onClick={() => {
              if (isUpdating) return;
              setEditState(!editState);
              setdisplayNameValue(user?.displayName ? user?.displayName : '');
              setPhotoURL(user?.photoURL ? user?.photoURL : '');
              setSelectedImage(null);
              formRef.current.photo.value = '';
            }}
            className="active:scale-[.99] transition-transform underline"
          >
            {editState ? 'Discard Editing' : 'Edit Profile'}
          </button>
        </div>

        {!user.emailVerified && (
          <div className="bg-off-white py-6 rounded-md px-8 font-semibold flex justify-between items-center">
            <h1>Your Account Isn&apos;t verified.</h1>
            <button
              onClick={() => {
                if (isUpdating) return;
                if (isVerifying) console.log('Check your email to verify your Account');
                verifyEmail()
                  .then(() => {
                    isVerifying = true;
                    console.log('Check your email to verify your Account');
                  })
                  .catch(err => {
                    isVerifying = false;
                    err.code === 'auth/too-many-requests' ? console.log('Try verifying after a little while.') : console.log('Something went wrong.');
                  });
              }}
              className="underline active:scale-[.98] transition-transform text-sm"
            >
              Verify
            </button>
          </div>
        )}

        {user?.displayName && (
          <h1 className="mt-8">
            Hi, <span className="font-semibold">{user?.displayName}</span>
          </h1>
        )}

        <div className="mb-20 mt-5">
          <div className="flex flex-col gap-1 items-start mb-10">
            <figure className="overflow-hidden rounded relative max-w-xs min-h-[2rem] min-w-[2rem]">
              {editState && (
                <div onClick={handleImageUpload} className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-bold text-lg cursor-pointer">
                  Edit
                </div>
              )}
              <img
                onLoad={() => {
                  if (user.photoURL !== selectedImage) formRef.current.photoURL.disabled = true;
                }}
                className="max-w-xs object-contain rounded max-md:w-full"
                src={selectedImage ? selectedImage : user?.photoURL ? user.photoURL : '/assets/images/placeholder/profile.png'}
                alt=""
              />
            </figure>
            {editState && user.providerData[0].photoURL && user.photoURL !== user.providerData[0].photoURL && selectedImage !== user.providerData[0].photoURL && (
              <button onClick={() => setSelectedImage(user.providerData[0].photoURL)} className="text-sm underline active:scale-[.98] transition-transform">
                Restore Default Profile Picture
              </button>
            )}
          </div>
          <form ref={formRef} onSubmit={handleFormSubmit}>
            <ul className="grid gap-6">
              <li className="hidden">
                <input onChange={handleFileSelect} placeholder="Upload" name="photo" type="file" src="" alt="" accept="image/*" />
              </li>
              <li>
                <h4>Name</h4>
                <div className="md:w-80 w-full">
                  <input
                    className="w-full py-4 outline-none px-6 rounded-md bg-off-white disabled:bg-transparent disabled:pl-0"
                    type="text"
                    name="displayName"
                    placeholder="Display Name"
                    value={displayNameValue}
                    onChange={e => setdisplayNameValue(e.target.value)}
                    disabled={!editState}
                  />
                </div>
              </li>
              <li>
                <h4>Email</h4>
                <h2 className="font-medium py-4">{user?.email}</h2>
              </li>
              <li>
                <h4>Photo URL</h4>
                <div className="md:w-80 w-full">
                  <input
                    className="w-full py-4 outline-none px-6 rounded-md bg-off-white disabled:bg-transparent disabled:pl-0"
                    type="text"
                    name="photoURL"
                    placeholder="Photo URL"
                    value={photoURL}
                    onChange={e => setPhotoURL(e.target.value)}
                    disabled={!editState}
                  />
                </div>
              </li>
            </ul>

            {editState && (
              <button name="submit" className="bg-black py-2 md:px-24 w-full md:w-auto px-0 mt-6 text-white font-bold rounded">
                Update
              </button>
            )}
          </form>
          {editState && (
            <h4 className="mt-8 text-sm flex items-center gap-1">
              <span className="block w-2 h-2">
                <svg viewBox="0 0 7 7">
                  <path
                    d="M2.75564 6.90922L2.89768 4.71036L1.05677 5.94332L0.29541 4.60241L2.27836 3.6365L0.29541 2.67059L1.05677 1.32968L2.89768 2.56263L2.75564 0.36377H4.28405L4.13632 2.56263L5.97723 1.32968L6.73859 2.67059L4.76132 3.6365L6.73859 4.60241L5.97723 5.94332L4.13632 4.71036L4.28405 6.90922H2.75564Z"
                    fill="currentColor"
                  />
                </svg>
              </span>{' '}
              You can add Empty value to remove name and photo
            </h4>
          )}
        </div>
      </main>
    </>
  );
};
