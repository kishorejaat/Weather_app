const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');

const apiKey = 'YOUR_API_KEY'; // API key which u'll have to generate one for yourself;
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather'; // url of the server from which u want to pull out info;

// search button click action
searchBtn.addEventListener('click', () => {
    const cityName = cityInput.value.trim();
    if (cityName) {
        getWeatherData(cityName);
    } else {
        alert('Please enter a city name');
    }
});

// Function to fetch weather data from API
async function getWeatherData(city) {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Weather data not found. Please try again.');
    }
}

// Function to display weather data ;
function displayWeatherData(data) {
    const { name, main, weather } = data;
    const weatherDescription = weather[0].description;
    const temperature = main.temp;
    const humidity = main.humidity;

    weatherInfo.innerHTML = `
        <h3>${name}</h3>
        <p>Temperature: ${temperature} &#8451;</p>
        <p>Weather: ${weatherDescription}</p>
        <p>Humidity: ${humidity}%</p>
    `;
}
