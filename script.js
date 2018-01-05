const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];

fetch(endpoint)
  .then(response => response.json())
  .then(data => cities.push(...data));

const searchedInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

function displayMatches() {
  let matches = getMatches(this.value, cities)
  renderHTML(this.value, matches);
}

function getMatches(input, cities) {
  const regex = getRegEx(input);
  let matches =
    cities.filter(entry => {
      return isMatch(entry, regex);
    })
  return matches;
}

function isMatch(entry, regex) {
  return entry.city.match(regex) || entry.state.match(regex);
}

function renderHTML(input, matches) {
  const regex = getRegEx(input);
  let outputHTML =
    matches.map(place => {
      let city = getPlaceHTML(input, place.city);
      let state = getPlaceHTML(input, place.state);
      let population = getPopulation(place.population)
      return `
        <li>
          <span class="name">${city}, ${state}</span>
          <span class="population">${population}</span>
        </li>
      `;
    }).join('');
  suggestions.innerHTML = outputHTML;
}

function getPlaceHTML(input, value) {
  const regex = getRegEx(input);
  let newValue = value.replace(regex, `<span class="hl">${input}</span>`);
  return newValue;
}

function getRegEx(input) {
  let regex = new RegExp(input, 'gi');
  return regex;
}

function getPopulation(population) {
  return Number(population).toLocaleString();
}

searchedInput.addEventListener('keyup', displayMatches);
