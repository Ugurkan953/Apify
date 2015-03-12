<?php
/**
 * Created by PhpStorm.
 * User: Casper
 * Date: 10-3-2015
 * Time: 21:29
 */
require_once "includes/config.php";

//global var
$longLat = [];

//get insta data
$result = json_decode(file_get_contents("https://api.instagram.com/v1/media/popular?client_id=" . CLIENT_ID));

//set all the location info in an array
foreach($result->data as $data){

    //check for location
    if(array_key_exists('location', $data) AND $data->location != null AND
        $data->location->longitude != "" AND $data->location->latitude != "" AND
        array_key_exists('longitude', $data->location) AND array_key_exists('latitude', $data->location)
    ){
        array_push($longLat, array(
            "img"        => $data->images->standard_resolution->url,
            "longitude"  => $data->location->longitude,
            "latitude"   => $data->location->latitude
        ));
    }


}

//make json from array, and tell its json
echo json_encode($longLat);
header('Content-Type:application/json');
exit;