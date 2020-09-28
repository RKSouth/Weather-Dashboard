$(document).ready(function(search) {
  citiesSearched = [];
  
  
  //click the buttonn
       $("button").on("click", function(event) {
      var search = $("input").val();
      //it's pulling the array(full) and not the individual items from the array
        event.preventDefault();
      citiesSearched.push(search);
      getWeather();
        console.log(citiesSearched);
      addCities(search);


    });
  
  
  //adds cities to the list below the search button
    function addCities (search){
 // <div class="card-body">
// <h5 class="card-title">Card title</h5>
// </div>
//  <div class="card m-3" style="width: 18rem;">
// <div class="card m-3" id="card" style="width: 18rem;">

//create the card
var card =$("<div>").addClass("card m-3");
//add the card
$(".card-holder").append(card);

 var cardbody = $("<div>").addClass("card-body");
$(".card.m-3").append(cardbody);

  var city = $("<div>").addClass("card-title").text(search);
  $(".card-body").append(city);

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
  