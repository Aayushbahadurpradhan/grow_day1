const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let output = "";

const isOperator = (char) => ["%", "*", "/", "-", "+", "&&", "||"].includes(char);

const calculate = (value) => {
  if (value === "AC") {
    output = "";
  } else if (value === "DEL") {
    output = output.slice(0, -1);
  } else if (value === "=") {
    try {
      const parsed = output
        .replace(/AND/g, "&&")
        .replace(/OR/g, "||")
        .replace(/NOT/g, "!")
        .replace("%", "/100");

      output = eval(parsed).toString();
    } catch {
      output = "Error";
    }
  } else {
    if (output === "" && (isOperator(value) || value === "&&" || value === "||")) return;

    output += value;
  }

  display.value = output;
};

buttons.forEach((btn) =>
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;
    calculate(value);
  })
);
