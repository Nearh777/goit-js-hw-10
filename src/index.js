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
  e.preventDefault();
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



searchInputEl.addEventListener('input', debounce(handleCountryInput, DEBOUNCE_DELAY));



