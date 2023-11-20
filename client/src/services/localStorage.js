export const addtolocalStorage = (key, data) => {
  console.log("adding to local storage");
  localStorage.setItem(key, JSON.stringify({ ...data }));
};

export const getfromLocalStorage = (key, data) => {
  const Data = JSON.parse(localStorage.getItem(key));
  return { ...Data };
};

export const deletLocalStorage = (key) => {
  localStorage.removeItem(key);
};
