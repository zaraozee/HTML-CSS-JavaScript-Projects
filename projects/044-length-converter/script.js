document.getElementById("convert-btn").addEventListener("click", function() {
    const valueInput = parseFloat(document.getElementById("value").value);
    const fromUnit = document.getElementById("from-unit").value;
    const toUnit = document.getElementById("to-unit").value;
    
    if (isNaN(valueInput)) {
        alert("Please enter a valid number");
        return;
    }
    
    // Conversion factors to meters
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
    
    // Convert to meters first
    const valueInMeters = valueInput * conversionFactors[fromUnit];
    // Then convert to target unit
    const convertedValue = valueInMeters / conversionFactors[toUnit];
    
    // Format the result
    const formattedOriginal = `${valueInput} ${fromUnit}`;
    const formattedConverted = `${convertedValue.toFixed(6)} ${toUnit}`;
    
    // Update the display
    document.getElementById("original-value").textContent = formattedOriginal;
    document.getElementById("converted-value").textContent = formattedConverted;
});