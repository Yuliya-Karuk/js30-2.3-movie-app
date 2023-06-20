/* SELECTORS */
const searchForm = document.querySelector('.search') // <form> для поиска
const searchInput = document.querySelector('.search-input'); // <input> для поиска
const buttonClear = document.querySelector('.clear-btn'); // кнопка очистить поиск
const popularList = document.querySelector('.popular-list'); // список с популярными фильмами
const searchList = document.querySelector('.search-list'); // список с результатами поиска
const topFilm = document.querySelector('.top-film'); // список с результатами поиска
const searchTitle = document.querySelector('.search-results>.section-title'); // список с результатами поиска
let buttonHeart = []
const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=16d35851d48e8bf86f00899a21ddb357&language=en-US&page=1`;
const genresUrl = 'https://api.themoviedb.org/3/genre/movie/list?api_key=16d35851d48e8bf86f00899a21ddb357&language=en';

//функция, которая возвращает жанры фильма
function getGenre(neededArr, arr) {
    return x = arr.reduce(((acc, el) => {
        if (neededArr.includes(el.id)) {
            acc = [...acc, el.name]
        }
        return acc
    }), [])
}

// функция, которая после загрузки страницы ставит фокус на инпут
function inputFocus() {
    searchInput.focus();
}

// функция, которая очищает поиск 
function clearInput() {
    searchInput.value = ''
    buttonClear.blur()
    searchList.innerHTML = ''
    searchList.classList.add('visually-hidden')
    searchTitle.classList.add('visually-hidden')
}

// функция, которая получает значение, введенное в инпут и выдает по нему фильмы
function getInput(event) {
    event.preventDefault();
    let searchUrl = `https://api.themoviedb.org/3/search/movie?query=${searchInput.value}&api_key=16d35851d48e8bf86f00899a21ddb357&language=en-US&page=1`;
    getMovies(searchUrl, searchList);
    searchList.classList.remove('visually-hidden')
    searchTitle.classList.remove('visually-hidden')
}

// функция, которая перекрашивает сердцев красный
function colorButtonHeart(event) {
    event.preventDefault();
    event.target.classList.add("movie-favorite-red");
}

// функция, которая выводит список фильмов
async function getMovies(url, htmlEl) {
    const res = await fetch(url);
    const data = await res.json();

    data.results.forEach((el) => {
        htmlEl.insertAdjacentHTML("beforeend",
            `<li class="movie-item">
                <a class="movie-wrapper-link" href="#" aria-label="link on movie">
                    <img class="movie-poster" src="https://www.themoviedb.org/t/p/w1280/${el.poster_path}" width="200" height="100%" alt="movie poster">
                    <p class="movie-overview">${el.overview}</p>
                </a>
                <div class="movie-details">
                    <a href="" class="movie-title">${el.title}</a>
                    <p class="movie-date">${el.release_date}</p>
                    <div class="movie-description">
                        <div class="movie-rate">
                            <img class="imbd-img" src="images/imbd.svg" width="28" height="14" alt="icon IMBD rating">
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

// функция, которая выводит 1 топовый фильм на переднем плане
async function showTopMovie(url) {
    const res = await fetch(url);
    const data = await res.json();
    const neededFilm = data.results[2]

    const resGenres = await fetch(genresUrl);
    const dataGenres = await resGenres.json();
    const neededGenres = getGenre(neededFilm.genre_ids, dataGenres.genres).join(', ')

    topFilm.insertAdjacentHTML("beforeend",
        `<div class="movie-top-poster"></div>
        <div class="movie-top-description">  
            <a href="#" class="movie-title">${neededFilm.title}</a>
            <p class="movie-top-overview">${neededFilm.overview}</p>
            <p class="movie-genres">${neededGenres}</p>
            <div class="top-movie-details">
                <a class="watch" type="button" aria-label="link to watch film">
                    <span>Watch</span>
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 2L14 8.6394L2 15.2788V2Z" fill="white" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
                <button class="add-favorite" type="button" aria-label="click to add to favorite">
                    <span>My list</span>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.936 10.2H10.564V16.5H6.712V10.2H0.34V6.6H6.712V0.299998H10.564V6.6H16.936V10.2Z" fill="white"/>
                    </svg>
                </button>
            </div>
            <div class="movie-rate">
                <img class="imbd-img" src="images/imbd.svg" width="28" height="14" alt="icon IMBD rating">
                <p class="imbd-rate">${neededFilm.vote_average}</p>
                <p class="movie-date">${neededFilm.release_date}</p>
            </div>
        </div>`
    );

    document.querySelector('.movie-top-poster').style.backgroundImage = `url(https://www.themoviedb.org/t/p/w1280/${neededFilm.poster_path})`
}

getMovies(popularUrl, popularList); //загрузить стартовую страницу с популярными фильмами
showTopMovie(popularUrl) //загрузить секцию с 1 топовым фильмом

// Listeners
document.addEventListener("DOMContentLoaded", inputFocus); // фокус на инпуте после загрузки страницы
searchForm.addEventListener("submit", getInput); // получить значение инпута
buttonClear.addEventListener("click", clearInput); // очистить инпут при нажатии на крестик
