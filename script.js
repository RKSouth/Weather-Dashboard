$(document).ready(function(search) {
  
  //getting the array and stuff from local storage upon reload
  citiesArray = [];

  if (JSON.parse(localStorage.getItem("search")) != null){
    citiesArray=JSON.parse(localStorage.getItem("search"));//get searches value
   
  }

  //add a button to each item in the array
 
var button =$("<button>").addClass("btn btn-primary btn-lg btn-block").text(citiesArray[citiesArray.length -1]);
//add the card
$(".card-holder").append(button);
 getForecast(citiesArray[citiesArray.length -1]);
  getWeather(citiesArray[citiesArray.length -1]);

  

 
  $(".card-holder").on("click", "button", function() {
    getWeather($(this).text());
    // getUVIndex($(this).text());
    getForecast($(this).text()); //not just text
  });
  
  //click the submit buttonn
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
    

    });
    // var lat;
    // var lon;
  //click the cities button
  function getUVIndex (lat,lon){

    //maybe not pass lat and lon in and out of function, maybe write the entire thing in here instead
    console.log(lat);
    console.log(lon);
    // var lat;
    // var lon;
    var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=48cb01e208735d9aa940904774b4bdab&lat=" + lat + "&lon=" + lon;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) { 
    
      var uv = $("<p>").text("UV Index: "+ response.value);
      $(".city").append(uv);
    
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~HOW TO ADD COLOR???
      if(response.value<=1){
        //green
        uv.addClass("uv1");
      }else if(response.value<= 2) {
       //lightgreen
       uv.addClass("uv2");
      }else if(response.value <= 3){
        //yellow
        uv.addClass("uv3");
      }else if(response.value <= 4){
       //yellow orange
       uv.addClass("uv4");
      }else if(response.value <= 5){
        // orange
        uv.addClass("uv5");
      }else if(response.value <= 6){
        // red orange
        uv.addClass("uv6");
      }else if(response.value <= 7){
        //red 
        uv.addClass("uv7");
      }else if(response.value<= 8){
        //maroon
        uv.addClass("uv8");
      }else if(response.value <= 9){
        //magenta
        uv.addClass("uv9");
      }else if(response.value <= 10) {
        //pink
        uv.addClass("uv10");
      };

    });
  
  
  }


  //adds cities to the list below the search button
    function addCities (){


//create the card
var button =$("<button>").addClass("btn btn-primary btn-lg btn-block").text(citiesArray[citiesArray.length-1]);
//add the card
$(".card-holder").prepend(button);

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
  
  $(".city").empty();

      //create and add current days weather area
      var title =$("<h1>").text(response.name + " " +presentMonth + "/" + presentDay + "/" + presentYear).addClass("city-title");
      $(".city").append(title);
      var temperature = $("<p>").text("Temperature: " + response.main.temp);
      $(".city").append(temperature);
      var humidity = $("<p>").text("Humidity: " + response.main.humidity);
      $(".city").append(humidity);
      var windspd = $("<p>").text("Wind Spead: " + response.wind.speed);
      $(".city").append(windspd);
      var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
      $(".city-title").append(img);
      // var UVIndex =getUVIndex(response.coord.lat, response.coord.lon);
      // $(".city").append(UVIndex);
      getUVIndex(response.coord.lat, response.coord.lon);
    });
    // $("#today").append();
    
  }
  
  let updateTime = function () {
    presentMonth = moment().format('M');
    presentDay = moment().format('DD');
    presentYear = moment().format('YY');
    present=  moment().format("M/D/YYYY");

}
updateTime();

setInterval(updateTime, 60000);

$("#date-my").text(moment().format());

moment().format('MMMM Do YYYY, h:mm:ss a'); 

//for the 5 day forecast
function getForecast (search){
    
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=48cb01e208735d9aa940904774b4bdab&q="+ search;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) { 
    console.log(response);
 
    $("#forecast").empty();
  $(".custom-column-header").empty();
  $(".custom-column-content").empty();

  var present =moment();

    titleArray = ["#title1","#title2","#title3","#title4","#title5"];
    contentArray = ["#content1","#content2","#content3","#content4","#content5"];
    
  var j=0;
for (i=0; i<40; i++) {
 if(response.list[i].dt_txt.includes("15:00:00")){
    var cardTitle =$("<h6>").text(present.add(1, "days").format("M/D/YYYY"));
    $(titleArray[j]).append(cardTitle);
   //fix timing of image ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~``
    var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
    $(contentArray[j]).append(img);
   
    var temp =$("<p>").text("Temp: "+ response.list[i].main.temp);
    $(contentArray[j]).append(temp); 
    var humid = $("<p>").text("Humidity: " + response.list[i].main.humidity);
    $(contentArray[j]).append(humid);
  j+=1;
 }
  
}

  });
  $("#today").append();
  $("#forcast").append();
}

  });
  