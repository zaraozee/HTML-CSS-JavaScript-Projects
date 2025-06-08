const weatherSelect = document.getElementById("weather");
const body = document.body;
const icon = document.getElementById("weather-icon");
const description = document.getElementById("weather-description");

const weatherSettings = {
  sunny: { 
    icon: "<i class='fas fa-sun'></i>", 
    className: "sunny",
    text: "Cuaca Cerah" 
  },
  cloudy: { 
    icon: "<i class='fas fa-cloud'></i>", 
    className: "cloudy",
    text: "Cuaca Mendung" 
  },
  rainy: { 
    icon: "<i class='fas fa-cloud-rain'></i>", 
    className: "rainy",
    text: "Hujan Ringan" 
  },
  stormy: { 
    icon: "<i class='fas fa-bolt'></i>", 
    className: "stormy",
    text: "Badai Petir" 
  }
};

weatherSelect.addEventListener("change", () => {
  const weather = weatherSelect.value;
  const setting = weatherSettings[weather];

  // Update display
  icon.innerHTML = setting.icon;
  description.textContent = setting.text;
  
  // Update background
  body.className = setting.className;
});