document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = DOMHelper.getElement('calculate-btn');
    
    calculateBtn.addEventListener('click', () => {
        const billAmount = DOMHelper.getInputValue('bill-amount');
        const tipPercentage = DOMHelper.getInputValue('tip-percentage');
        const numberOfPeople = DOMHelper.getInputValue('people-count');
        
        if (billAmount <= 0) {
            alert('Please enter a valid bill amount');
            return;
        }
        
        if (numberOfPeople < 1) {
            alert('Number of people must be at least 1');
            return;
        }
        
        const results = TipCalculator.calculateAll(billAmount, tipPercentage, numberOfPeople);
        
        DOMHelper.setResult('total-tip', results.tipAmount);
        DOMHelper.setResult('total-bill', results.totalBill);
        DOMHelper.setResult('tip-per-person', results.tipPerPerson);
        DOMHelper.setResult('total-per-person', results.totalPerPerson);
    });
});