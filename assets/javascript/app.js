const giphy = "api.giphy.com/v1/gifs/";
const searchURL = giphy + "search";
const api_key = "WXjafIc57NjQ01P3mswHsHOK9OfYGL3g";

$(document).ready(function() {
    // TODO
});

function generateQueryURL(term) {
    return searchURL + "&api_key=" + api_key + "q=" + term;
}