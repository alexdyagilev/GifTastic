 // Initial array of topics
      var topics = ["The Expanse", "The Martian", "Interstellar", "Firefly"];

      // displayInfo function re-renders the HTML to display the appropriate content
      function displayInfo() {

        event.preventDefault()

        var scifi = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + scifi + "&limit=10&  api_key=dc6zaTOxFJmzC";

        // Creating an AJAX call for the specific gif button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          event.preventDefault();
          console.log(response);
          // Creating a div to hold the gifs
          var gifDiv = $("<div class='gif'>");

          for(i = 0; i < 10; i++){
            var imageObj = response.data[i];
            var rating = imageObj.rating;

            var imageStill = imageObj.images.fixed_height_still.url;
            var imageAnimate = imageObj.images.fixed_height.url;

            var gifRating = $("<p class='ratingText'>").text("Rating: " + rating);
            var gifIMG = $("<img class='gifButton' id='" + i +"'>");

            gifIMG.attr("src", imageStill);
            gifIMG.attr("data-state", "still");
            gifIMG.attr("data-animate", imageAnimate);
            gifIMG.attr("data-still", imageStill);

            var gifContainer = $("<div class='img_text'>");

            gifContainer.append(gifRating);
            gifContainer.append(gifIMG);


            

            gifDiv.append(gifContainer);

        }

         // $(".gifButton").on('click','#btnPrepend',function(){

          $("#gif-view").prepend(gifDiv);
         // var imagesListener = $("#gif-view");
         // imagesListener.addEventListener('click', function(event) {
         //      handler();
          //   })


        });

      }

      // Function for displaying gif data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("gif");
          // Adding a data-attribute
          a.attr("data-name", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a movie button is clicked
      $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var newGif = $("#gif-input").val().trim();

        // Adding movie from the textbox to our array
        topics.push(newGif);

        // Calling renderButtons which handles the processing of our topics array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "gif"
      $("#buttons-view").on("click", ".gif", displayInfo);
      $("#gif-view").on("click", ".gifButton", handler);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      $(".gifButton").on("click", function() {
        var state = $(this).attr("data-state");

        console.log(state);
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      
    });

      function handler() {
        var state = $(this).attr("data-state");

        //console.log(this);
        console.log(state);
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "data-animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "data-still");
        }
      }