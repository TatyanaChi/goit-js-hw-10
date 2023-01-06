import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
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
    refs.countriesList.innerHTML = '';
    refs.infoAboutCountries.innerHTML = '';
  }
  refs.countriesList.innerHTML = '';
  refs.infoAboutCountries.innerHTML = '';
  fetchCountries(inputValue).then(renderCountryList).catch(onFetchError);
}

function renderCountryList(countries) {
  const numberCountriesFound = countries.length;
  const markupCountriesList = countries
    .map(
      ({ name, flags }) =>
        `<li class="country"><img src="${flags.svg}"alt="Flag of ${name.official}" /><h1>${name.official}</h1></li>`
    )
    .join('');
  refs.countriesList.innerHTML = markupCountriesList;
  console.log(markupCountriesList);

  if (numberCountriesFound === 1) {
    const markupAboutCountry = countries
      .map(
        ({ capital, population, languages }) =>
          `<p><b>Capital: </b>${capital}</p><p><b>Population: </b>${population}</p><p><b>Languages: </b>${Object.values(
            languages
          )}</p>`
      )
      .join('');
    refs.infoAboutCountries.innerHTML = markupAboutCountry;
  }

  if (numberCountriesFound > 10) {
    Notify.warning('Too many matches found. Please enter a more specific name');
  }
}

function onFetchError(error) {
  Notify.failure('Oops, there is no country with that name');
}
