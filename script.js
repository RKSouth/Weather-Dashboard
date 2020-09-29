$(document).ready(function(search) {
  
  //getting the array and stuff from local storage upon reload
  citiesArray = ["Olympia"];
  if (JSON.parse(localStorage.getItem("search")) != null){
    citiesArray=JSON.parse(localStorage.getItem("search"));
  }

  //add a button to each item in the array ~~~~~~~~~~~~should I put the onclick for the buttons here???s
  citiesArray.forEach( element => {  
var button =$("<button>").addClass("btn btn-primary btn-lg btn-block").text(element);
//add the card
$(".card-holder").append(button);

  });

  // $(".btn btn-primary btn-lg btn-block").on("click", function(event) {
  //   event.preventDefault();
  //   getWeather(search);
  //   getForecast(search);
  //   getUVIndex();
  // });

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
    var queryURL = 
    "http://api.openweathermap.org/data/2.5/uvi?appid=48cb01e208735d9aa940904774b4bdab&lat=" + lat + "&lon=" + lon;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) { 
      var uv = $("<p>").text("UV Index: ");
      $(".city").append(uv);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~HOW TO ADD COLOR???
      // if(response.value==1){
      //   //green
      //   uv.addClass("btn-success");
      // }else if(response.value ===2) {
      //  //lightgreen
      // }else if(response.value ===3){
      //   //yellow
      // }else if(response.value ===4){
      //  //yellow orange
      // }else if(response.value ===5){
      //   // orange
      // }else if(response.value ===6){
      //   // red orange
      // }else if(response.value ===7){
      //   //red 
      // }else if(response.value===8){
      //   //maroon
      // }else if(response.value ===9){
      //   //magenta
      // }else if(response.value ===10) {
      //   //pink
      // };

      console.log(response);
      console.log(queryURL);
  
  $(".city").empty();


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
      
      console.log(response.coord.lat);
      console.log(queryURL);
  
  $(".city").empty();


      var title =$("<h1>").text(response.name + " " +presentMonth + "/" + presentDay + "/" + presentYear);
      $(".city").append(title);

      var temperature = $("<p>").text("Temperature: " + response.main.temp);
      $(".city").append(temperature);
      var humidity = $("<p>").text("Humidity: " + response.main.humidity);
      $(".city").append(humidity);
      var windspd = $("<p>").text("Wind Spead: " + response.wind.speed);
      $(".city").append(windspd);

      // getUVIndex(response.coord.lat, response.coord.lon);
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
  $(".custom-column-header").empty();
  $(".custom-column-content").empty();

  var present =moment();

    titleArray = ["#title1","#title2","#title3","#title4","#title5"];
    contentArray = ["#content1","#content2","#content3","#content4","#content5"];
    

for (i=0; i<response.list.length; i++) {
  var cardTitle =$("<h6>").text(present.add(1, "days").format("M/D/YYYY"));
 $(titleArray[i]).append(cardTitle);
//fix timing of image ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~``
 var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
 $(contentArray[i]).append(img);

 var temp =$("<p>").text("Temp: "+ response.list[i].main.temp);
 $(contentArray[i]).append(temp); 
 var humid = $("<p>").text("Humidity: " + response.list[i].main.humidity);
 $(contentArray[i]).append(humid);


}

  });
  $("#today").append();
  $("#forcast").append();
}

  });
  