var viewWeather = document.getElementById("search-button");
var currentDay = document.getElementById("today");
var currentForecast = document.getElementById("forecast");
var viewHistory = document.querySelector(".history");

$(document).ready(function () {
    // View weather button function first checks if user has clicked on button
    viewWeather.addEventListener("click", function () {
      // Variable used the value inputted in the text field
      var inputUsed = $("#search-value").val();
      // Clear the text field after clicking submit
      $("#search-value").val("");
      currentWeather(inputUsed);
      predictedForecast(inputUsed);
    });
  
    // View weather button function used the value identified to be used as a key
    viewWeather.addEventListener("keypress", function (event) {
      var newKey = (event.keyCode ? event.keyCode : event.which);
      if (newKey === 13) {
        currentWeather(inputUsed);
        predictedForecast(inputUsed);
      }
    });
  });