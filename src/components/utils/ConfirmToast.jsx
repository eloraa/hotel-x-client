import toast from 'react-hot-toast';

export const ConfirmToast = (children, color) => {
  return new Promise((resolve, reject) => {
    toast.custom(
      t => (
        <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-xl w-full bg-white rounded-lg pointer-events-auto py-6 px-8 flex items-center justify-between flex-wrap`}>
          <div>{children}</div>
          <div className="flex items-center">
            <button
              className={`${color ? '' : 'bg-red'} py-4 px-8 rounded-full font-semibold text-sm text-white`}
              style={{ backgroundColor: color }}
              onClick={() => {
                resolve();
                toast.dismiss(t.id);
              }}
            >
              Yes
            </button>
            <button
              className="py-4 px-8 rounded-full font-semibold text-sm"
              onClick={() => {
                reject();
                toast.dismiss(t.id);
              }}
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  });
};
