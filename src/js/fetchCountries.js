'use strict';


export const fetchCountries = countryName => {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';
  const properties = 'fields=name,capital,population,flags,languages';

  return fetch(`${BASE_URL}${countryName}?${properties}`).then(res => {
    console.log(res);
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
};
  
