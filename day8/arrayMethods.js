console.log("--------- Basic map ------");
const nums = [1, 2, 3, 4, 5];
const doubled = nums.map(n => n * 2);
console.log("Doubled:", doubled); 

console.log("\n--------- Basic filter ---------");
const evens = nums.filter(n => n % 2 === 0);
console.log("Evens:", evens); 

console.log("\n--------- Basic reduce ---------");
const total = nums.reduce((sum, val) => sum + val, 0);
console.log("Sum:", total); 

console.log("\n--------- Chaining map + filter + reduce ---------");
const chained = nums
  .filter(n => n % 2 === 1)    
  .map(n => n * 3)             
  .reduce((sum, val) => sum + val, 0); 
console.log("Chained Result:", chained); 

console.log("\n--------- Sorted + Mapped + forEach Chain ---------");
const values = [9, 1, 4, 6, 2];
values
  .sort((a, b) => a - b)   
  .map(v => v + 1)         
  .forEach(v => console.log("Val +1:", v));

console.log("\n--------- Advanced: Chain your own class (optional fun) ---------");
class ChainArray {
  constructor(arr) {
    this.arr = arr;
  }
  map(fn) {
    this.arr = this.arr.map(fn);
    return this;
  }
  filter(fn) {
    this.arr = this.arr.filter(fn);
    return this;
  }
  reduce(fn, init) {
    return this.arr.reduce(fn, init);
  }
  value() {
    return this.arr;
  }
}

const myArr = new ChainArray([10, 15, 20, 25])
  .filter(n => n > 15)     
  .map(n => n / 5)         
  .value();

console.log("Custom Chain Result:", myArr); 
