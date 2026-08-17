const countryNameUrl = decodeURIComponent(new URLSearchParams(window.location.search).get('name') || '');
const flagContainer = document.querySelector('.imgCountainer img');
const countryNameh1 = document.querySelector('.country-detail-1 h1');
const nativeName = document.querySelector('.nativeName');
const population = document.querySelector('.population');
const region = document.querySelector('.region');
const subregion = document.querySelector('.subregion');
const capital = document.querySelector('.capital');
const topLevelDomain = document.querySelector('.topLevelDomain');
const currencies = document.querySelector('.currencies');
const language = document.querySelector('.language');
const borderCountry = document.querySelector('.country-detail-3');

const darkMode = document.querySelector('.darkMode');
const sunImg = document.querySelector('#sunImg');
const modeText = document.querySelector('.darkMode span');

async function fetchAllCountries() {
    try {
        const res = await fetch('./data.json');
        if (!res.ok) throw new Error(`HTTP status: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.warn('Local data.json fetch failed, trying fallback CDN...', err);
        try {
            const res = await fetch('https://cdn.jsdelivr.net/gh/mledoze/countries@master/countries.json');
            return await res.json();
        } catch (cdnErr) {
            console.error('Failed to load country data:', cdnErr);
            return [];
        }
    }
}

async function loadCountryDetail() {
    if (!countryNameUrl || countryNameUrl === 'null' || countryNameUrl === 'undefined') {
        if (countryNameh1) countryNameh1.innerText = 'No country specified';
        return;
    }

    const countries = await fetchAllCountries();
    if (!countries || countries.length === 0) {
        if (countryNameh1) countryNameh1.innerText = 'Failed to load country data';
        return;
    }

    // Find country by common name, official name, alpha codes
    const country = countries.find((c) => {
        const commonName = typeof c.name === 'string' ? c.name : c.name?.common;
        const officialName = typeof c.name === 'string' ? c.name : c.name?.official;
        const code3 = c.alpha3Code || c.cca3;
        const code2 = c.alpha2Code || c.cca2;
        const query = countryNameUrl.trim().toLowerCase();

        return (
            commonName?.toLowerCase() === query ||
            officialName?.toLowerCase() === query ||
            code3?.toLowerCase() === query ||
            code2?.toLowerCase() === query
        );
    });

    if (!country) {
        if (countryNameh1) countryNameh1.innerText = 'Country not found';
        return;
    }

    // 1. Flag
    const flagSrc = country.flags?.svg || country.flags?.png || (country.cca2 ? `https://flagcdn.com/${country.cca2.toLowerCase()}.svg` : country.flag);
    if (flagContainer) {
        flagContainer.src = flagSrc || '';
        flagContainer.alt = `${typeof country.name === 'string' ? country.name : country.name?.common} flag`;
    }

    // 2. Name
    const cName = typeof country.name === 'string' ? country.name : (country.name?.common || '');
    if (countryNameh1) countryNameh1.innerText = cName;

    // 3. Native Name
    let natName = '';
    if (country.nativeName) {
        natName = country.nativeName;
    } else if (country.name?.nativeName) {
        natName = Object.values(country.name.nativeName)[0]?.common || Object.values(country.name.nativeName)[0]?.official;
    } else if (country.name?.native) {
        natName = Object.values(country.name.native)[0]?.common || Object.values(country.name.native)[0]?.official;
    }
    if (nativeName) nativeName.innerText = natName || cName || 'N/A';

    // 4. Population
    if (population) population.innerText = country.population != null ? country.population.toLocaleString('en-IN') : 'N/A';

    // 5. Region
    if (region) region.innerText = country.region || 'N/A';

    // 6. Subregion
    if (subregion) subregion.innerText = country.subregion || 'N/A';

    // 7. Capital
    const cap = Array.isArray(country.capital) ? country.capital.join(', ') : (country.capital || 'N/A');
    if (capital) capital.innerText = cap;

    // 8. Top Level Domain
    const tld = Array.isArray(country.topLevelDomain)
        ? country.topLevelDomain.join(', ')
        : Array.isArray(country.tld)
        ? country.tld.join(', ')
        : (country.topLevelDomain || country.tld || 'N/A');
    if (topLevelDomain) topLevelDomain.innerText = tld;

    // 9. Currencies
    let curStr = 'N/A';
    if (Array.isArray(country.currencies)) {
        curStr = country.currencies.map((c) => c.name).filter(Boolean).join(', ') || 'N/A';
    } else if (country.currencies && typeof country.currencies === 'object') {
        curStr = Object.values(country.currencies).map((c) => c.name).filter(Boolean).join(', ') || 'N/A';
    }
    if (currencies) currencies.innerText = curStr;

    // 10. Languages
    let langStr = 'N/A';
    if (Array.isArray(country.languages)) {
        langStr = country.languages.map((l) => l.name).filter(Boolean).join(', ') || 'N/A';
    } else if (country.languages && typeof country.languages === 'object') {
        langStr = Object.values(country.languages).join(', ') || 'N/A';
    }
    if (language) language.innerText = langStr;

    // 11. Border Countries
    if (borderCountry) {
        borderCountry.innerHTML = '<p><b>Border Countries :&nbsp;</b></p>';
        if (country.borders && country.borders.length > 0) {
            country.borders.forEach((borderCode) => {
                const borderObj = countries.find(
                    (c) => (c.alpha3Code || c.cca3) === borderCode || (c.alpha2Code || c.cca2) === borderCode
                );
                const borderCountryName = borderObj
                    ? (typeof borderObj.name === 'string' ? borderObj.name : borderObj.name?.common)
                    : borderCode;

                const borderCountryTag = document.createElement('a');
                borderCountryTag.innerText = borderCountryName;
                borderCountryTag.href = `./country.html?name=${encodeURIComponent(borderCountryName)}`;
                borderCountry.append(borderCountryTag);
            });
        } else {
            const noBorders = document.createElement('span');
            noBorders.innerText = 'None';
            borderCountry.append(noBorders);
        }
    }
}

loadCountryDetail();

// Dark mode
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

if (darkMode) {
    darkMode.addEventListener('click', () => {
        document.body.classList.toggle('dark');

        if (document.body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');

            if (sunImg) {
                sunImg.classList.remove('fa-regular', 'fa-moon');
                sunImg.classList.add('fa-solid', 'fa-sun');
            }

            if (modeText) modeText.innerText = 'Light Mode';
        } else {
            localStorage.setItem('theme', 'light');

            if (sunImg) {
                sunImg.classList.remove('fa-solid', 'fa-sun');
                sunImg.classList.add('fa-regular', 'fa-moon');
            }

            if (modeText) modeText.innerText = 'Dark Mode';
        }
    });
}
