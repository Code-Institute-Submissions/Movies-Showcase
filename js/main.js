const BASE_URL = "https://api.themoviedb.org/3/movie/";
const API_KEY = "75577ee1d6c6894588c8299ecbef6d44";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w185/";

let filter = "popular";
let page = "1";

const movieDisplay = document.getElementById("moviesDisplay");

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

// Testing Section
getMovies(BASE_URL, filter, API_KEY, page);

