// Sample movie data
const movies = [
    {
        id: 1,
        title: "The Adventure Begins",
        genre: "Action/Adventure",
        rating: "U/A",
        status: "Now Showing",
        poster: "https://picsum.photos/300/450",
        cast: [
            { name: "John Doe", role: "Hero" },
            { name: "Jane Smith", role: "Heroine" }
        ]
    },
    {
        id: 2,
        title: "Mystery of the Dark",
        genre: "Thriller",
        rating: "A",
        status: "Now Showing",
        poster: "https://picsum.photos/300/451",
        cast: [
            { name: "Mike Johnson", role: "Detective" },
            { name: "Sarah Wilson", role: "Suspect" }
        ]
    },
    {
        id: 3,
        title: "Love in Paris",
        genre: "Romance",
        rating: "U",
        status: "Now Showing",
        poster: "https://picsum.photos/300/452",
        cast: [
            { name: "Robert Brown", role: "Jack" },
            { name: "Emma Davis", role: "Rose" }
        ]
    }
];

// Screen prices
const screenPrices = {
    'A': 500, // Gold
    'B': 300, // Silver
    'C': 200, // Iron
    'D': 200  // Iron
};

// DOM Elements
const moviesGrid = document.getElementById('moviesGrid');
const modal = document.getElementById('bookingModal');
const closeBtn = document.querySelector('.close');
const bookingForm = document.getElementById('bookingForm');
const screenSelect = document.getElementById('screen');
const ticketsInput = document.getElementById('tickets');
const totalAmountSpan = document.getElementById('totalAmount');
const dateInput = document.getElementById('date');

// Initialize date input with valid range
function initializeDateInput() {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 7); // Booking window of 7 days

    dateInput.min = today.toISOString().split('T')[0];
    dateInput.max = maxDate.toISOString().split('T')[0];
    dateInput.value = today.toISOString().split('T')[0];
}

// Create movie cards
function createMovieCards() {
    moviesGrid.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-details">
                    <p>${movie.genre} | ${movie.rating}</p>
                    <p>${movie.status}</p>
                </div>
                <button class="btn-primary" onclick="openBooking(${movie.id})">Book Now</button>
            </div>
        </div>
    `).join('');
}

// Calculate total amount
function calculateTotal() {
    const screen = screenSelect.value;
    const tickets = parseInt(ticketsInput.value) || 0;
    const total = screenPrices[screen] * tickets;
    totalAmountSpan.textContent = `₹${total}`;
}

// Open booking modal
function openBooking(movieId) {
    const movie = movies.find(m => m.id === movieId);
    if (movie) {
        modal.style.display = 'block';
    }
}

// Event Listeners
closeBtn.onclick = () => modal.style.display = 'none';

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

screenSelect.addEventListener('change', calculateTotal);
ticketsInput.addEventListener('input', calculateTotal);

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic form validation
    const cardNumber = document.getElementById('cardNumber').value;
    const cvv = document.getElementById('cvv').value;
    const expiry = document.getElementById('expiry').value;

    if (cardNumber.length !== 16) {
        alert('Please enter a valid 16-digit card number');
        return;
    }

    if (cvv.length !== 3) {
        alert('Please enter a valid 3-digit CVV');
        return;
    }

    if (!expiry.match(/^\d{2}\/\d{2}$/)) {
        alert('Please enter expiry date in MM/YY format');
        return;
    }

    // Simulate booking confirmation
    alert('Booking successful! A WhatsApp message with QR code will be sent shortly.');
    modal.style.display = 'none';
    bookingForm.reset();
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    createMovieCards();
    initializeDateInput();
});