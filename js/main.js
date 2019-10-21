// Constants.
const BASE_URL = "https://api.themoviedb.org/3/movie/";
const API_KEY = "75577ee1d6c6894588c8299ecbef6d44";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w185/";
const BACKDROP_SIZE = "w780/";

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
// String building function for image url.
let imageUrlBuilder = (IMAGE_BASE_URL, IMAGE_SIZE, image_path) => `${IMAGE_BASE_URL}${IMAGE_SIZE}${image_path}`;

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
        let posterUrl = imageUrlBuilder(IMAGE_BASE_URL, POSTER_SIZE, element.poster_path);
        // Getting single backdrop url.
        let backdropUrl = imageUrlBuilder(IMAGE_BASE_URL, BACKDROP_SIZE, element.backdrop_path);
        // Creating poster element.
        let poster = document.createElement("div");
        // Styling our poster.
        poster.className = "Poster";
        poster.style.backgroundImage = `url("${posterUrl}")`;
        // Appending poster to our display section.
        movieDisplay.appendChild(poster);
        // Showing movie details.
        poster.addEventListener("click", async function getMovie() {
            // Making navigation bar dissapear.
            header.style.height = "0";
            // Clear screen.
            movieDisplay.innerHTML = "";
            // Fetching data from given url.
            const response = await fetch(movieUrlBuilder(BASE_URL, element.id, API_KEY));
            // Transforming data into json format.
            const data = await response.json();
            //Creatign elements to populate movie detail view.
            let movieDetails = document.createElement("div");
            let backButton = document.createElement("div");
            let back = document.createElement("i");
            let backdrop = document.createElement("div");
            let moviePoster = document.createElement("div");
            let title = document.createElement("div");
            let releaseDate = document.createElement("div");
            let rating = document.createElement("div");
            let svg = document. createElementNS("http://www.w3.org/2000/svg", "svg")
            let circle = document. createElementNS("http://www.w3.org/2000/svg", "circle")
            let rate = document.createElement("div");
            let caption = document.createElement("div");
            let overview = document.createElement("div");
            //Style movie detail view.
            movieDetails.id = "movieDetails";
            backButton.id = "backButton";
            back.className = "fas fa-chevron-left";
            backdrop.id = "backdrop";
            backdrop.style.backgroundImage = `url("${backdropUrl}")`;
            moviePoster.id = "poster";
            moviePoster.style.backgroundImage = `url("${posterUrl}")`;
            title.id = "title";
            title.innerHTML = data.title;
            releaseDate.id = "releaseDate";
            releaseDate.innerHTML = data.release_date;
            rating.id = "rating";
            circle.setAttribute("cx","90");
            circle.setAttribute("cy","70");
            circle.setAttribute("r","50");
            circle.style.strokeDashoffset = 314 * (1 - (data.vote_average * 0.1));
            rate.id = "rate";
            rate.innerHTML = data.vote_average;
            caption.id = "caption";
            caption.innerHTML = "Overview";
            overview.id = "overview";
            overview.innerHTML = data.overview;
            //Populating movie detail view.
            backButton.appendChild(back);
            movieDetails.appendChild(backButton);
            movieDetails.appendChild(backdrop);
            rating.appendChild(svg);
            rating.appendChild(rate);
            svg.appendChild(circle);
            movieDetails.appendChild(moviePoster);
            movieDetails.appendChild(title);
            movieDetails.appendChild(releaseDate);
            movieDetails.appendChild(rating);
            movieDetails.appendChild(caption);
            movieDetails.appendChild(overview);
            movieDisplay.appendChild(movieDetails);
            // Making back button work.
            backButton.addEventListener("click", () => changeMovies());
        });
    });
}

// Display new list of movies.
let changeMovies = () => {
    // Making navigation bar appear.
    header.style.height = "50px";
    isSortingVisible = false;
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

