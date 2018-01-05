const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
  .then(response => response.json())
  .then(data => cities.push(...data));

const searchedInput = document.querySelector('.search');

// display matches
// get array of matches
// add hl to words that are being searched
// add to suggestions class

function displayMatches() {
  let matches = getMatches(this.value, cities)
  renderHTML(matches);
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

function renderHTML(matches) {
  // get city
  // get state
  // get population
  // create list element
  // create html
  // append to suggestions

  // get rid of original values;
  // highlight searched words;
  // reset each time search is made;
  const suggestions = document.querySelector('.suggestions');
  let li = document.createElement('li');

  while (suggestions.firstChild) {
    suggestions.removeChild(suggestions.firstChild);
  }

  matches.forEach(place => {
    let city = place.city;
    let state = place.state;
    let population = Number(place.population).toLocaleString();
    li.innerHTML = `${city}, ${state} <span class="population">${population}</span>`;
    suggestions.appendChild(li);
  })
}

searchedInput.addEventListener('keyup', displayMatches);
