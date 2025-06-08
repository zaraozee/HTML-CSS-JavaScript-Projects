class DOMHelper {
    static getElement(id) {
        return document.getElementById(id);
    }

    static getInputValue(id) {
        const element = this.getElement(id);
        return element.value ? parseFloat(element.value) : 0;
    }

    static setResult(id, value) {
        const element = this.getElement(id);
        element.textContent = `$${value.toFixed(2)}`;
    }

    static formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }
}