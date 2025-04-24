function sumArray(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  }
  
  function findMax(arr) {
    let i = 0;
    let max = arr[0];
    while (i < arr.length) {
      if (arr[i] > max) {
        max = arr[i];
      }
      i++;
    }
    return max;
  }
  
  function getEvens(arr) {
    let evens = [];
    let i = 0;
    do {
      if (arr[i] % 2 === 0) {
        evens.push(arr[i]);
      }
      i++;
    } while (i < arr.length);
    return evens;
  }
  
  function averageArray(arr) {
    let total = 0;
    for (let num of arr) {
      total += num;
    }
    return total / arr.length;
  }
  
  function sumObjectValues(obj) {
    let sum = 0;
    for (let key in obj) {
      sum += obj[key];
    }
    return sum;
  }
  
  const numbers = [5, 10, 15, 20, 25];
  const objectData = { a: 2, b: 4, c: 6, d: 8 };
  
  console.log("Sum (for loop):", sumArray(numbers));           
  console.log("Max (while loop):", findMax(numbers));          
  console.log("Evens (do...while loop):", getEvens(numbers));  
  console.log("Average (for...of loop):", averageArray(numbers)); 
  console.log("Sum of object values (for...in):", sumObjectValues(objectData)); 
  