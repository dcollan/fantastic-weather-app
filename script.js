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
  
    // View weather button function uses the value entered as a key
    viewWeather.addEventListener("keypress", function (event) {
      var newKey = (event.keyCode ? event.keyCode : event.which);
      if (newKey === 13) {
        currentWeather(inputUsed);
        predictedForecast(inputUsed);
      }
    });
  
    // Obtain all searches from local storage
    var allHistory = JSON.parse(localStorage.getItem("history")) || [];
  
    // Initializes the history function to be able to identify all elements greater than or equal to 0
    if (allHistory.length > 0) {
      currentWeather(allHistory[allHistory.length - 1]);
    }
    // Adds new row dynamically for each element in the history array
    for (var i = 0; i < allHistory.length; i++) {
      createRow(allHistory[i]);
    }
  
    // In sequential order, every new search is placed below the city searched previously 
    function createRow(text) {
      var listItem = document.createElement("li");
      listItem.classList.add("list-group-item");
      listItem.textContent = text;
      viewHistory.appendChild(listItem);
    }
  
    // If one of the items from the list is clicked, weather and forecast will be displayed
    viewHistory.addEventListener("click", function (event) {
      if(event.target.tagName === "LI") {
        currentWeather(event.target.textContent);
        predictedForecast(event.target.textContent);
      }
    });
  
    function currentWeather(inputUsed) {
  
      // AJAX method utilizes API key from weather website
      $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + inputUsed + "&appid=f710269771dbeed9b9555cbea85a6715"
  
  
      }).then(function (data) {
        // If statement determines if value entered does not exist in the API
        if (allHistory.indexOf(inputUsed) === -1) {
          // Brings the entered valued in the array inside of history
          allHistory.push(inputUsed);
          // Saves the entered item into local storage
          localStorage.setItem("history", JSON.stringify(allHistory));
          createRow(inputUsed);
        }
        // While loop removes all previous content on screen once user chooses a different city
        while (currentDay.firstChild) {
          currentDay.removeChild(currentDay.firstChild);
        }

        //For the following: Creates elements dynamically for the forecast per city upon search or click
  
        // Create title element
        var addTitle = document.createElement("h3");
        addTitle.classList.add("card-title");
        addTitle.textContent = data.name + " (" + new Date().toLocaleDateString() + ")";

        // Create icon element
        var addIcon = document.createElement("img");
        addIcon.setAttribute("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
  
        // Create card element
        var addCard = document.createElement("div");
        addCard.classList.add("card");

        // Create card's body
        var addCardBody = document.createElement("div");
        addCardBody.classList.add("card-body");

        // Create temperature display
        var addTemperature = document.createElement("p");
        addTemperature.classList.add("card-text");
        addTemperature.textContent = "Temperature: " + data.main.temp + " K";

        // Create humidity display
        var addHumidity = document.createElement("p");
        addHumidity.classList.add("card-text");
        addHumidity.textContent = "Humidity: " + data.main.humidity + " %";

        // Create wind display
        var addWind = document.createElement("p");
        addWind.classList.add("card-text");
        addWind.textContent = "Wind Speed: " + data.wind.speed + " MPH";

        // Console log everything
        console.log(data);
     
  
        // For the following: obtain definitions and parse together to be included in card
        addTitle.appendChild(addIcon);

        // Add to Card Body
        addCardBody.appendChild(addTitle);
        addCardBody.appendChild(addTemperature);
        addCardBody.appendChild(addHumidity);
        addCardBody.appendChild(addWind);

        //Add Card Body to Card
        addCard.appendChild(addCardBody);
        currentDay.appendChild(addCard);
        console.log(data);
      });
    }
  });