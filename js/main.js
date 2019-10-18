const BASE_URL = "https://api.themoviedb.org/3/movie/";
const API_KEY = "75577ee1d6c6894588c8299ecbef6d44";

let filter = "popular";
let page = "1";

// String building function which returns a valid url.
let urlBuilder = (BASE_URL, filter, API_KEY, page) => `${BASE_URL}${filter}?api_key=${API_KEY}&page=${page}`;

// Asynchronous function for fetching data from given url.
async function getMovies(BASE_URL, filter, API_KEY, page) {
    // Fetching data from given url.
    const RESPONSE = await fetch(urlBuilder(BASE_URL, filter, API_KEY, page));
    // Transforming data into json format.
    const DATA = await RESPONSE.json();

    // Test console log.
    console.log(DATA.results);
}

// Testing Section
getMovies(BASE_URL, filter, API_KEY, page);
