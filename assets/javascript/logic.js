 //Javascript
 // Array of scifi TV shows and movies
      var topics = ["The Expanse", "The Martian", "Interstellar", "Firefly", "Battlestar Galactica", 
      "Terra Nova", "2001: A Space Odyssey", "Doctor Who"];

      // Rewrites HTML with GIFs
      function displayInfo() {

        //Gets the text from button
        var scifi = $(this).attr("data-name");

        //GIPHY API link
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + scifi + "&limit=10&  api_key=dc6zaTOxFJmzC";

        // Creating an AJAX call for the specific gif button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          event.preventDefault();

          // Creating a div to hold all the gifs and ratings
          var gifDiv = $("<div class='gif'>");

          //Loop for getting info from the first 10 GIF results
          for(i = 0; i < 10; i++){

            //Variable for storing each search result as object
            var imageObj = response.data[i];

            //Variable for storing rating for each search result
            var rating = imageObj.rating;

            //Variable for storing the still gif
            var imageStill = imageObj.images.fixed_height_still.url;

            //Variable for storing the animated gif
            var imageAnimate = imageObj.images.fixed_height.url;

            //Variable for creating a paragraph containing the rating for each gif
            var gifRating = $("<p class='ratingText'>").text("Rating: " + rating);

            //Variable for creating the image tag with the gifButton class
            var gifIMG = $("<img class='gifButton'>");

            //Adds the original image as source attribute to be shown (in still mode)
            gifIMG.attr("src", imageStill);

            //Sets the data-state attribute to be still (current)
            gifIMG.attr("data-state", "still");

            //Adds the animate attribute and uses animated variable from above
            gifIMG.attr("data-animate", imageAnimate);

            //Adds the still attribute and uses still variable from above
            gifIMG.attr("data-still", imageStill);

            //Creates a new div which will hold both rating and image
            var gifContainer = $("<div class='img_text'>");

            //Adds the rating to container
            gifContainer.append(gifRating);

            //Adds the image to container
            gifContainer.append(gifIMG);

            //Adds the container (with rating and image) to gifDiv
            gifDiv.append(gifContainer);
        }
          //Adds the new gifDiv (with all ratings and images) to HTML
          $("#gif-view").prepend(gifDiv);
        });

      }

      // Function for displaying gif data

      function renderButtons() {

        // Deletes all previous buttons so no repeats
        $("#buttons-view").empty();

        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {

          //Creates a new button
          var a = $("<button>");

          // Adding a class of gif to our button
          a.addClass("gif");

          // Adding a data-attribute
          a.attr("data-name", topics[i]);

          // Providing the initial button text
          a.text(topics[i]);

          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a topic button is clicked
      $("#add-gif").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var newGif = $("#gif-input").val().trim();
        console.log(newGif);

        // Adding topic from the textbox to our array
        topics.push(newGif);

        // Calling renderButtons which handles the processing of our topics array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "gif"
      $("#buttons-view").on("click", ".gif", displayInfo);
      $("#gif-view").on("click", ".gifButton", changeState);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      //Changes the image from still to animated or vice versa
      function changeState() {

        //Variable to store if image is in still or animate mode
        var state = $(this).attr("data-state");

        //If current state is still, this changes it to animated
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "data-animate");

        //If current state is animate, this changed it to still
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "data-still");
        }
      }