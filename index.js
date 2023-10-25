let films = []; // Define a variable to hold films data

document.addEventListener("DOMContentLoaded", () => {
    getFilms();
});

// Get movies data from the local JSON server
let baseURL = "https://my-json-server.typicode.com/leon-kxng/FLATDANGO_MOVIES/films";

function getFilms() {
    fetch(baseURL)
        .then(res => res.json())
        .then(data => {
            films = [...data];
            displayFilms(films);
        });
}

// Function to display movies within the div. Three Movies are to be displayed in each row.
function displayFilms(films) {
    const filmContainer = document.querySelector("#film");

    films.forEach(film => {
        const card = document.createElement("div");
        card.className = "p-2 m-3 col-3 card";
        card.innerHTML = `
            <div class="card-body">
                <img src="${film.poster}" class="card-img-top" alt="${film.description}">
                <h5 class="card-title">${film.title}</h5>
                <h6>${film.description}</h6>
                <ul>
                    <li>Runtime: ${film.runtime}</li>
                    <li>Showtime: ${film.showtime}</li>
                    <li>Available Tickets: <span class="available-tickets">${film.capacity - film.tickets_sold}</span></li>
                </ul>
                <form>
                    <button class="buy-button">Buy Ticket</button>
                </form>
            </div>
        `;
        filmContainer.appendChild(card);

        const buyButton = card.querySelector(".buy-button");
        const availableTickets = card.querySelector(".available-tickets");

        buyButton.addEventListener("click", () => {
            event.preventDefault();
            // Decrease available tickets by 1
            const currentAvailableTickets = parseInt(availableTickets.textContent, 10);
            if (currentAvailableTickets > 0) {
                availableTickets.textContent = currentAvailableTickets - 1;
            } else {
                alert("No more tickets available for this film.");
            }
        });
    });
}

