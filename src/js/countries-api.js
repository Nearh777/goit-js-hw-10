'use strict';
const BASE_URL = 'https://restcountries.com/v3.1/all/';

export const fetchCountries = countryName =>
  fetch(
    `${BASE_URL}${countryName}?fullText=true&fields={capital},{population},{flags},{languages}`
  ).then( res => {
    if (!res.ok) {
      throw new Error(response.status);
    }

    return res.json();
  });


  //.then( res => {
  //  if (!res.ok) {
  //    throw new Error(response.status);
  //  }