import Notiflix from 'notiflix';
import links from './refs';
import countriesListTpl from '../templates/countries-list.hbs';
import countryInfoTpl from '../templates/country-info.hbs';
import { clearMarkup } from '../index';
const refs = links();

export function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`,
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(response => {
      if (response.length > 10) {
        clearMarkup();
        return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      }
      if ((response.length >= 2) & (response.length <= 10)) {
        clearMarkup();
        refs.countryList.insertAdjacentHTML('beforeend', countriesListTpl(response));
        return;
      }
      if (response.length === 1) {
        clearMarkup();
        refs.countryInfo.insertAdjacentHTML('beforeend', countryInfoTpl(response));
      }
    })
    .catch(error => {
      clearMarkup();
      Notiflix.Notify.failure('Oops, there is no country with that name');
      return error;
    });
}
