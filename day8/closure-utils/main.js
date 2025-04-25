import { curry, debounce, once, memoize, throttle } from './utils/closureUtils.js';

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
console.log("Curry:", curriedAdd(1)(2)(3)); // 6

const debouncedLog = debounce(() => console.log("Debounced log!"), 1000);
debouncedLog(); debouncedLog(); debouncedLog(); // Logs only once after 1s

const init = once(() => console.log("Initialized!"));
init(); init(); 

const factorial = memoize(function f(n) {
  return n <= 1 ? 1 : n * f(n - 1);
});
console.log("Memoized Factorial:", factorial(5)); // 120

const throttledLog = throttle(() => console.log("Throttled log!"), 2000);
throttledLog(); throttledLog(); 
