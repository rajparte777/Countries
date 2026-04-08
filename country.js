const countryNameUrl = new URLSearchParams(window.location.search).get('name');
const sizeBox =document.querySelector('.size-box');


fetch(`https://restcountries.com/v3.1/name/${countryNameUrl}?fullText=true`)
.then((res) => res.json())
.then((data) => {
    console.log(data[0]);
   

   sizeBox.innerHTML =`
    <div class="back-button">
         <button ><i class="fa-solid fa-arrow-left"></i>&nbsp;Back</button>
      </div>
       <section>
       <div class="counnrty-container">
         <div class="imgCountainer">
               <img src="https://flagcdn.com/ck.svg", alt="">
       </div>
       <div class="country-detail-1">
        <h2>`${country.name.common}`</h2>
        <p><b>Native Name :</b></p>
        <p><b>Population :</b></p>
        <p><b>Region :</b></p>
        <p><b>Sub Region :</b></p>
        <p><b>Capital :</b></p>
       </div>
     <div class="country-detail-2">
         <p><b>Top Level Domain :</b></p>
        <p><b>Currencies :</b></p>
        <p><b>Language :</b></p>
     </div>
    
       </div>
       <div class="country-detail-3">
          <p><b>Border Countries :</b></p>
          <span><button>France</button>
        <button>German</button>
    <button>netharland</button></span>
       </div>
       
       </section>`

        
})