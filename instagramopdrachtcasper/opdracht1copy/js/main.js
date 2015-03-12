/**
 * Created by Casper on 10-2-2015.
 *
 *
 * Google Maps JavaScript API v3
 *
 */

var LongLatcor;
var markers = [];

// adds a marker to indicate the position
function initialize() {

//get this info from php or ajax
    getJSONQ();

    //debugging

    //instellingen map
    var mapOptions = {
        zoom: 2,
        center: new google.maps.LatLng(50, 40)
    };

    //selector
    var mapHTMLlocation = document.getElementById('map-canvas');

    //new map
    var map = new google.maps.Map(mapHTMLlocation, mapOptions);

    //img for icon

}



google.maps.event.addDomListener(window, 'load', initialize);


//get json info form php
function getJSONQ()
{
    $.ajax({
        url: "insta.php",
        complete: markerLatLng
    });
}

//callback to create markers
function markerLatLng (datas){


    //for each json item create a marker
    datas.forEach(
        function(data)
    {
        //get long and lat

        //create the marker with right coördinats and imgs
        var myLatlng = new google.maps.LatLng(data['latitude'], data['longitude']);

        //location marker
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Hello World!'
        });



    });
}
