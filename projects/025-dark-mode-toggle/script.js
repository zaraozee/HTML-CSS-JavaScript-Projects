const inputEl = document.querySelector(".input");
const bodyEl = document.querySelector("body");
const labelEl = document.querySelector(".label");

function initTheme() {
  const savedMode = JSON.parse(localStorage.getItem("mode"));
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  inputEl.checked = savedMode !== null ? savedMode : systemPrefersDark;
  updateTheme();
}

function updateTheme() {
  if (inputEl.checked) {
    bodyEl.classList.add("dark");
  } else {
    bodyEl.classList.remove("dark");
  }
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem("mode", JSON.stringify(inputEl.checked));
}

inputEl.addEventListener("change", () => {
  updateTheme();
});

labelEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    inputEl.checked = !inputEl.checked;
    updateTheme();
  }
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  inputEl.checked = e.matches;
  updateTheme();
});

initTheme();