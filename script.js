 const countryContainer = document.querySelector('.country-container')
const filterByRegion = document.querySelector('.filter-by-region')
const search = document.querySelector('.search input')
const darkMode =document.querySelector('.darkMode')
const title =document.querySelector('.title')
const searchSymbol =document.querySelector('#searchSymbol')
const sunImg =document.querySelector('#sunImg')
const head = document.querySelector('.head')
const mode = document.querySelector('.mode')

let allCountriesData

fetch('https://restcountries.com/v3.1/independent?status=true')
.then((res)=>res.json())
.then((data)=>{
    renderCountriesData(data)
    allCountriesData =data
    console.log(allCountriesData);
})



filterByRegion.addEventListener('change',(e)=>{
    console.log(filterByRegion.value);

fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
.then((res)=>res.json())
.then((renderCountriesData))


})

function renderCountriesData(data){
     countryContainer.innerText =''
   data.forEach((country)=>{
  const countryCard = document.createElement('a');
        // countryCard.href =`/country.html?name=${country.name.common}`;
        countryCard.href = `./country.html?name=${encodeURIComponent(country.name.common)}`;
 countryCard.classList.add('card');

 const imageContainer = document.createElement('div');
 imageContainer.classList.add('image')
 const image = document.createElement('img');
 image.src =`${country.flags.svg}`;
 imageContainer.append(image);
countryCard.append(imageContainer);


const title = document.createElement('div');
title.classList.add('data-country');
const header = document.createElement('h2');

header.innerText =`${country.name.common}` ;
title.append(header);
const p1 = document.createElement('p');
p1.innerHTML =` <strong>Population :</strong>${country.population.toLocaleString('en-In')}`;
const p2 = document.createElement('p');
p2.innerHTML = `<strong>Region :</strong> ${country.region}`;
const p3 = document.createElement('p');
p3.innerHTML = `<strong>Capital :</strong> ${country.capital}`;
const p4 = document.createElement('p');

title.append(p1, p2, p3, p4);
countryCard.append(title);

countryContainer.append(countryCard);
}
   )}



search.addEventListener('input', (e)=>{
//   console.log(e.target.value);
const filterCountries =allCountriesData.filter((country) =>country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
console.log(filterCountries);
renderCountriesData(filterCountries)
})

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');

    sunImg.classList.remove('fa-regular', 'fa-moon');
    sunImg.classList.add('fa-solid', 'fa-sun');

    if(mode){
        mode.innerText = 'Light Mode';
    }
}
darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');

        sunImg.classList.remove('fa-regular', 'fa-moon');
        sunImg.classList.add('fa-solid', 'fa-sun');
        mode.innerText = 'Light Mode';
    } else {
        localStorage.setItem('theme', 'light');

        sunImg.classList.remove('fa-solid', 'fa-sun');
        sunImg.classList.add('fa-regular', 'fa-moon');
        mode.innerText = 'Dark Mode';
    }
});




   

// console.log(countryContainer);