import toast from 'react-hot-toast';

export const Toast = children => {
  toast.custom(t => <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-xl w-full bg-white rounded-lg pointer-events-auto py-6 px-8`}>{children}</div>, {
    id: new Date().getTime(),
  });
};
