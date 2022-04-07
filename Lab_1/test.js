const modules = require("./labModules");

let age = modules.ageCalculator("Saleh", "1995-09-04");
console.log(age);

let calculation = new modules.calculator();
console.log(calculation.add(4, 5));

console.log(calculation.subtract("a", 5));