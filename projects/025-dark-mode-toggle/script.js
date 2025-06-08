const inputEl = document.querySelector(".input");
const bodyEl = document.querySelector("body");
const labelEl = document.querySelector(".label");

// Load saved preference or detect system preference
function initTheme() {
  const savedMode = JSON.parse(localStorage.getItem("mode"));
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  inputEl.checked = savedMode !== null ? savedMode : systemPrefersDark;
  updateTheme();
}

// Update theme based on toggle state
function updateTheme() {
  if (inputEl.checked) {
    bodyEl.classList.add("dark");
  } else {
    bodyEl.classList.remove("dark");
  }
  updateLocalStorage();
}

// Save preference to localStorage
function updateLocalStorage() {
  localStorage.setItem("mode", JSON.stringify(inputEl.checked));
}

// Toggle theme when clicked
inputEl.addEventListener("change", () => {
  updateTheme();
});

// Allow keyboard control
labelEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    inputEl.checked = !inputEl.checked;
    updateTheme();
  }
});

// Watch for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  inputEl.checked = e.matches;
  updateTheme();
});

// Initialize theme
initTheme();