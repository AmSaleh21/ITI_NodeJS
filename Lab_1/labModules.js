calculator = function () {
  this.add = function (firstNumber, secondNumber) {
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
      return "error";
    }
    return firstNumber + secondNumber;
  };
  this.subtract = function (firstNumber, secondNumber) {
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
      return "error";
    }
    return firstNumber - secondNumber;
  };
  this.multiply = function (firstNumber, secondNumber) {
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
      return "error";
    }
    return firstNumber * secondNumber;
  };
};

ageCalculator = function (name, birthDate) {
  if (name.length < 3) {
    return "Name should have more than 2 characters";
  }
  const dateRegex = new RegExp(/(\d{4}[-\\\/]\d{1,2}[-\\\/]\d{1,2})/);
  if (!dateRegex.test(birthDate)) {
    return `{"${birthDate}"} is not a valid date format | valid is: YYYY-MM-DD`;
  }
  const date = new Date(birthDate);
  if (date instanceof Date && isNaN(date.getTime())) {
    return "Invalid date";
  }
  const ageDifMs = new Date() - date.getTime();
  const ageDate = new Date(ageDifMs);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);
  if (age <= 4) {
    return "too young";
  }
  return `Hello ${name} and age now is ${age}`;
};

module.exports = {
  calculator: calculator,
  ageCalculator: ageCalculator,
};
