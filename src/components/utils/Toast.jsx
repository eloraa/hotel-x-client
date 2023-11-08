import toast from 'react-hot-toast';

export const Toast = (children, duration) => {
  return toast.custom(t => <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-xl w-full bg-white rounded-lg pointer-events-auto py-6 px-8 font-medium text-sm`} onClick={() => toast.dismiss(t.id)}>{children}</div>, {
    id: new Date().getTime(),
    duration: duration || 2000
  });
};
