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
