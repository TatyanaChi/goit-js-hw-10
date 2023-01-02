import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchInput: document.querySelector('#search-box'),
  countriesList: document.querySelector('.country-list'),
  infoAboutCountries: document.querySelector('.country-info'),
};

refs.searchInput.addEventListener(
  'input',
  debounce(searchCountries, DEBOUNCE_DELAY)
);

function searchCountries(e) {
  const inputValue = e.target.value.trim();
  console.log(inputValue);
  if (inputValue === '') {
    return;
  }
  refs.countriesList.innerHTML = '';
  refs.infoAboutCountries.innerHTML = '';
  refs.searchInput.removeEventListener('input', e);
  return;
  // fetchCountries(inputValue)
  //   .then(renderCountryList)
  //   .catch(err => {
  //     Notify.failure('Oops, there is no country with that name');
  //     refs.countriesList.innerHTML = '';
  //     refs.infoAboutCountries.innerHTML = '';
  //   });
}

fetchCountries(inputValue).then(renderCountryList).catch(onFetchError);

function renderCountryList(countries) {
  const markupCountriesList = countries
    .map(
      ({ name, flags }) =>
        `<li class="country"><img src="${flags.svg}"alt="Flag of ${name.official}" /><h1>${name.official}</h1></li>`
    )
    .join('');
  refs.countriesList.innerHTML = markupCountriesList;
  console.log(markupCountriesList);
}

function onFetchError(error) {
  Notify.failure('Oops, there is no country with that name');
}

// fetch('https://restcountries.com/v3.1/name/peru').then(r => {
//   r.json();
// });
