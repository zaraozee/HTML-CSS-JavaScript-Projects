class TipCalculator {
    static calculateTip(billAmount, tipPercentage) {
        return billAmount * (tipPercentage / 100);
    }

    static calculateTotalBill(billAmount, tipAmount) {
        return billAmount + tipAmount;
    }

    static calculatePerPerson(amount, numberOfPeople) {
        return amount / numberOfPeople;
    }

    static calculateAll(billAmount, tipPercentage, numberOfPeople) {
        const tipAmount = this.calculateTip(billAmount, tipPercentage);
        const totalBill = this.calculateTotalBill(billAmount, tipAmount);
        const tipPerPerson = this.calculatePerPerson(tipAmount, numberOfPeople);
        const totalPerPerson = this.calculatePerPerson(totalBill, numberOfPeople);

        return {
            tipAmount,
            totalBill,
            tipPerPerson,
            totalPerPerson
        };
    }
}