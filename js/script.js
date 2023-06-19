/* SELECTORS */
const searchForm = document.querySelector('.search') // <form> для поиска
const searchInput = document.querySelector('.search-input'); // <input> для поиска
const buttonClear = document.querySelector('.clear-btn'); // кнопка очистить поиск
const popularList = document.querySelector('.popular-list'); // список с популярными фильмами
const searchList = document.querySelector('.search-list'); // список с результатами поиска
let buttonHeart = []
const apiKey = '16d35851d48e8bf86f00899a21ddb357'
const baseUrl = "https://api.themoviedb.org/3/"
const language = "en-US"
const page = 1
const popularUrl = `${baseUrl}movie/popular?api_key=${apiKey}&language=${language}&page=${page}`;


// функция, которая после загрузки страницы ставит фокус на инпут
function inputFocus() {
    searchInput.focus();
}

// функция, которая очищает поиск 
function clearInput() {
    searchInput.value = ''
    buttonClear.blur()
    searchList.innerHTML = ''
}

// функция, которая получает значение, введенное в инпут и выдает по нему фильмы
function getInput(event) {
    event.preventDefault();
    let searchUrl = `${baseUrl}search/movie?query=${searchInput.value}&api_key=${apiKey}&language=${language}&page=${page}`;
    getMovies(searchUrl, searchList);
}

function colorButtonHeart(event) {
    event.preventDefault();
    event.target.classList.add("movie-favorite-red");
}

async function getMovies(url, htmlEl) {
    const res = await fetch(url);
    const data = await res.json();

    data.results.forEach((el) => {
        htmlEl.insertAdjacentHTML("beforeend",
            `<li class="movie-item">
                <img class="movie-poster" src="https://www.themoviedb.org/t/p/w1280/${el.poster_path}" width="200" height="100%" >
                <div class="movie-overview visually-hidden">${el.overview}</div>
                <div class="movie-details">
                    <h4 class="movie-title">${el.title}</h4>
                    <p class="movie-date">${el.release_date}</p>
                    <div class="movie-description">
                        <div class="movie-rate">
                            <img class="imbd-img" src="images/imbd.svg" width="28" height="14" >
                            <p class="imbd-rate">${el.vote_average}</p>
                        </div>
                        <button class="movie-favorite" type="button" aria-label="click to add to favorite"></button>
                    </div>
                </div>
            </li>`
        );
    });

    buttonHeart = document.querySelectorAll('.movie-favorite');
    buttonHeart.forEach((el) => el.addEventListener("click", colorButtonHeart))
}

getMovies(popularUrl, popularList); //загрузить стартовую старницу с популярными фильмами

// Listeners
document.addEventListener("DOMContentLoaded", inputFocus); // фокус на инпуте после загрузки страницы
searchForm.addEventListener("submit", getInput); // получить значение инпута
buttonClear.addEventListener("click", clearInput); // очистить инпут при нажатии на крестик

// const apiKey = '95d48fcf'
// const startedUrl = `http://www.omdbapi.com/?apikey=95d48fcf&`

// async function getData(url) {
//   const res = await fetch(url);
//   const data = await res.json();
//   console.log(data);
// }
// getData(url);


