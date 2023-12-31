import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Effect } from '../shared/Effect';
import { Toast } from '../utils/Toast';
import { Helmet } from 'react-helmet-async';

export const Registration = () => {
  const { createUser, user, googleSignin } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleGoogleLogin = () => {
    googleSignin()
      .then(() => {
        Toast('Signed in successfully.');
        navigate(location?.state ? location.state : '/');
      })
      .catch(err => {
        if (err.code === 'auth/user-not-found') Toast('The user not found.');
        if (err.code === 'auth/invalid-login-credentials') Toast('Your password or email might be wrong.');
        else Toast('An error occurred. Please try again later.');
      });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    let email, password;

    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.email.value)) email = e.target.email.value;
    if (/^(?=.*[A-Z]).{8,}$/.test(e.target.password.value)) password = e.target.password.value;
    else
      Toast(
        <h4 className="text-sm">
          The password <strong>should be at least 6 characters</strong> and must contain <strong>a capital letter</strong> and <strong>a special character</strong>.
        </h4>,
        5000
      );

    if (email && password) {
      createUser(email, password)
        .then(() => {
          Toast('User Created Successfully');
          navigate(location?.state ? location.state : '/');
        })
        .catch(err => {
          if (err.code === 'auth/email-already-in-use') Toast('This email address is already in use.');
          else Toast('An error occurred. Please try again later.');
        });
    }
  };

  return (
    <div className="fixed inset-0 bg-blue flex items-center justify-center max-md:pt-20">
      <Helmet>
        <title>Register | Hotel</title>
      </Helmet>
      <Effect></Effect>
      <div className="flex flex-col justify-center items-center w-full md:px-10 px-5 md:w-[28rem] max-w-md">
        <div className="px-10 py-14 bg-white rounded-lg text-center max-md:w-full">
          <h1 className="font-semibold">Create a new account</h1>
          <form onSubmit={handleFormSubmit} className="mt-6 grid gap-4">
            <div className="w-full">
              <input className="w-full py-4 outline-none px-6 rounded-md bg-off-white" type="email" name="email" placeholder="Email" required />
            </div>
            <div className="w-full">
              <input className="w-full py-4 outline-none px-6 rounded-md bg-off-white" type="password" name="password" placeholder="Password" required />
            </div>
            <button className="bg-black w-full max-md:mt-6 py-4 text-white font-bold rounded-md active:scale-[.99] transition-transform text-sm">Register</button>
            <div className="mt-6 text-center">
              <h4 className="text-xs">
                By signing up you&apos;re agreeing to our{' '}
                <Link to="/terms" className="font-semibold">
                  Terms of Service
                </Link>
              </h4>
            </div>
          </form>
        </div>
        <button onClick={handleGoogleLogin} className="bg-white py-6 w-full rounded-lg mt-4 flex items-center gap-3 font-medium px-10">
          <div className="w-5 h-5">
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
