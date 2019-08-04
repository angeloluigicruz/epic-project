var searchButtonID = "#search";

//When the document is ready.
$(document).ready(function () {

    //Find the search button with given ID and assign it a click event.
    $(searchButtonID).click(function () {
        //Clear all previous displayed searches.
        $("#display").empty();

        //Grab the users new query
        var queryTerm = $("#input").val();
        console.log(queryTerm);

        //Update the API URL to contain the new query term
        var url = `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${queryTerm}`;
        
        //required stuff to get the API to work using fetch instead of AJAX
        const options = {
            method: 'GET',
            headers: {
                "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
                "x-rapidapi-key": "f96f4a925cmshb8b16fd2a45e09ep16967ejsn1f5a2a1fc64c"
            }
        }

        //Similar to AJAX, fetches the information and does something with it.
        //In this case we pass the data (which is in JSON now) to my function called generateBlocks
        fetch(url, options)
            .then(response => response.json())
            .then(data => generateBlocks(data)) //console.log(data)
            .catch(e => console.error(e));
    });

});

//generateBlocks will generate bootstrap cards and fill them with an approriate image and
//fill the card body with links on icons to where someone can stream/buy the movie
function generateBlocks(obj) {

    //Loop through all search results
    obj.results.forEach(function (content) {
        //Check to see if the picture is N/A and replace with a stock image
        if (content.picture == null) {
            content.picture = "../assets/images/na.png";
        }
        //Create bootstrap card components with obj information to fill in required content
        var cardContainer = $("<div class='card' style='width: 18rem;'>");
        var cardImage = $(`<img src='${content.picture}' class='card-img-top' alt='${content.name}'>`);
        var cardBody = $("<div class='card-body'>");
        var cardTitle = $(`<h5 class="card-title">${content.name}</h5>`);
        cardBody.append(cardTitle);

        //Loop through this specific results array of places you can stream/purchase
        content.locations.forEach(function (url) {

            //Only display places that have an actual URL
            if (url.url != null) {
                var linkIcon = $(`<a href='${url.url}'><img src='${url.icon}'></a>`);
                cardBody.append(linkIcon);
            }
        });

        //Package all the components into the card container
        cardContainer.append(cardImage, cardBody);
        //Place the completed card into our display
        $("#display").append(cardContainer);
    });

}