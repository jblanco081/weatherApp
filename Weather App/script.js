document.getElementById('getWeather').addEventListener('click', function() {
    const location = document.getElementById('location').value.trim();

    // Input validation
    if (location === '') {
        document.getElementById('weatherResult').innerHTML = '<p>Please enter a location.</p>';
        return;
    }

    // Fetch weather data from OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a0ed678ffd72a46223743372efa55ce4&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the API response for debugging

            // Check if the location is valid
            if (data.cod === 200) {
                const weather = `
                    <h2>${data.name}</h2>
                    <p class="weather-info">${data.weather[0].description}</p>
                    <p class="weather-info">Temperature: ${data.main.temp} °C</p>
                    <p class="weather-info">Humidity: ${data.main.humidity}%</p>
                    <p class="weather-info">Wind Speed: ${data.wind.speed} m/s</p>
                `;
                document.getElementById('weatherResult').innerHTML = weather;
            } else {
                document.getElementById('weatherResult').innerHTML = `<p>Location not found: ${data.message}</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('weatherResult').innerHTML = '<p>There was an error retrieving the weather data. Please try again later.</p>';
        });
});
