/* SELECTORS */
const searchInput = document.querySelector('.search-input');
const searchSvg = document.querySelector('.search-svg');

 


const apiKey = '95d48fcf'
const url = 'http://www.omdbapi.com/?apikey=95d48fcf&t=sherlok';

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
}
getData(url);


