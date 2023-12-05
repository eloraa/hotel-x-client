const getStoredValue = field => {
  if (!field) {
    return;
  }
  const storedValue = localStorage.getItem(field);
  return storedValue ? JSON.parse(storedValue) : [];
};

const saveToLocale = (value, field, stringify) => {
  if (!field && !value) {
    return;
  }
  localStorage.setItem(field, stringify ? JSON.stringify(value) : value);
};

const clearStorage = field => {
  if (!field) {
    return;
  }

  localStorage.setItem(field, '');
};

export { getStoredValue, saveToLocale, clearStorage };
