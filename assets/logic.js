// set topics array from which the intital buttons will post to the screen



var topics = ["Drake", "Kendrick Lamar", "Biggie", "Kanye", "Timbaland"]

$(document).ready(function() {
  for (var j = 0; j < topics.length; j++) { 
      var buttons = $('<button>'+ topics[j] + '</button>');
      buttons.addClass("btn btn-primary game-button");
      buttons.attr("data-person", topics[j]);
      $('.buttons-area').append(buttons); 

};

$("#add-button").on("click", function() {
        event.preventDefault();
        var gifValue = $("#add-gif-input").val();
        topics.push(gifValue);
        var newGif = $('<button>'+ gifValue + '</button>');
        newGif.addClass("btn btn-primary game-button");
        newGif.attr("data-person", gifValue);
        $('.buttons-area').append(newGif); 
        console.log(topics);
        
});


// this function gets the results from the GIF API and posts them to the screen 

$(".game-button").on("click", function() {
  $("#gifs-container").empty();
  var person = $(this).attr("data-person");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    person + "&api_key=2v9dfl3zsS4cA3RwsbYIniZFedL1DTww&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
      })

      .done(function(response) {

      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='new-gif'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var personImage = $("<img>");
        
        personImage.attr("src", results[i].images.fixed_height_still.url);
        personImage.attr("data-still", results[i].images.fixed_height_still.url);
        personImage.attr("data-animate", results[i].images.fixed_height.url);
        personImage.attr("data-state", "still");
        personImage.attr("id", "image-gif");


        gifDiv.prepend(p);
        gifDiv.prepend(personImage);

        $("#gifs-container").append(gifDiv);
      }
    });
  });


  $("#image-gif").on("click", function() {

    var state = $(this).attr("data-state");

    if (state == "still") {
              $(this).attr("src", $(this).attr('data-animate'));
              $(this).attr("data-state", "animate");
            }

    if (state == "animate"){
        $(this).attr("src", $(this).attr('data-still'));
        $(this).attr("data-state", "still");

    }
  });
}); 
