// Constants for running ajax queries
const url = "https://api.giphy.com/v1/gifs/search?";
const api_key = "WXjafIc57NjQ01P3mswHsHOK9OfYGL3g";

// Array of query terms
let queries = [
    "science",
    "space",
    "fusion",
    "genetics",
    "robots"
];

$(document).ready(function () {

    // Initialize Masonry
    let grid = $(".grid").masonry({
        itemSelector: ".grid-item",
        columnWidth: ".grid-sizer",
        fitWidth: true,
        percentPosition: true
    });

    // Show default buttons when page has loaded
    displayButtons();

    // Handle button click events
    $(document).on("click", "button", buttonClick);

    // Handle image hover events
    $(document).on("hover", "img", imgHover);

    // Create a query URL with a search term
    function generateQueryURL(term) {
        return url + "api_key=" + api_key + "&q=" + term;
    }

    // Creates a new button and adds it to the button group
    function addButton(value) {
        let btn = $("<button>")
            .addClass("btn btn-primary w-100 text-capitalize align-top")
            .val(value)
            .text(value);

        $("#btn-group").append(btn);
    }

    // Renders buttons in the button group
    function displayButtons() {
        $("#btn-group").empty();

        for (let q of queries) {
            addButton(q);
        }
    }

    // Hanldes button clicks
    function buttonClick(event) {
        // Stop page from refreshing
        event.preventDefault();

        // Obtain value of button that was clicked
        let value = $(this).val();

        // Check if a search was performed
        if (value === "search-btn") {
            // Get value for new query
            let newV = $("#search").val();
            newV = newV.toLowerCase().trim();

            // Empty search field
            $("#search").val("");

            // Check that the new value is not empty
            if (newV === "") {
                return;
            }

            // Add the new value to the queries array
            queries.push(newV);

            // Display new button
            displayButtons();

            // Set value to the new value to run an ajax query
            value = newV;
        }

        // Create a new query URL
        let queryURL = generateQueryURL(value);

        // Run an ajax query
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(populateImages);
    }

    // Displays first 25 gifs from the giphy response
    function populateImages(response) {
        console.log(response);

        // Remove the previous results
        grid.masonry().empty();

        // Adds a masonry sizing div
        let sizer = $("<div>").addClass(".grid-sizer");
        appendMasonryItem(sizer);

        // Add all images to the page
        for (let i = 0; i < response.data.length; i++) {
            let data = response.data[i];
            newImage(
                data.title,
                data.images.downsized_still.url,
                data.images.downsized.url
            );
        }
    }

    // Add a new gif to the page
    function newImage(alt, still, animated) {
        // Create div to store img
        let item = $("<div>").addClass("grid-item");

        // Create img with still and animated data values
        let img = $("<img>")
            .attr("src", still)
            .attr("alt", alt)
            .attr("data-still", still)
            .attr("data-animated", animated)
            .attr("data-status", "still");

        // Add item to the results div
        item.append(img);
        appendMasonryItem(item);
    }

    function imgHover() {
        // TODO
    }

    function appendMasonryItem(item) {
        grid.masonry()
            .append(item)
            .masonry("appended", item)
            .masonry("layout");
    }
});