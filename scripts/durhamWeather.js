
// variable declaration for both buttons and weather display
// stores elements from html into variables, making it easy to work with the elements in js 
const tempButton = document.getElementById("tempButton")
const conditionButton = document.getElementById("conditionButton")
const weatherDisplay = document.getElementById("weatherDisplay")


function showSpinner() {
    weatherDisplay.innerHTML = `<span class="spinner"></span> Loading...`
}

function setButtonsDisabled(disabled) {
    tempButton.disabled = disabled
    conditionButton.disabled = disabled
}


// gets temperature from open-mateo using API call | First Endpoint
// response is translated to json 
// just temperature is extracted from the json 
// temperature with text is stored into variable
function getTemperature() {

    showSpinner()
    setButtonsDisabled(true)

    fetch('https://api.open-meteo.com/v1/forecast?latitude=35.994&longitude=-78.8986&timezone=America%2FNew_York&forecast_days=1&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch&current=temperature_2m')
        .then(response => response.json())
        .then(data => {
            console.log(data)

            const temperature = data.current.temperature_2m
            weatherDisplay.textContent = `The current Temperature is: ${temperature} °F`
        })
        .catch(error => console.error(error))

        .finally(() => setButtonsDisabled(false))
}

// gets weather condition code from open-mateo using API call | Second Endpoint
// response is translated to json 
// just the weather condition code is extracted from the json 
// if/else with WMO Weather interpretation is used to translate the code into a weather condition
function getConditions() {

    showSpinner()
    setButtonsDisabled(true)


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

        .finally(() => setButtonsDisabled(false))
}

// handles interaction with buttons 
tempButton.addEventListener("click", getTemperature)
conditionButton.addEventListener("click", getConditions)