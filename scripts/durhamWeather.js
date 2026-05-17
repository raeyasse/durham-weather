const tempButton = document.getElementById("tempButton")
const conditionButton = document.getElementById("conditionButton")


function getTemperature() {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=35.994&longitude=-78.8986&timezone=America%2FNew_York&forecast_days=1&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch&current=temperature_2m')
        .then(response => response.json())
        .then(data => {
            console.log(data)

            const temperature = data.current.temperature_2m
            weatherDisplay.textContent = `The current Temperature is: ${temperature}`
        })
        .catch(error => console.error(error))
}


function getConditions() {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=35.994&longitude=-78.8986&timezone=America%2FNew_York&forecast_days=1&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch&current=weather_code')
        .then(response => response.json())
        .then(data => {
            const weatherCode = data.current.weather_code

            let conditionText = ""
            if (weatherCode == 0) {
                conditionText = "Sunny ☀️"
            } else if (weatherCode >= 1 && weatherCode <= 3) {
                conditionText = "Partly Cloudy ⛅"
            }
            else if (weatherCode >= 61 && weatherCode <= 65) {
                conditionText = "Rainy 🌧️"
            } else {
                conditionText = `Cloudy or Unspecified (Code: ${weatherCode}) ☁️`
            }


            weatherDisplay.textContent = `The current condition is: ${conditionText}`
        })
        .catch(error => console.error(error))
}


tempButton.addEventListener("click", getTemperature)
conditionButton.addEventListener("click", getConditions)