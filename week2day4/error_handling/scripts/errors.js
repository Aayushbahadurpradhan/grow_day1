// for Syntax ko Error
try {
    console.log("Trying Syntax Error...");
    eval('console.log("Missing closing bracket"'); // SyntaxError
  } catch (error) {
    console.error("Caught SyntaxError:");
    console.error("Name:", error.name);
    console.error("Message:", error.message);
    console.error("Stack Trace:", error.stack);
  }
  
  // For Reference ko  Error
  try {
    console.log("Trying Reference Error...");
    console.log(nonExistingVar); 
  } catch (error) {
    console.error("Caught ReferenceError:");
    console.error("Name:", error.name);
    console.error("Message:", error.message);
    console.error("Stack Trace:", error.stack);
  }
  
  //  for Type ko Error
  try {
    console.log("Trying Type Error...");
    const num = 10;
    num.toUpperCase(); 
  } catch (error) {
    console.error("Caught TypeError:");
    console.error("Name:", error.name);
    console.error("Message:", error.message);
    console.error("Stack Trace:", error.stack);
  }
  
// for Array ko Error
  try {
    console.log("Trying Range Error...");
    let arr = new Array(-8); 
  } catch (error) {
    console.error("Caught RangeError:");
    console.error("Name:", error.name);
    console.error("Message:", error.message);
    console.error("Stack Trace:", error.stack);
  }
  