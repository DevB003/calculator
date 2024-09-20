document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  let currentInput = '';
  let previousInput = '';
  let operation = '';

  const updateDisplay = (value) => {
      display.value = value;
  };

  const clearDisplay = () => {
      currentInput = '';
      previousInput = '';
      operation = '';
      updateDisplay('0');
  };

  const deleteLast = () => {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput || '0');
  };

  const calculate = () => {
      if (previousInput && currentInput && operation) {
          const prev = parseFloat(previousInput);
          const current = parseFloat(currentInput);
          let result;

          switch (operation) {
              case '+':
                  result = prev + current;
                  break;
              case '-':
                  result = prev - current;
                  break;
              case '*':
                  result = prev * current;
                  break;
              case '/':
                  result = prev / current;
                  break;
              default:
                  return;
          }

          currentInput = result.toString();
          operation = '';
          previousInput = '';
          updateDisplay(currentInput);
      }
  };

  document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', () => {
          const value = button.getAttribute('data-value');
          const action = button.getAttribute('data-action');

          if (action === 'clear') {
              clearDisplay();
          } else if (action === 'delete') {
              deleteLast();
          } else if (action === 'equals') {
              calculate();
          } else if (['+', '-', '*', '/'].includes(value)) {
              if (currentInput) {
                  previousInput = currentInput;
                  currentInput = '';
                  operation = value;
              }
          } else {
              currentInput += value;
              updateDisplay(currentInput);
          }
      });
  });

  clearDisplay(); // Initialize display
});
