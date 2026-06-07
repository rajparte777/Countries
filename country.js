const countryNameUrl = new URLSearchParams(window.location.search).get('name');
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


fetch(`https://restcountries.com/v3.1/name/${countryNameUrl}?fullText=true`)
.then((res) => res.json())
.then(([country]) => {
// console.log([country])
console.log(country.currencies);
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
capital.innerText = country.capital
topLevelDomain.innerText = country.tld.join('  ,  ')
if(country.currencies){
  currencies.innerText =( Object.values(country.currencies).map((currency) => currency.name).join(' , '));
}

if(country.languages){
language.innerText = Object.values(country.languages).join(' , ')

}






  //  sizeBox.innerHTML =`
   
  //      <section>
  //      <div class="counnrty-container">
  //        <div class="imgCountainer">
  //              <img src="https://flagcdn.com/ck.svg", alt="">
  //      </div>
  //      <div class="country-detail-1">
  //       <h2>${country.name.common}</h2>
  //       <p><b>Native Name :</b></p>
  //       <p><b>Population :</b></p>
  //       <p><b>Region :</b></p>
  //       <p><b>Sub Region :</b></p>
  //       <p><b>Capital :</b></p>
  //      </div>
  //    <div class="country-detail-2">
  //        <p><b>Top Level Domain :</b></p>
  //       <p><b>Currencies :</b></p>
  //       <p><b>Language :</b></p>
  //    </div>
    
  //      </div>
  //      <div class="country-detail-3">
  //         <p><b>Border Countries :</b></p>
  //         <span><button>France</button>
  //       <button>German</button>
  //   <button>netharland</button></span>
  //      </div>
       
  //      </section>`

        
})