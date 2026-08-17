 const countryContainer = document.querySelector('.country-container');
const filterByRegion = document.querySelector('.filter-by-region');
const search = document.querySelector('.search input');
const darkMode = document.querySelector('.darkMode');
const sunImg = document.querySelector('#sunImg');
const mode = document.querySelector('.mode');

let allCountriesData = [];

// Fetch data from local data.json with fallback to CDN
async function fetchCountries() {
    try {
        const res = await fetch('./data.json');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.warn('Could not load local data.json, attempting fallback CDN...', error);
        try {
            const res = await fetch('https://cdn.jsdelivr.net/gh/mledoze/countries@master/countries.json');
            const data = await res.json();
            return data;
        } catch (fallbackError) {
            console.error('Failed to load countries data:', fallbackError);
            countryContainer.innerHTML = '<p style="margin: 20px; font-size: 18px; color: red;">Failed to load country data. Please run via a local server (e.g. Live Server).</p>';
            return [];
        }
    }
}

function renderCountriesData(data) {
    countryContainer.innerHTML = '';
    if (!data || data.length === 0) {
        countryContainer.innerHTML = '<p style="margin: 20px; font-size: 18px;">No countries found.</p>';
        return;
    }

    data.forEach((country) => {
        const countryName = typeof country.name === 'string' ? country.name : (country.name?.common || 'Unknown');
        const countryCard = document.createElement('a');
        countryCard.href = `./country.html?name=${encodeURIComponent(countryName)}`;
        countryCard.classList.add('card');

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image');
        const image = document.createElement('img');
        const flagSrc = country.flags?.svg || country.flags?.png || (country.cca2 ? `https://flagcdn.com/${country.cca2.toLowerCase()}.svg` : country.flag);
        image.src = flagSrc || '';
        image.alt = `${countryName} flag`;
        imageContainer.append(image);
        countryCard.append(imageContainer);

        const title = document.createElement('div');
        title.classList.add('data-country');
        const header = document.createElement('h2');
        header.innerText = countryName;
        title.append(header);

        const p1 = document.createElement('p');
        p1.innerHTML = `<strong>Population :</strong> ${country.population != null ? country.population.toLocaleString('en-IN') : 'N/A'}`;

        const p2 = document.createElement('p');
        p2.innerHTML = `<strong>Region :</strong> ${country.region || 'N/A'}`;

        const p3 = document.createElement('p');
        const capitalText = Array.isArray(country.capital) ? country.capital.join(', ') : (country.capital || 'N/A');
        p3.innerHTML = `<strong>Capital :</strong> ${capitalText}`;

        title.append(p1, p2, p3);
        countryCard.append(title);
        countryContainer.append(countryCard);
    });
}

// Initial fetch
fetchCountries().then((data) => {
    allCountriesData = data;
    renderCountriesData(allCountriesData);
});

// Filter by Region
if (filterByRegion) {
    filterByRegion.addEventListener('change', () => {
        if (!allCountriesData || allCountriesData.length === 0) return;
        const selectedRegion = filterByRegion.value;

        if (!selectedRegion || selectedRegion === 'All' || selectedRegion === 'Filter by Region') {
            renderCountriesData(allCountriesData);
            return;
        }

        const filtered = allCountriesData.filter((country) => {
            const region = country.region || '';
            if (selectedRegion === 'America' || selectedRegion === 'Americas') {
                return region === 'Americas' || region === 'America';
            }
            if (selectedRegion === 'Oceania' || selectedRegion === 'Oceanic') {
                return region === 'Oceania' || region === 'Oceanic';
            }
            return region.toLowerCase() === selectedRegion.toLowerCase();
        });

        renderCountriesData(filtered);
    });
}

// Search input
if (search) {
    search.addEventListener('input', (e) => {
        if (!allCountriesData || allCountriesData.length === 0) return;
        const query = e.target.value.toLowerCase().trim();
        const filterCountries = allCountriesData.filter((country) => {
            const name = typeof country.name === 'string' ? country.name : (country.name?.common || '');
            return name.toLowerCase().includes(query);
        });
        renderCountriesData(filterCountries);
    });
}

// Dark Mode
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    if (sunImg) {
        sunImg.classList.remove('fa-regular', 'fa-moon');
        sunImg.classList.add('fa-solid', 'fa-sun');
    }
    if (mode) {
        mode.innerText = 'Light Mode';
    }
}

if (darkMode) {
    darkMode.addEventListener('click', () => {
        document.body.classList.toggle('dark');

        if (document.body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            if (sunImg) {
                sunImg.classList.remove('fa-regular', 'fa-moon');
                sunImg.classList.add('fa-solid', 'fa-sun');
            }
            if (mode) mode.innerText = 'Light Mode';
        } else {
            localStorage.setItem('theme', 'light');
            if (sunImg) {
                sunImg.classList.remove('fa-solid', 'fa-sun');
                sunImg.classList.add('fa-regular', 'fa-moon');
            }
            if (mode) mode.innerText = 'Dark Mode';
        }
    });
}




   

