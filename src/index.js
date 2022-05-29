import './css/styles.css';
import { fetchCountries } from "./js/fetchCountries";
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const refs = {
    searchQuery: document.querySelector("#search-box"),
    countryCard: document.querySelector(".country-info"),
    countriesList: document.querySelector(".country-list"),
}
console.log(refs.searchQuery)
refs.searchQuery.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
    clearMarkup();
    const searchName = event.target.value.trim();
    console.log(searchName);

    fetchCountries(searchName).then(value => {
            console.log(value);
            console.log(value.length);
            if (value.length === 1) {                
                const listMarkup = value.map(renderCountryCard).join('');  //+
                refs.countryCard.insertAdjacentHTML('beforeend', listMarkup);  //+
            } else if (value.length > 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            } else {
                const listMarkup = value.map(renderCountriesList).join('');  //+
         refs.countriesList.insertAdjacentHTML('beforeend', listMarkup);  //+              
            }
        }).catch(onFetchError)
    }

function renderCountryCard(country) {    
    const flagOfitial = country.flags.svg;
    const name = country.name;
    const capital = country.capital;
    const population = country.population;
    const language = Object.values(country.languages);   
    const languages = [];
    for (const oneLanguage of language) {
        languages.push(oneLanguage.name);
    };
    const markupCard = `<div class="card">
    <div class="card-top">
        <img src="${flagOfitial}" alt="${name}" width="50" >
        <span class="card-title"><b> ${name}</b></span>
    </div>
    <div class="card-body">
        <p class="card-text"><b>Capital: </b>${capital}</p>
        <p class="card-text"><b>Population: </b>${population}</p>
        <p class="card-text"><b>Languages: </b>${languages}</p>
    </div>
</div>`;
    refs.countryCard.innerHTML = markupCard;    
}

function renderCountriesList(countries) {
    const nameOfficial = countries.name;
    const flagUrl = countries.flags.svg;
    const markupList = `<li class="list-group-item">
                <img src='${flagUrl}' alt='${nameOfficial}' width="50">
                <span class="card-title"><b> ${nameOfficial}</b></span>
            </li>`;
    return markupList;   
}

function clearMarkup() {
    refs.countryCard.innerHTML = "";
    refs.countriesList.innerHTML = "";
}

function onFetchError() {
    Notiflix.Notify.failure("Oops, there is no country with that name");
}