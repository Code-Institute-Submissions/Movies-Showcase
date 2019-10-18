const BASE_URL = "https://api.themoviedb.org/3/movie/";
const API_KEY = "75577ee1d6c6894588c8299ecbef6d44";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w185/";

const movieDisplay = document.getElementById("moviesDisplay");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const sortButton = document.getElementById("sortButton");
const popular = document.getElementById("popular");
const topRated = document.getElementById("topRated");
const upcoming = document.getElementById("upcoming");
const header = document.getElementById("header");

let filter = "popular";
let page = "1";
let totalPages = 0;
let isSortingVisible = false;

// String building function which returns a valid url.
let urlBuilder = (BASE_URL, filter, API_KEY, page) => `${BASE_URL}${filter}?api_key=${API_KEY}&page=${page}`;
// String building function which returns a valid url for poster.
let posterUrlBuilder = (POSTER_BASE_URL, POSTER_SIZE, poster_path) => `${POSTER_BASE_URL}${POSTER_SIZE}${poster_path}`;

// Asynchronous function for fetching data from given url.
async function getMovies(BASE_URL, filter, API_KEY, page) {
    // Fetching data from given url.
    const RESPONSE = await fetch(urlBuilder(BASE_URL, filter, API_KEY, page));
    // Transforming data into json format.
    const DATA = await RESPONSE.json();
    // Getting number of total pages.
    totalPages = DATA.total_pages;
    // Looping through data results.
    DATA.results.forEach(element => {
        // Getting single poster url.
        let posterUrl = posterUrlBuilder(POSTER_BASE_URL, POSTER_SIZE, element.poster_path);
        // Creating poster element.
        let poster = document.createElement("div");
        // Styling our poster.
        poster.className = "Poster";
        poster.style.backgroundImage = `url("${posterUrl}")`;
        // Appending poster to our display section.
        movieDisplay.appendChild(poster);
    });
}

// Display new list of movies.
let changeMovies = () => {
    // Clearing movie display section from previous page data.
    movieDisplay.innerHTML = "";
    // Fetching new data with updated page value.
    getMovies(BASE_URL, filter, API_KEY, page);
    // Scrolling to the top of the screen.
    window.scrollTo(0, 0);
}

// Go to next page.
nextButton.addEventListener("click", () => {
    // Check if we are not on last page.
    if (page != totalPages) {
        // Increase page value.
        page++;
        // Display new list of movies.
        changeMovies();
    }
});

// Go to previous page.
previousButton.addEventListener("click", () => {
    // Check if we are not on first page.
    if (page != 1) {
        // Decreasing page value.
        page--;
        // Change page.
        changeMovies();
    }
});

// Sort movies by popular filter.
popular.addEventListener("click", () => {
    // Change filter to popular.
    filter = "popular";
    // Return to first page.
    page = 1;
    // Display new list of movies.
    changeMovies();
});

// Sort movies by top rated filter.
topRated.addEventListener("click", () => {
    // Change filter to popular.
    filter = "top_rated";
    // Return to first page.
    page = 1;
    // Display new list of movies.
    changeMovies();
});

// Sort movies by upcomming filter.
upcoming.addEventListener("click", () => {
    // Change filter to popular.
    filter = "upcoming";
    // Return to first page.
    page = 1;
    // Display new list of movies.
    changeMovies();
});

// Sorting menu animation
sortButton.addEventListener("click", () => {
    if (isSortingVisible) {
        header.style.height = "50px";
        isSortingVisible = false;
    } else {
        header.style.height = "100px";
        isSortingVisible = true;
    }
});

// Loading data on window load.
window.onload = getMovies(BASE_URL, filter, API_KEY, page);

