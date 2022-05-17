import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import links from './js/refs';

const DEBOUNCE_DELAY = 300;
const refs = links();

refs.input.addEventListener('input', debounce(onInputSubmit, DEBOUNCE_DELAY));
function onInputSubmit(e) {
  const name = e.target.value.trim();
  if (!name) {
    clearMarkup();
    return;
  }
  fetchCountries(name);
}
export function clearMarkup() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}
