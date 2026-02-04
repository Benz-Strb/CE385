function operation(type, a, b) {
  if (type === "add") {
    return a + b;
  } else if (type === "subtract") {
    return a - b;
  } else if (type === "multiply") {
    return a * b;
  } else if (type === "divide") {
    return a / b;
  } else {
    return "Invalid operation type";
  }
}

module.exports = operation;