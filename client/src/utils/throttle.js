// utils/throttle.js
export const throttle = (fn, delay) => {
  let lastCall = 0;

  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
};
