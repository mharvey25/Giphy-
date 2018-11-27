
// Pre-set array of animals
var animals = ["cat", "dog", "bunny", "raccoon", "parrot", "whale", "hamster", "lion", "bear", "horse", "panda", "bird", "elephant", "dolphin", "fish", "turtle", "frog", "snake", "cow", "goat", "pig"];

function displayAnimalInfo() {

    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=2ZivORTg0jk557LDJuD8WsbOxUCHEUCZ&limit=10";

    // AJAX call for the specific animal button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // Create a new div for the animal
        var animalDiv = $("<div class='animal'>");
        var results = response.data;

        // Creating a loop to execute the amount of items in the array
        for (var i = 0; i < results.length; i++) {

            // Creates a new image for the animal    
            var image = $("<img>");

            // Adds still and animated attributes for the images
            image.attr("src", results[i].images.fixed_height_still.url);
            image.attr("data-still", results[i].images.fixed_height_still.url);
            image.attr("data-animate", results[i].images.fixed_height.url);
            image.attr("data-state", "still");
            image.addClass("gif");


            // This removes the previous array of images
            $("#animal-view").empty();

            // Appending the image
            animalDiv.append(image);


            $("#animal-view").prepend(animalDiv);
        }

        // This function changes the state of the image when the image is clicked
        $(document).on("click", "img", function () {

            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        })
    });
}

// Function for displaying animal data
function renderButtons() {

    // This deletes the old animals
    $("#buttons-view").empty();

    // Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {

        var a = $("<button>");
        a.addClass("animal-btn");
        a.attr("data-name", animals[i]);
        a.text(animals[i]);
        $("#buttons-view").append(a);
    }
}

// Function for when the animal button is clicked
$("#add-animal").on("click", function (event) {
    event.preventDefault();

    var animal = $("#animal-input").val().trim();

    animals.push(animal);

    $("#animal-input").val("");

    renderButtons();
});

$(document).on("click", ".animal-btn", displayAnimalInfo);

renderButtons();
