/* SELECTORS */
const searchForm = document.querySelector('.search') // <form> для поиска
const searchInput = document.querySelector('.search-input'); // <input> для поиска
const buttonClear = document.querySelector('.clear-btn'); // кнопка очистить поиск

// функция, которая после загрузки страницы ставит фокус на инпут
function inputFocus() {
    searchInput.focus();
}

// функция, которая очищает поиск 
function clearInput() {
    searchInput.value = ''
    buttonClear.blur()
}

// функция, которая очищает получает значение, введенное в инпут
function getInput(event) {
    event.preventDefault();
    console.log(searchInput.value)
}

// Listeners
document.addEventListener("DOMContentLoaded", inputFocus); // фокус на инпуте после загрузки страницы
searchForm.addEventListener("submit", getInput); // получить значение инпута
buttonClear.addEventListener("click", clearInput); // очистить инпут при нажатии на крестик




// const apiKey = '95d48fcf'
// const url = 'http://www.omdbapi.com/?apikey=95d48fcf&t=sherlok';

// async function getData(url) {
//   const res = await fetch(url);
//   const data = await res.json();
//   console.log(data);
// }
// getData(url);


