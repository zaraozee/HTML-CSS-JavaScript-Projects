document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const seats = document.querySelectorAll('.row .seat:not(.occupied)');
    const count = document.getElementById('count');
    const total = document.getElementById('total');
    const movieSelect = document.getElementById('movie');
    const bookBtn = document.getElementById('book-btn');
    const confirmation = document.getElementById('confirmation');
    const confirmBtn = document.getElementById('confirm-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const confirmationDetails = document.getElementById('confirmation-details');

    let ticketPrice = +movieSelect.value;

    function setMovieData(movieIndex, moviePrice) {
        localStorage.setItem('selectedMovieIndex', movieIndex);
        localStorage.setItem('selectedMoviePrice', moviePrice);
    }

    function updateSelectedCount() {
        const selectedSeats = document.querySelectorAll('.row .seat.selected');

        const seatsIndex = [...selectedSeats].map(seat =>
            [...document.querySelectorAll('.row .seat')].indexOf(seat)
        );

        localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

        count.innerText = selectedSeats.length;
        total.innerText = selectedSeats.length * ticketPrice;
    }

    function populateUI() {
        const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

        if (selectedSeats !== null && selectedSeats.length > 0) {
            const allSeats = document.querySelectorAll('.row .seat');
            allSeats.forEach((seat, index) => {
                if (selectedSeats.includes(index)) {
                    seat.classList.add('selected');
                }
            });
        }

        const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
        if (selectedMovieIndex !== null) {
            movieSelect.selectedIndex = selectedMovieIndex;
            ticketPrice = +movieSelect.value;
        }
    }

    movieSelect.addEventListener('change', e => {
        ticketPrice = +e.target.value;
        setMovieData(e.target.selectedIndex, e.target.value);
        updateSelectedCount();
    });

    container.addEventListener('click', e => {
        if (
            e.target.classList.contains('seat') &&
            !e.target.classList.contains('occupied')
        ) {
            e.target.classList.toggle('selected');
            updateSelectedCount();
        }
    });

    bookBtn.addEventListener('click', () => {
        const selectedSeats = document.querySelectorAll('.row .seat.selected');

        if (selectedSeats.length === 0) {
            alert('Please select at least one seat');
            return;
        }

        const selectedSeatNumbers = [...selectedSeats]
            .map(seat => seat.getAttribute('data-seat'))
            .join(', ');

        const movieTitle = movieSelect.options[movieSelect.selectedIndex].text.split(' (')[0];
        const totalPrice = selectedSeats.length * ticketPrice;

        confirmationDetails.innerHTML = `
            <p><strong>Movie:</strong> ${movieTitle}</p>
            <p><strong>Seats:</strong> ${selectedSeatNumbers}</p>
            <p><strong>Total:</strong> $${totalPrice}</p>
        `;

        confirmation.classList.remove('hidden');

        if (!document.querySelector('.overlay')) {
            const overlay = document.createElement('div');
            overlay.classList.add('overlay');
            document.body.appendChild(overlay);
        }
    });

    confirmBtn.addEventListener('click', () => {
        const selectedSeats = document.querySelectorAll('.row .seat.selected');

        selectedSeats.forEach(seat => {
            seat.classList.remove('selected');
            seat.classList.add('occupied');
        });

        localStorage.removeItem('selectedSeats');

        count.innerText = '0';
        total.innerText = '0';

        confirmation.classList.add('hidden');
        const overlay = document.querySelector('.overlay');
        if (overlay) overlay.remove();

        alert('Booking confirmed! Thank you for your purchase.');
    });

    cancelBtn.addEventListener('click', () => {
        confirmation.classList.add('hidden');
        const overlay = document.querySelector('.overlay');
        if (overlay) overlay.remove();
    });

    populateUI();
    updateSelectedCount();
});
