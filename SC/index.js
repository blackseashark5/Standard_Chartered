// Sample movie data with expanded options
const movies = [
    {
        id: 1,
        title: "The Last Guardian",
        genre: "Action/Sci-Fi",
        rating: "U/A",
        status: "Now Showing",
        poster: "https://picsum.photos/300/450?random=1",
        duration: "2h 35min",
        cast: [
            { name: "Chris Evans", role: "Commander" },
            { name: "Scarlett Johnson", role: "Dr. Sarah" }
        ],
        imdbRating: "8.5"
    },
    {
        id: 2,
        title: "Eternal Shadows",
        genre: "Thriller/Mystery",
        rating: "A",
        status: "Now Showing",
        poster: "https://picsum.photos/300/450?random=2",
        duration: "2h 15min",
        cast: [
            { name: "Tom Hardy", role: "Detective Blake" },
            { name: "Emma Stone", role: "The Suspect" }
        ],
        imdbRating: "8.8"
    },
    {
        id: 3,
        title: "Love in Venice",
        genre: "Romance/Drama",
        rating: "U",
        status: "Now Showing",
        poster: "https://picsum.photos/300/450?random=3",
        duration: "2h 10min",
        cast: [
            { name: "Ryan Gosling", role: "Marco" },
            { name: "Ana de Armas", role: "Isabella" }
        ],
        imdbRating: "7.9"
    },
    {
        id: 4,
        title: "The Lost Kingdom",
        genre: "Fantasy/Adventure",
        rating: "U/A",
        status: "Now Showing",
        poster: "https://picsum.photos/300/450?random=4",
        duration: "2h 45min",
        cast: [
            { name: "Henry Cavill", role: "King Arthur" },
            { name: "Anya Taylor-Joy", role: "Princess Elena" }
        ],
        imdbRating: "8.2"
    },
    {
        id: 5,
        title: "Quantum Heist",
        genre: "Heist/Action",
        rating: "U/A",
        status: "Now Showing",
        poster: "https://picsum.photos/300/450?random=5",
        duration: "2h 20min",
        cast: [
            { name: "Idris Elba", role: "Marcus" },
            { name: "Margot Robbie", role: "The Hacker" }
        ],
        imdbRating: "8.4"
    },
    {
        id: 6,
        title: "The Last Laugh",
        genre: "Comedy",
        rating: "U",
        status: "Now Showing",
        poster: "https://picsum.photos/300/450?random=6",
        duration: "1h 55min",
        cast: [
            { name: "Ryan Reynolds", role: "Jack" },
            { name: "Jennifer Lawrence", role: "Lucy" }
        ],
        imdbRating: "7.8"
    },
    {
        id: 7,
        title: "Dark Waters",
        genre: "Horror/Thriller",
        rating: "A",
        status: "Now Showing",
        poster: "https://picsum.photos/300/450?random=7",
        duration: "2h 5min",
        cast: [
            { name: "Robert Pattinson", role: "The Diver" },
            { name: "Florence Pugh", role: "Marine Biologist" }
        ],
        imdbRating: "8.1"
    },
    {
        id: 8,
        title: "Beyond Time",
        genre: "Sci-Fi/Drama",
        rating: "U/A",
        status: "Now Showing",
        poster: "https://picsum.photos/300/450?random=8",
        duration: "2h 30min",
        cast: [
            { name: "John David Washington", role: "Dr. Time" },
            { name: "Zendaya", role: "The Traveler" }
        ],
        imdbRating: "8.7"
    }
];

// Screen configuration
const screens = {
    'A': { capacity: 150, class: 'Gold', price: 500 },
    'B': { capacity: 200, class: 'Silver', price: 300 },
    'C': { capacity: 250, class: 'Iron', price: 200 },
    'D': { capacity: 250, class: 'Iron', price: 200 }
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

// Create movie cards with enhanced information
function createMovieCards() {
    moviesGrid.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-details">
                    <p>
                        <span class="movie-rating">${movie.rating}</span>
                        <span>${movie.genre}</span>
                    </p>
                    <p>⭐ ${movie.imdbRating} | ${movie.duration}</p>
                    <p>${movie.cast[0].name} | ${movie.cast[1].name}</p>
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
    const total = screens[screen].price * tickets;
    totalAmountSpan.textContent = `₹${total}`;
}

// Open booking modal with enhanced movie information
function openBooking(movieId) {
    const movie = movies.find(m => m.id === movieId);
    if (movie) {
        modal.style.display = 'block';
        
        // Update modal title with movie name
        const modalTitle = modal.querySelector('h2');
        modalTitle.textContent = `Book Tickets - ${movie.title} (${movie.rating})`;
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
    
    // Enhanced form validation
    const cardNumber = document.getElementById('cardNumber').value;
    const cvv = document.getElementById('cvv').value;
    const expiry = document.getElementById('expiry').value;
    const cardName = document.getElementById('cardName').value;

    if (!cardName.trim()) {
        alert('Please enter the name on your card');
        return;
    }

    if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
        alert('Please enter a valid 16-digit card number');
        return;
    }

    if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
        alert('Please enter a valid 3-digit CVV');
        return;
    }

    if (!expiry.match(/^\d{2}\/\d{2}$/)) {
        alert('Please enter expiry date in MM/YY format');
        return;
    }

    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;

    // Simulate payment processing
    setTimeout(() => {
        alert('Booking successful! A WhatsApp message with QR code will be sent shortly.');
        modal.style.display = 'none';
        bookingForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    createMovieCards();
    initializeDateInput();
});