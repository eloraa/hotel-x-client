import gsap from 'gsap';

export const viewport = () => ({ width: window.innerWidth - 1, height: window.innerHeight - 1 });

export const selectFile = e => {
  return new Promise((resolve, reject) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        return reject('Upload a valid image.');
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        return resolve(event.target.result);
      };
    } else reject('Not a valid operation');
  });
};

export const scroll = y => {
  let scrolling = {
    value: window.scrollY,
  };
  let scrollTo = y;
  if (y instanceof HTMLElement) {
    scrollTo = y.offsetTop;
  }
  if (scrollTo === window.scrollY) return;
  gsap.to(scrolling, {
    value: scrollTo,
    duration: 1,
    ease: 'power1.ease',
    onUpdate: () => window.scrollTo(0, scrolling.value),
  });
};

export const getDate = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const getDayDiff = (d1, d2) => {
  const timeDiff = new Date(d1) - new Date(d2);

  return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
};
