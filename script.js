$(document).ready(function(search) {
  
  
  citiesArray = ["Olympia"];
  if (JSON.parse(localStorage.getItem("search")) != null){
    citiesArray=JSON.parse(localStorage.getItem("search"));
  }
  citiesArray.forEach( element => {  
var button =$("<button>").addClass("btn btn-primary btn-lg btn-block").text(element);
//add the card
$(".card-holder").append(button);

  });
  
  
  //click the buttonn
       $("#submitbtn").on("click", function(event) {
      var search = $("input").val();
      //it's pulling the array(full) and not the individual items from the array
        event.preventDefault();
      citiesArray.push(search);
      getWeather(search);
      getForecast(search);
        console.log(citiesArray);
       addCities(search);

      localStorage.removeItem("search");
      localStorage.setItem("search",JSON.stringify(citiesArray));
      // citiesList =  JSON.parse(localStorage.getItem("search"));
      //   console.log(citiesList);

    });
  
  
  //adds cities to the list below the search button
    function addCities (){


//create the card
var button =$("<button>").addClass("btn btn-primary btn-lg btn-block").text(citiesArray[citiesArray.length-1]);
//add the card
$(".card-holder").append(button);

// var citiesList =  JSON.parse(localStorage.getItem("search"));
localStorage.removeItem("search");
localStorage.setItem("search",JSON.stringify(citiesArray));

  };
  
  //gets the weather from openweathermap
  function getWeather (search){
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=48cb01e208735d9aa940904774b4bdab&q="+ search;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) { 
      
      console.log(response);
      console.log(queryURL);
  
  $("#today").empty();


      var title =$("<h1>").text(response.name + " " +presentMonth + "/" + presentDay + "/" + presentYear);
      $(".city").append(title);

      var temperature = $("<p>").text("Temperature: " + response.main.temp);
      $(".city").append(temperature);
      var humidity = $("<p>").text("Humidity: " + response.main.humidity);
      $(".city").append(humidity);
      var windspd = $("<p>").text("Wind Spead: " + response.wind.speed);
      $(".city").append(windspd);
    });
    $("#today").append();
  
  }
  let updateTime = function () {
    presentMonth = moment().format('M');
    presentDay = moment().format('DD');
    presentYear = moment().format('YY');

}
updateTime();

setInterval(updateTime, 60000);

$("#date-my").text(moment().format());

moment().format('MMMM Do YYYY, h:mm:ss a'); 


function getForecast (search){
    
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=48cb01e208735d9aa940904774b4bdab&q="+ search;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) { 
    
    console.log(response);
    console.log(queryURL);
    // date= presentMonth + "/" + presentDay + "/" + presentYear
    $("#forecast").empty();
    var title =$("<h1>").text("5 Day Forecast");
    $(".forecast").append(title);
    
for (i=0; i<response.list.length-1; i++) {
 
  var cardTitle =$("<h4>").text(new Date(response.list[i].dt_txt).toLocaleDateString())
 $(".forecast").append(cardTitle);

}

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
  // $("button").on("click", function(event) {
  //   var search = $("input").val();
  //   //it's pulling the array(full) and not the individual items from the array
  //     event.preventDefault();
  //   citiesSearched.push(search);
  //   getWeather(search);
  //     console.log(citiesSearched);
  //   addCities(search);


  // });
  });
  