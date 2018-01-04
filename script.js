const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
  .then(response => response.json())
  .then(data => cities.push(...data));

const input = document.querySelector('input');

const filterResults = () => {
  // get current value
  // get current value length
  // filter out entries in cities array that don't start with current value
  let currentVal = input.value;
  let currentValLength = input.value.length;
  let targetCities = getTargetCities(currentVal, currentValLength);
  console.log(targetCities);
}

function getTargetCities(currentVal, length) {
  let filteredArr = cities.filter(entry => {
    let slicedEntry = entry.city.slice(0, length);
    return currentVal.toLowerCase() === slicedEntry.toLowerCase();
  })
  return filteredArr;
}

input.addEventListener('input', filterResults);
