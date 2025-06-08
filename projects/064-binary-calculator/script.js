document.addEventListener('DOMContentLoaded', function() {
    const inputValue = document.getElementById('input-value');
    const inputBase = document.getElementById('input-base');
    const binaryResult = document.getElementById('binary-result');
    const decimalResult = document.getElementById('decimal-result');
    const hexResult = document.getElementById('hex-result');
    const convertBtn = document.getElementById('convert-btn');
    
    const binary1 = document.getElementById('binary1');
    const binary2 = document.getElementById('binary2');
    const operationButtons = document.querySelectorAll('[data-operation]');
    const operationResult = document.getElementById('operation-result');
    const opBinary = document.getElementById('op-binary');
    const opDecimal = document.getElementById('op-decimal');
    const opHex = document.getElementById('op-hex');

    convertBtn.addEventListener('click', convertNumber);
    operationButtons.forEach(button => {
        button.addEventListener('click', performOperation);
    });

    function convertNumber() {
        const value = inputValue.value.trim();
        const base = parseInt(inputBase.value);
        
        if (!value) {
            showError("Please enter a value");
            return;
        }
        
        try {
            const decimal = parseInt(value, base);
            
            if (isNaN(decimal)) {
                showError("Invalid number for selected base");
                return;
            }
            
            binaryResult.textContent = decimal.toString(2);
            decimalResult.textContent = decimal.toString(10);
            hexResult.textContent = decimal.toString(16).toUpperCase();
        } catch (e) {
            showError("Invalid input");
        }
    }
    
    function performOperation(e) {
        const operation = e.target.dataset.operation;
        const bin1 = binary1.value.trim();
        const bin2 = binary2.value.trim();
        
        try {
            let result;
            let decimalResult;
            
            if (operation !== 'not1' && (!isValidBinary(bin1) || !isValidBinary(bin2))) {
                showError("Please enter valid binary numbers");
                return;
            }
            
            if (operation === 'not1' && !isValidBinary(bin1)) {
                showError("Please enter a valid binary number");
                return;
            }
            
            const num1 = parseInt(bin1, 2);
            const num2 = bin2 ? parseInt(bin2, 2) : 0;
            
            switch (operation) {
                case 'add':
                    decimalResult = num1 + num2;
                    result = decimalResult.toString(2);
                    break;
                case 'subtract':
                    decimalResult = num1 - num2;
                    result = decimalResult.toString(2);
                    break;
                case 'multiply':
                    decimalResult = num1 * num2;
                    result = decimalResult.toString(2);
                    break;
                case 'divide':
                    if (num2 === 0) {
                        showError("Cannot divide by zero");
                        return;
                    }
                    decimalResult = Math.floor(num1 / num2);
                    result = decimalResult.toString(2);
                    break;
                case 'and':
                    decimalResult = num1 & num2;
                    result = decimalResult.toString(2);
                    break;
                case 'or':
                    decimalResult = num1 | num2;
                    result = decimalResult.toString(2);
                    break;
                case 'xor':
                    decimalResult = num1 ^ num2;
                    result = decimalResult.toString(2);
                    break;
                case 'not1':
                    decimalResult = ~num1;
                    const mask = Math.pow(2, bin1.length) - 1;
                    decimalResult = (decimalResult & mask) >>> 0;
                    result = decimalResult.toString(2).padStart(bin1.length, '0');
                    break;
                default:
                    return;
            }

            operationResult.textContent = result;
            opBinary.textContent = result;
            opDecimal.textContent = decimalResult.toString(10);
            opHex.textContent = decimalResult.toString(16).toUpperCase();
            
        } catch (e) {
            showError("Error performing operation");
        }
    }
    
    function isValidBinary(bin) {
        return /^[01]+$/.test(bin);
    }
    
    function showError(message) {
        alert(message);
    }
});