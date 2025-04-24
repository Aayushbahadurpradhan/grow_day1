function capitalizeWords(sentence) {
    return sentence
      .split(" ")
      .map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  }
  
  function reverseText(text) {
    return text.split("").reverse().join("");
  }
  
  function capitalizeFirstWord(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
  
  const sentence = "hello world from javascript";
  const text = "JavaScript is awesome";
  console.log("Capitalize Words:", capitalizeWords(sentence));    
  console.log("Reversed Text:", reverseText(text));              
  console.log("Capitalize First Word:", capitalizeFirstWord(text)); 
  