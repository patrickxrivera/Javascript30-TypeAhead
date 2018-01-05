const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];

fetch(endpoint)
  .then(response => response.json())
  .then(data => cities.push(...data));

const searchedInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

// display matches
// get array of matches
// add hl to words that are being searched
// add to suggestions class

function displayMatches() {
  let matches = getMatches(this.value, cities)
  renderHTML(this.value, matches);
}

function getMatches(input, cities) {
  const regex = new RegExp(input, 'gi')
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
  let regex = new RegExp(input, 'gi');
  let outputHTML =
    matches.map(place => {
      let city = place.city.replace(regex, `<span class="hl">${input}</span>`)
      let state = place.state.replace(regex, `<span class="hl">${input}</span>`)
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

function getPopulation(population) {
  return Number(population).toLocaleString();
}

searchedInput.addEventListener('keyup', displayMatches);
