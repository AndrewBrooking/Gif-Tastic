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

$(window).on('load', function() {
    // Initialize Masonry
    $('div.grid').masonry({
        itemSelector: 'div.grid-item',
        columnWidth: 'div.grid-item',
        percentPosition: true
    });
});

$(document).ready(function() {
    // Show default buttons when page has loaded
    displayButtons();

    $(document).on("click", "button", buttonClick);
});

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
    $("div.grid").empty();

    // Add all images to the page
    for (let i = 0; i < response.data.length; i++) {
        newImage(response.data[i].images.downsized.url);
    }
}

// Creates a new img element
function newImage(src) {
    let item = $("<div>").addClass("grid-item");
    item.append(
        $("<img>").attr("src", src)
    );

    $("div.grid").append(item);
}