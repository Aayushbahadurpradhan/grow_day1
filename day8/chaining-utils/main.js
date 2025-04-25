import { ChainArray } from './utils/chainArray.js';

const result = new ChainArray([1, 2, 3, 4, 5])
  .filter(n => n % 2 !== 0)   
  .map(n => n * 2)            
  .reduce((a, b) => a + b, 0);

console.log("Chained Result:", result);

const finalArr = new ChainArray([10, 20, 30])
  .map(n => n / 10)
  .filter(n => n >= 2)
  .value();

console.log("Final Array:", finalArr); 
