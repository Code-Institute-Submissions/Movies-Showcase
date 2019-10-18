// Constants.
const BASE_URL = "https://api.themoviedb.org/3/movie/";
const API_KEY = "75577ee1d6c6894588c8299ecbef6d44";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w185/";

// All document elements we will be interacting with.
const movieDisplay = document.getElementById("moviesDisplay");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const sortButton = document.getElementById("sortButton");
const popular = document.getElementById("popular");
const topRated = document.getElementById("topRated");
const upcoming = document.getElementById("upcoming");
const header = document.getElementById("header");

// Default variables.
let filter = "popular";
let page = "1";
let totalPages = 0;
let isSortingVisible = false;

// String building function for single movie url.
let movieUrlBuilder = (BASE_URL, filter, API_KEY) => `${BASE_URL}${filter}?api_key=${API_KEY}`;
// String building function for movie list url.
let moviesUrlBuilder = (BASE_URL, filter, API_KEY, page) => `${BASE_URL}${filter}?api_key=${API_KEY}&page=${page}`;
// String building function for poster url.
let posterUrlBuilder = (POSTER_BASE_URL, POSTER_SIZE, poster_path) => `${POSTER_BASE_URL}${POSTER_SIZE}${poster_path}`;

async function getMovie(id) {
    console.log(id);
}

// Fetching movie list.
async function getMovies(filter, page) {
    // Fetching data from given url.
    const RESPONSE = await fetch(moviesUrlBuilder(BASE_URL, filter, API_KEY, page));
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


        poster.addEventListener("click", async function getMovie() {
            movieDisplay.innerHTML = "";
            const response = await fetch(movieUrlBuilder(BASE_URL, element.id, API_KEY));

            const data = await response.json();

            let movieDetails = document.createElement("div");
            let backdrop = document.createElement("div");
            let moviePoster = document.createElement("div");
            let title = document.createElement("div");
            let releaseDate = document.createElement("div");
            let rating = document.createElement("div");
            let overviewCaption = document.createElement("div");
            let overview = document.createElement("div");

            movieDetails.id = "movieDetails";
            backdrop.id = "backdrop";
            moviePoster.id = "poster";
            title.id = "title";
            releaseDate.id = "releaseDate";
            rating.id = "rating";
            overviewCaption.id = "overviewCaption";
            overview.id = "overview";

            moviePoster.style.backgroundImage = `url("${posterUrl}")`;
            title.innerHTML = data.title;
            releaseDate.innerHTML = data.release_date;
            rating.innerHTML = data.vote_average;
            overviewCaption.innerHTML = "Overview";
            overview.innerHTML = data.overview;

            movieDetails.appendChild(backdrop);
            movieDetails.appendChild(moviePoster);
            movieDetails.appendChild(title);
            movieDetails.appendChild(releaseDate);
            movieDetails.appendChild(rating);
            movieDetails.appendChild(overviewCaption);
            movieDetails.appendChild(overview);

            movieDisplay.appendChild(movieDetails);
        });
    });
}

// Display new list of movies.
let changeMovies = () => {
    // Clearing movie display section from previous page data.
    movieDisplay.innerHTML = "";
    // Fetching new data with updated page value.
    getMovies(filter, page);
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
    // Check if sort menu is open.
    if (isSortingVisible) {
        // Change header height.
        header.style.height = "50px";
        isSortingVisible = false;
    } else {
        // Change header height.
        header.style.height = "100px";
        isSortingVisible = true;
    }
});

// Loading data on window load.
window.onload = getMovies(filter, page);

