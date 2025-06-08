const jokeContainer = document.getElementById("joke");
const btn = document.getElementById("btn");
const emoji = document.querySelector(".emoji");

const url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";

const emojis = ["&#128514;", "&#128517;", "&#129315;", "&#128516;", "&#128513;"];

let getJoke = () => {
    jokeContainer.classList.remove("fade");
    jokeContainer.textContent = "";
    jokeContainer.classList.add("loading");
    btn.disabled = true;
    
    // Random emoji
    emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    
    fetch(url)
        .then((data) => data.json())
        .then((item) => {
            jokeContainer.classList.remove("loading");
            jokeContainer.textContent = item.joke;
            jokeContainer.classList.add("fade");
            btn.disabled = false;
        })
        .catch(() => {
            jokeContainer.classList.remove("loading");
            jokeContainer.textContent = "Failed to fetch joke. Please try again!";
            jokeContainer.classList.add("fade");
            btn.disabled = false;
        });
};

btn.addEventListener("click", getJoke);
getJoke();