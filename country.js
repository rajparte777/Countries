const countryNameUrl = new URLSearchParams(window.location.search).get('name');

fetch(`https://restcountries.com/v3.1/name/${countryNameUrl}?fullText=true`)
.then((res) => res.json())
.then((data) => {
    console.log(data[0]);
})