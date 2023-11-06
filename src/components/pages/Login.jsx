import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../providers/AuthProvider';

export const Login = () => {

  const { signIn, user, googleSignin, resetPassword } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef(null);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleGoogleLogin = () => {
    googleSignin()
      .then(() => {
        console.log('Signed in successfully.');
        navigate(location?.state ? location.state : '/');
      })
      .catch(err => {
        if (err.code === 'auth/user-not-found') console.log('The user not found.');
        if (err.code === 'auth/invalid-login-credentials') console.log('Your password or email might be wrong.');
        else console.log('An error occurred. Please try again later.');
      });
  };

  const handleResetPassword = () => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formRef.current.email.value)) console.log('Enter an Email to the field to reset the password.');
    else
      resetPassword(formRef.current.email.value)
        .then(() => console.log('Check your email to reset your Password.'))
        .catch(err => (err.code === 'auth/too-many-requests' ? console.log('Try verifying after a little while.') : console.log('Something went wrong.')));
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    let email,
      password = e.target.password.value;

    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.email.value)) email = e.target.email.value;

    if (email) {
      signIn(email, password)
        .then(() => {
          console.log('Signed in successfully.');
          navigate(location?.state ? location.state : '/');
        })
        .catch(err => {
          if (err.code === 'auth/user-not-found') console.log('The user not found.');
          if (err.code === 'auth/invalid-login-credentials') console.log('Your password or email might be wrong.');
          else console.log('An error occurred. Please try again later.');
        });
    }
  };
  return (
    <div className="absolute inset-0 bg-blue flex items-center justify-center max-md:pt-20">
      <div className="flex flex-col justify-center items-center max-md:w-full md:px-10 px-5">
        <div className="md:px-10 px-5 py-14 bg-white rounded-lg text-center max-md:w-full">
          <h1 className="font-semibold">Login to Continue</h1>
          <form ref={formRef} onSubmit={handleFormSubmit} className="mt-6 grid gap-4">
            <div className="w-full">
              <input className="w-full py-4 outline-none px-6 rounded-md bg-off-white" type="email" name="email" placeholder="Email" required />
            </div>
            <div className="w-full">
              <input className="w-full py-4 outline-none px-6 rounded-md bg-off-white" type="password" name="password" placeholder="Password" required />
            </div>
            <button className="bg-black w-full max-md:mt-6 py-4 md:px-32 px-0 text-white font-bold rounded-md active:scale-[.99] transition-transform text-sm">Login</button>

            <div className="text-sm mt-6">
              <div className="cursor-pointer" onClick={handleResetPassword}>
                Reset Password
              </div>
            </div>
          </form>
        </div>
        <button onClick={handleGoogleLogin} className="bg-white py-6 w-full rounded-lg mt-4 flex items-center gap-3 font-medium md:px-10 px-5">
          <div className='w-5 h-5'>
            <svg>
              <use xlinkHref="/assets/vector/symbols.svg#google"></use>
            </svg>
          </div>
          Continue with Google
        </button>
      </div>
    </div>
  );
};
