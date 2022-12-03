const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  // adicionar dígito à tela da calculadora
  addDigit(digit) {
    // verifique se a operação atual já tem um ponto
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  // processar todas as operações da calculadora
  processOperation(operation) {
    // verifique se a corrente está vazia
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      // mudança de operação
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    // obter valor atual e anterior
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperation();
        break;
      case "C":
        this.processClearAllOperation();
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }

  // alterar valores da tela da calculadora
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // verifique se o valor é zero, se for adicione o valor atual
      if (previous === 0) {
        operationValue = current;
      }
      // adicionar valor atual ao anterior
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  // mudar operações matematicas
  changeOperation(operation) {
    const mathOperations = ["*", "/", "+", "-"];
    if (!mathOperations.includes(operation)) {
      return;
    }
    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }
  // Apagar o ultimo digito
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }
  // Apagar a operação atual
  processClearCurrentOperation() {
    this.currentOperationText.innerText = "";
  }
  // Apagar a toda a operação
  processClearAllOperation() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }
  // botão de Igual
  processEqualOperator() {
    const operation = previousOperationText.innerText.split(" ")[1];
    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});
