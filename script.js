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
  
    // Obtain all searches from local storage
    var allHistory = JSON.parse(localStorage.getItem("history")) || [];
  
    // Initializes the history feature to be able to identify all elements greater than or equal to 0
    if (allHistory.length > 0) {
      currentWeather(allHistory[allHistory.length - 1]);
    }
    // Adds new row dynamically for each element in the history array
    for (var i = 0; i < allHistory.length; i++) {
      createRow(allHistory[i]);
    }
  
    //puts the searched cities underneath the previous searched city 
    function createRow(text) {
      var listItem = document.createElement("li");
      listItem.classList.add("list-group-item");
      listItem.textContent = text;
      viewHistory.appendChild(listItem);
    }
  
    //listener for list item on click function
    viewHistory.addEventListener("click", function (event) {
      if(event.target.tagName === "LI") {
        currentWeather(event.target.textContent);
        predictedForecast(event.target.textContent);
      }
    });

  
  });