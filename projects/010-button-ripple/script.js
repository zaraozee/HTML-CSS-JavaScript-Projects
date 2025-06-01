const buttons = document.querySelectorAll('.ripple-button');

buttons.forEach(button => {
  button.addEventListener('click', function (e) {
    const circle = document.createElement('span');
    circle.classList.add('circle');

    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    this.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 600);
  });
});
