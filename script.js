$(document).ready(function(search) {
  
  
  citiesArray = [];
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
  
  
      var title =$("<h1>").text(response.main.name);
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
  