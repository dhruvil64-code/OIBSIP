/* =========================================
   1. GET HTML ELEMENTS
========================================= */

const converterForm = document.getElementById("converterForm");

const temperatureInput = document.getElementById("temperature");

const inputUnit = document.getElementById("inputUnit");

const errorMessage = document.getElementById("errorMessage");

const celsiusResult = document.getElementById("celsiusResult");

const fahrenheitResult = document.getElementById("fahrenheitResult");

const kelvinResult = document.getElementById("kelvinResult");

const menuBtn = document.getElementById("menuBtn");

const navMenu = document.querySelector(".nav-menu");


/* =========================================
   2. MOBILE MENU
========================================= */

menuBtn.addEventListener("click", function () {

    navMenu.classList.toggle("active");

});


/* Close mobile menu when a link is clicked */

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navMenu.classList.remove("active");

    });

});


/* =========================================
   3. GET MINIMUM ALLOWED TEMPERATURE
========================================= */

function getMinimumTemperature(unit) {

    if (unit === "celsius") {

        return -273.15;

    }

    if (unit === "fahrenheit") {

        return -459.67;

    }

    if (unit === "kelvin") {

        return 0;

    }

}


/* =========================================
   4. VALIDATE TEMPERATURE
========================================= */

function validateTemperature() {

    const value = temperatureInput.value.trim();

    const unit = inputUnit.value;


    /* Empty input */

    if (value === "") {

        showError("Please enter a temperature.");

        return false;

    }


    /* Convert input into number */

    const temperature = Number(value);


    /* Non-numeric input */

    if (!Number.isFinite(temperature)) {

        showError("Please enter a valid temperature.");

        return false;

    }


    /* Absolute zero validation */

    const minimumTemperature = getMinimumTemperature(unit);

    if (temperature < minimumTemperature) {

        showError(
            `Temperature cannot be below absolute zero (${minimumTemperature}°).`
        );

        return false;

    }


    /* Valid input */

    clearError();

    return true;

}


/* =========================================
   5. SHOW ERROR
========================================= */

function showError(message) {

    errorMessage.textContent = message;

    temperatureInput.style.borderColor = "#d64545";

}


/* =========================================
   6. CLEAR ERROR
========================================= */

function clearError() {

    errorMessage.textContent = "";

    temperatureInput.style.borderColor = "";

}


/* =========================================
   7. CONVERT TEMPERATURE
========================================= */

function convertTemperature() {

    const temperature = Number(temperatureInput.value);

    const unit = inputUnit.value;

    let celsius;

    let fahrenheit;

    let kelvin;


    /* =====================================
       Celsius Input
    ===================================== */

    if (unit === "celsius") {

        celsius = temperature;

        fahrenheit = (temperature * 9 / 5) + 32;

        kelvin = temperature + 273.15;

    }


    /* =====================================
       Fahrenheit Input
    ===================================== */

    else if (unit === "fahrenheit") {

        fahrenheit = temperature;

        celsius = (temperature - 32) * 5 / 9;

        kelvin = (temperature - 32) * 5 / 9 + 273.15;

    }


    /* =====================================
       Kelvin Input
    ===================================== */

    else if (unit === "kelvin") {

        kelvin = temperature;

        celsius = temperature - 273.15;

        fahrenheit = (temperature - 273.15) * 9 / 5 + 32;

    }


    /* =====================================
       DISPLAY RESULTS
    ===================================== */

    celsiusResult.textContent =
        `${formatNumber(celsius)} °C`;

    fahrenheitResult.textContent =
        `${formatNumber(fahrenheit)} °F`;

    kelvinResult.textContent =
        `${formatNumber(kelvin)} K`;


    /* Add result animation */

    animateResults();

}


/* =========================================
   8. FORMAT NUMBERS
========================================= */

function formatNumber(number) {

    return Number(number.toFixed(2));

}


/* =========================================
   9. RESULT ANIMATION
========================================= */

function animateResults() {

    const resultCards =
        document.querySelectorAll(".result-card");


    resultCards.forEach(function (card, index) {

        card.style.animation = "none";

        void card.offsetWidth;

        card.style.animation =
            `cardAppear 0.5s ease ${index * 0.1}s forwards`;

    });

}


/* =========================================
   10. FORM SUBMIT
========================================= */

converterForm.addEventListener("submit", function (event) {

    /* Stop page reload */

    event.preventDefault();


    /* Check validation */

    const isValid = validateTemperature();


    if (!isValid) {

        return;

    }


    /* Perform conversion */

    convertTemperature();

});


/* =========================================
   11. REAL-TIME VALIDATION
========================================= */

temperatureInput.addEventListener("input", function () {

    validateTemperature();

});


/* =========================================
   12. VALIDATE WHEN UNIT CHANGES
========================================= */

inputUnit.addEventListener("change", function () {

    if (temperatureInput.value.trim() !== "") {

        validateTemperature();

    }

});