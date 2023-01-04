const API_KEY = 'https://restcountries.com/v3.1';

export function fetchCountries(name) {
  return fetch(
    `${API_KEY}/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
