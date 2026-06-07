 const countryContainer = document.querySelector('.country-container')


fetch('https://restcountries.com/v3.1/independent?status=true')
.then((res)=>res.json())
.then((data)=>{
   data.forEach((country)=>{
    // console.log([country.borders]);
  


    
        const countryCard = document.createElement('a');
        countryCard.href =`/country.html?name=${country.name.common}`;
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
    })
})

console.log(countryContainer);