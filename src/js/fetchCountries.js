const BASE = "https://restcountries.com/v2";


export function fetchCountries(name) {
  
    const url = `${BASE}/name/${name}?fields=name,capital,population,flags,languages`;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            console.log(response);
            return response.json();
        })
}
