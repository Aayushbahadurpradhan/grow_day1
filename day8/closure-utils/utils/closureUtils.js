export function curry(fn) {
    return function curried(...args) {
      if (args.length >= fn.length) {
        return fn(...args);
      } else {
        return (...next) => curried(...args, ...next);
      }
    };
  }
  
  export function debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }
  
  export function once(fn) {
    let called = false;
    let result;
    return (...args) => {
      if (!called) {
        result = fn(...args);
        called = true;
      }
      return result;
    };
  }
  
  export function memoize(fn) {
    const cache = {};
    return (...args) => {
      const key = JSON.stringify(args);
      if (!(key in cache)) {
        cache[key] = fn(...args);
      }
      return cache[key];
    };
  }
  
  export function throttle(fn, limit) {
    let inThrottle = false;
    return (...args) => {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  