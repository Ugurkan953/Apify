$(init);

var markers = [];

var mapSettings = {
    mapTypeId: 'Styled',
    zoom: 4, scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false
};


// New styles for map



// Creates new map with settings
var map = new google.maps.Map(document.getElementById('map'), mapSettings);

// Creates a new style for the map
var styledMapType = new google.maps.StyledMapType(styles, {name: 'Styled'});

// Set style on map
map.mapTypes.set('Styled', styledMapType);

var geocoder = new google.maps.Geocoder();


function init() {

    // Retrieve new markers from insta
    $('#submit').on('click', retrieveDataHandler);

    //
    geocoder.geocode({
            'address': 'Wijnhaven, Netherlands, NL'
        },
        function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
            }
        });


}


/*
 This function retrieves new data from Instagram. The input value will be saved in
 the $query and passed by GET in the url. 'Instadata.php' receives this query,
 modify's it and sends a new JSON file back to the AJAX call.

 The new data will be used for creating markers on the map and information inside the info windows.

 @param e
 */
function retrieveDataHandler(e) {

    e.preventDefault();

    // Get the value of the input
    var query = $('#search').val();

    $.ajax({
        url: "instadata.php",
        success: function (allData) {
            //Loop through all markers and delete them with marker.setMap(null)
            markers.forEach(function (marker) {
                marker.setMap(null)
            });

            $('#search').val('');

            //Clear arrat with markers
            markers = [];

            // Counter to loop through images in the infowindow
            var counter = 0;


            //Loop through all new data
            allData['data'].forEach(function (object) {

                //Creates a latlong to make a new marker
                var myLatlng = new google.maps.LatLng(object.latitudes, object.longitudes);

                //Create a new marker and push it to array 'markers'
                var marker = new google.maps.Marker({
                    position: myLatlng,
                    map: map,
                    icon: 'img/insta.png',
                    visible: true,
                    clickable: true,
                    animation: google.maps.Animation.BOUNCE
                });


                markers.push(marker);

                //Contains content for in the info windows
                var content = "<img width='200px' src='" + object.images + "'/>" + '<hr />' +
                    "<img class='profile' width='30px' src='" + object.profile_pictures + "'/>" +
                    '<a href="https://instagram.com/' + object.usernames +  '" target="_blank">' + object.usernames +  '</a>';

                //Create new info window with content
                var infoWindow = new google.maps.InfoWindow({
                    content: content
                });

                //Open info window when hover
                google.maps.event.addListener(marker, 'mouseover', function () {

                    infoWindow.open(map, marker);

                });

                // Close info window when hover out
                google.maps.event.addListener(marker, 'mouseout', function () {
                    setTimeout(function(){
                        infoWindow.close(map, marker);
                    }, 2000);


                });

                //Increments counter by one for next picture in markers
                counter++;


            });

            //Passes a get through the url. Used in PHP to modify the query
        }, data: {query: query}

    });
}



