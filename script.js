const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
  .then(response => response.json())
  .then(data => cities.push(...data));

const input = document.querySelector('input');

const filterResults = () => {
  let currentVal = input.value;
  let targetCities = getTargetCities(currentVal, cities);
  console.log(targetCities);
}

function getTargetCities(currentVal, cities) {
  const regex = new RegExp(currentVal, 'gi')
  let filteredArr =
    cities.filter(entry => {
      return isMatch(entry, regex);
    })
  return filteredArr;
}

function isMatch(entry, regex) {
  return entry.city.match(regex) || entry.state.match(regex);
}

input.addEventListener('input', filterResults);
