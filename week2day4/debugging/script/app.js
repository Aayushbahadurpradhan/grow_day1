function calculateSum(arr) {
    let sum = 0;
  
    debugger; // <--- use of debugger to pause
    for (let num of arr) {
      sum += num;
      console.log("Current sum:", sum);
    }
  
    return sum;
  }
  
  function startApp() {
    const numbers = [1, 2, 3, 4, 5];
    const total = calculateSum(numbers);
    console.log("Total Sum:", total);
  }
  startApp();
  