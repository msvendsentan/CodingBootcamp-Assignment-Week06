//Declare variables




var searchTerm;
var queryURL;
var buttonList = ["cats", "dogs", "birds", "elephants"];
var apiKey = "7nmYjfK7aIw2DibGaq0g6eSOs4b0BzwF";


//Declare functions

function displayGIFs() {

    searchTerm = $(this).attr("data-term");
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + apiKey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            $("<img>")
                .attr("src", response.data[i].images.fixed_height_still.url)
                .attr("data-state", "still")
                .attr("data-still", response.data[i].images.fixed_height_still.url)
                .attr("data-animated", response.data[i].images.fixed_height.url)
                .addClass("gif")
                .prependTo($("#giphy_window"))
            ;
        }    
    })
}


function renderButtons() {
    
    $("#button_window").empty();

    for (var i = 0; i < buttonList.length; i++) {
        $("<button>")
            .addClass("gif_button")
            .attr("data-term", buttonList[i])
            .append(buttonList[i])
            .appendTo("#button_window")
        ;

    }

}

function gifToggle() {
    if ($(this).attr("data-state") == "still") {
        $(this)
            .attr("data-state", "animated")
            .attr("src", $(this).attr("data-animated"))
        ;
    } else if ($(this).attr("data-state") == "animated") {
        $(this)
            .attr("data-state", "still")
            .attr("src", $(this).attr("data-still"))
        ;
    }
}





//Code

$(document).ready(function() {

    $("#add_gif").on("click", function(event) {
        event.preventDefault();
            if ($("#gif_input").val() != "") {
                buttonList.push($("#gif_input").val().trim());
                $("#gif_input").val("");
                renderButtons();
            }
    });

    renderButtons();

    $(document).on("click", ".gif_button", displayGIFs);

    $(document).on("click", ".gif", gifToggle);

    $("#gif_clear_button").on("click", function() {
        $("#giphy_window").empty();
    });

    $("#button_clear_button").on("click", function() {
        buttonList = ["cats", "dogs", "birds", "elephants"];
        renderButtons();
    });

});