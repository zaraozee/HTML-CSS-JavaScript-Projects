document.getElementById("calculate-btn").addEventListener("click", function() {
    const heightInput = document.getElementById("height").value;
    const weightInput = document.getElementById("weight").value;
    
    if (!heightInput || !weightInput) {
        alert("Please enter both height and weight");
        return;
    }
    
    const height = parseFloat(heightInput) / 100; 
    const weight = parseFloat(weightInput);
    
    const bmi = weight / (height * height);
    const roundedBMI = bmi.toFixed(2);
    
    document.getElementById("bmi").textContent = roundedBMI;
    
    let category = "";
    let indicatorPosition = 0;
    
    if (bmi < 18.5) {
        category = "Underweight";
        indicatorPosition = (bmi / 18.5) * 16.66;
    } else if (bmi < 25) {
        category = "Normal";
        indicatorPosition = 16.66 + ((bmi - 18.5) / (25 - 18.5)) * 16.66;
    } else if (bmi < 30) {
        category = "Overweight";
        indicatorPosition = 33.33 + ((bmi - 25) / (30 - 25)) * 16.66;
    } else if (bmi < 35) {
        category = "Obese (Class I)";
        indicatorPosition = 50 + ((bmi - 30) / (35 - 30)) * 16.66;
    } else if (bmi < 40) {
        category = "Obese (Class II)";
        indicatorPosition = 66.66 + ((bmi - 35) / (40 - 35)) * 16.66;
    } else {
        category = "Obese (Class III)";
        indicatorPosition = 83.33 + ((Math.min(bmi, 50) - 40) / (50 - 40)) * 16.66;
    }
    
    document.getElementById("category").textContent = category;
    document.getElementById("scale-indicator").style.left = `${Math.min(indicatorPosition, 100)}%`;
});