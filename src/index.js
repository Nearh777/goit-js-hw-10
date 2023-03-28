'use strict';
import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';



const searchInputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

const cleanMarkup = ref => (ref.innerHTML = '');

const handleCountryInput = e => {
  //e.preventDefault();
  const textInput = e.target.value.trim();

  if (!textInput) {
    cleanMarkup(countryListEl);
    cleanMarkup(countryInfoEl);
    return;
  }


  fetchCountries(textInput)
  .then(data => {
    console.log(data);
    if (data.length > 10) {
      Notify.info(
        'Знайдено забагато збігів. Будь ласка, введіть більш конкретне ім'+"'"+'я'
      );
      return;
    }
    renderMarkup(data);
  })
  .catch(err => {
    cleanMarkup(countryListEl);
    cleanMarkup(countryInfoEl);
    Notify.failure('На жаль, країни з такою назвою немає');
  });
};

const renderMarkup = data => {
  if (data.length === 1) {
    cleanMarkup(countryListEl);
    const markupInfo = createInfoMarkup(data);
    countryInfoEl.innerHTML = markupInfo;
  } else {
    cleanMarkup(countryInfoEl);
    const markupList = createListMarkup(data);
    countryListEl.innerHTML = markupList;
  }
};

const createListMarkup = data => {
  return data
    .map(
      ({ name, flags }) =>
        `<li><img src="${flags.png}" alt="${name.official}" width="60" height="40">${name.official}</li>`
    )
    .join('');
};

const createInfoMarkup = data => {
  return data.map(
    ({ name, capital, population, flags, languages }) =>
      `<img src="${flags.png}" alt="${name.official}" width="200" height="100">
      <h1>${name.official}</h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>`
  );
};




searchInputEl.addEventListener('input', debounce(handleCountryInput, DEBOUNCE_DELAY));



