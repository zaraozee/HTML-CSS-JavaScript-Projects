document.getElementById("convert-btn").addEventListener("click", function() {
    const valueInput = parseFloat(document.getElementById("value").value);
    const fromUnit = document.getElementById("from-unit").value;
    const toUnit = document.getElementById("to-unit").value;
    
    if (isNaN(valueInput)) {
        alert("Please enter a valid number");
        return;
    }
    
    const conversionFactors = {
        meters: 1,
        inches: 0.0254,
        feet: 0.3048,
        yards: 0.9144,
        miles: 1609.344,
        kilometers: 1000,
        centimeters: 0.01,
        millimeters: 0.001
    };

    const valueInMeters = valueInput * conversionFactors[fromUnit];
    const convertedValue = valueInMeters / conversionFactors[toUnit];
    const formattedOriginal = `${valueInput} ${fromUnit}`;
    const formattedConverted = `${convertedValue.toFixed(6)} ${toUnit}`;
    
    document.getElementById("original-value").textContent = formattedOriginal;
    document.getElementById("converted-value").textContent = formattedConverted;
});