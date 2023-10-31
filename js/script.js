let tabCountries = null
let tabFavorites = null

let allCountries = []
let favCountries = []

let countCountries = 0
let countFavCountries = 0

let allPopulation = 0
let favPopulation = 0

let numberFormat = null

window.addEventListener('load', () => {
  tabCountries = document.querySelector('#tabCountries')
  tabFavorites = document.querySelector('#tabFavorites')

  countCountries = document.querySelector('#countCountries')
  countFavCountries = document.querySelector('#countFavCountries')

  allPopulation = document.querySelector('#totalPopulationList')
  favPopulation = document.querySelector('#totalPopulationFavorites')

  numberFormat = Intl.NumberFormat('pt-BR')

  fetchCountries()
})

function formatNumber(pop) {
  return numberFormat.format(pop)
}

async function fetchCountries() {
  const res = await fetch('https://restcountries.com/v3.1/all')
  const json = await res.json()

  allCountries = json.map(country => {
    // console.log(country)
    const newCountry = {
      id: country.idd.root,
      name: country.translations.por.common,
      population: formatNumber(country.population),
      flag: country.flags.png
    }
    return newCountry
  })
  // console.log(allCountries)
  render()
}

function render() {
  renderCountryList()
}

function renderCountryList() {
  let countriesHTML = '<div>'
  allCountries.forEach(country => {
    const { id, name, population, flag } = country
    const countryHTML = `
    <div class='country'>
      <div>
        <a id="${id}" class="waves-effect waves-light btn">+</a>
      </div>
      <div>
        <img src="${flag}" alt="${name}">
      </div>
      <div>
        <ul>
          <li>${name}</li>
          <li>${population}</li>
        </ul>
      </div>
    </div>
    `
     countriesHTML += countryHTML
  })
  countriesHTML += '</div>'
  tabCountries.innerHTML = countriesHTML
}

