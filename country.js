// const countryNameUrl = new URLSearchParams(window.location.search).get('name');
const countryNameUrl =decodeURIComponent(new URLSearchParams(window.location.search).get('name'));
const sizeBox =document.querySelector('.size-box');
const flagContainer =document.querySelector('.imgCountainer img');
const countryNameh1 =document.querySelector('.country-detail-1 h1');
const nativeName =document.querySelector('.nativeName');
const population =document.querySelector('.population');
const region =document.querySelector('.region');
const subregion =document.querySelector('.subregion');
const capital =document.querySelector('.capital');
const topLevelDomain =document.querySelector('.topLevelDomain');
const currencies =document.querySelector('.currencies');
const language =document.querySelector('.language');
const borderCountry =document.querySelector('.country-detail-3');

const darkMode =document.querySelector('.darkMode')
const title =document.querySelector('.title a')
const searchSymbol =document.querySelector('#searchSymbol')
const sunImg =document.querySelector('#sunImg')


fetch(`https://restcountries.com/v3.1/name/${countryNameUrl}?fullText=true`)
.then((res) => res.json())
.then(([country]) => {
// console.log([country])
// console.log(country.currencies);
  flagContainer.src =country.flags.svg;
countryNameh1.innerText =country.name.common

if(country.name.nativeName){
   nativeName.innerText =(Object.values(country.name.nativeName)[0].common);
}
else{
     nativeName.innerText =country.name.common
}
population.innerText =country.population.toLocaleString('en-In')
 
region.innerText = country.region
subregion.innerText =(country.subregion)
// capital.innerText = country.capital
capital.innerText = country.capital?.join(', ') || 'N/A';
topLevelDomain.innerText = country.tld.join('  ,  ')
if(country.currencies){
  currencies.innerText =( Object.values(country.currencies).map((currency) => currency.name).join(' , '));
}

if(country.languages){
language.innerText = Object.values(country.languages).join(' , ')
}


if(country.borders){
    country.borders.forEach((borders) => {
  fetch(`https://restcountries.com/v3.1/alpha/${borders}`).
  then((res) => res.json()).
  then(([borderCountryData]) =>{
const borderCountryTag = document.createElement('a')

  borderCountryTag.innerText= borderCountryData.name.common
  borderCountryTag.href = `./country.html?name=${encodeURIComponent(borderCountryData.name.common)}`
  // borderCountryTag.href =`country.html?name=${borderCountryData.name.common}`
  // console.log(borderCountryTag);
 borderCountry.append(borderCountryTag)
  }
    );
})

}

        

})

const modeText = document.querySelector('.darkMode span');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');

    if (sunImg) {
        sunImg.classList.remove('fa-regular', 'fa-moon');
        sunImg.classList.add('fa-solid', 'fa-sun');
    }

    if (modeText) {
        modeText.innerText = 'Light Mode';
    }
}

darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');

        sunImg.classList.remove('fa-regular', 'fa-moon');
        sunImg.classList.add('fa-solid', 'fa-sun');

        modeText.innerText = 'Light Mode';
    } else {
        localStorage.setItem('theme', 'light');

        sunImg.classList.remove('fa-solid', 'fa-sun');
        sunImg.classList.add('fa-regular', 'fa-moon');

        modeText.innerText = 'Dark Mode';
    }
});
// darkMode.addEventListener('click', () => {
//     document.body.classList.toggle('dark');

//     if (document.body.classList.contains('dark')) {
//         sunImg.classList.replace('fa-moon', 'fa-sun');
//         sunImg.classList.replace('fa-regular', 'fa-solid');
//     } else {
//         sunImg.classList.replace('fa-sun', 'fa-moon');
//         sunImg.classList.replace('fa-solid', 'fa-regular');
//     }
// });
