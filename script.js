$(document).ready(function(search) {
citiesSearched = [];


//click the buttonn
     $("button").on("click", function() {
    var search = $("input").val();

    citiesSearched.push(search);
    getWeather();
      console.log(citiesSearched);
    addCities(search);
  });


//adds cities to the list below the search button
  function addCities (search){
var city = $("<div>").addClass("City-searched").text(search);
$("aside").append(city);
localStorage.setItem("search",citiesSearched);
} 

//gets the weather from openweathermap
function getWeather (search){
  
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=48cb01e208735d9aa940904774b4bdabq="+ search;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) { 
    
    console.log(response);
    console.log(queryURL);


    var title =$("<h1>").text(response.name);
    $("#city").append(title);
  });
  $("#today").append();
  $("#forcast").append();
}

//"main.dt_txt" is date
//need temp
//need humidty
//need uv index
//need wind speed
//need weather: main attached to image if statements!
//Loop through the forecast list array and display a single forecast entry/time (5th entry of each day which is close to the highest temp/time of the day) from each of the 5 days

getWeather();
});



