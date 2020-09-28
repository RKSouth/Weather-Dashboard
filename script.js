$(document).ready(function(search) {
citiesSearched = [];
     $("button").on("click", function() {
    var search = $("input").val();

    citiesSearched.push(search);
    getWeather();
      console.log(citiesSearched);
    addCities(search);
  });
function addCities (search){
var city = $("<div>").addClass("City-searched").text(search);
$("aside").append(city);
localStorage.setItem("search",citiesSearched);
} 
function getWeather (search){
  
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + search+ "&apikey=a93d83dd9db408417f860cd27c651c1b";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) { });
  $("#today").append();
  $("#forcast").append();
}
   
getWeather();
});



