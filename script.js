// Get elements from the page
var temperatureInput = document.getElementById("temperatureInput");
var unitSelect = document.getElementById("unitSelect");
var clearBtn = document.getElementById("clearBtn");
var errorMessage = document.getElementById("errorMessage");
var celsiusResult = document.getElementById("celsiusResult");
var fahrenheitResult = document.getElementById("fahrenheitResult");
var kelvinResult = document.getElementById("kelvinResult");

// Conversion functions
function celsiusToFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function celsiusToKelvin(celsius) {
  return celsius + 273.15;
}

function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function kelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}

// Helper function to format numbers
function formatNumber(value) {
  return Number(value.toFixed(2));
}

// Reset result display
function resetResults() {
  celsiusResult.textContent = "-- \u00B0C";
  fahrenheitResult.textContent = "-- \u00B0F";
  kelvinResult.textContent = "-- K";
}

// Show error message and clear results
function showError(message) {
  errorMessage.textContent = message;
  resetResults();
}

// Clear input, results, and error message
function clearConverter() {
  temperatureInput.value = "";
  unitSelect.value = "celsius";
  errorMessage.textContent = "";
  resetResults();
}

// Convert and display temperature values
function convertTemperature() {
  var inputValue = temperatureInput.value.trim();
  var selectedUnit = unitSelect.value;

  // Check for empty input
  if (inputValue === "") {
    errorMessage.textContent = "";
    resetResults();
    return;
  }

  var temperature = Number(inputValue);

  // Validate numeric input
  if (isNaN(temperature)) {
    showError("Please enter a valid number.");
    return;
  }

  // Check for physically invalid temperatures below absolute zero
  if (selectedUnit === "celsius" && temperature < -273.15) {
    showError("Celsius cannot be below -273.15\u00B0C (absolute zero).");
    return;
  }

  if (selectedUnit === "fahrenheit" && temperature < -459.67) {
    showError("Fahrenheit cannot be below -459.67\u00B0F (absolute zero).");
    return;
  }

  if (selectedUnit === "kelvin" && temperature < 0) {
    showError("Kelvin cannot be below 0 K (absolute zero).");
    return;
  }

  // Clear any previous error
  errorMessage.textContent = "";

  var celsiusValue;
  var fahrenheitValue;
  var kelvinValue;

  // Convert input to Celsius first, then calculate other units
  if (selectedUnit === "celsius") {
    celsiusValue = temperature;
  } else if (selectedUnit === "fahrenheit") {
    celsiusValue = fahrenheitToCelsius(temperature);
  } else {
    celsiusValue = kelvinToCelsius(temperature);
  }

  fahrenheitValue = celsiusToFahrenheit(celsiusValue);
  kelvinValue = celsiusToKelvin(celsiusValue);

  // Display results
  celsiusResult.textContent = formatNumber(celsiusValue) + " \u00B0C";
  fahrenheitResult.textContent = formatNumber(fahrenheitValue) + " \u00B0F";
  kelvinResult.textContent = formatNumber(kelvinValue) + " K";
}

// Event listeners for live conversion
temperatureInput.addEventListener("input", convertTemperature);
unitSelect.addEventListener("change", convertTemperature);
clearBtn.addEventListener("click", clearConverter);
