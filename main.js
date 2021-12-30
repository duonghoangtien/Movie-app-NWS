$(document).ready(function () {
  const API_URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1cf50e6248dc270629e802686245c2c8";
  const IMG_URL = "https://image.tmdb.org/t/p/w500";
  const searchURL =
    "https://api.themoviedb.org/3/search/movie?api_key=1cf50e6248dc270629e802686245c2c8";

  const main = document.getElementById("main");
  const form = document.getElementById("form");
  const search = document.getElementById("search");

  function callApiMovies(url) {
    $.ajax({
      type: "GET",
      url: url,
      success: function (data) {
        if (data.results.length !== 0) {
          getMovies(data.results);
        } else {
          main.textContent = `<h1 class="no-results">No Results Found</h1>`;
        }
      },
    });
  }
  callApiMovies(API_URL);

  function getMovies(data) {
    main.innerHTML = "";
    data.forEach((movie) => {
      const { title, poster_path, vote_average, overview, id } = movie;
      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");
      movieEl.innerHTML = `
             <img src="${
               poster_path
                 ? IMG_URL + poster_path
                 : "http://via.placeholder.com/1080x1580"
             }" alt="${title}">
  
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
  
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>`;

      main.appendChild(movieEl);
    });
  }
  function getColor(vote) {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 5) {
      return "orange";
    } else {
      return "red";
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
      callApiMovies(searchURL + "&query=" + searchTerm);
    } else {
      callApiMovies(API_URL);
    }
  });
});
