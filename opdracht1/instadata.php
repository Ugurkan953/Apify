<?php

require_once("includes/config.php");

$instagramApiUrl = 'https://api.instagram.com/v1/';

//Query string with default parameter (client_id)
$queryString = [
    "access_token" => ACCESS_TOKEN
];


if (isset($_GET['query'])) {
    $query = $_GET['query'];
} else {
    $query = '';
}

//See http://instagram.com/developer/endpoints/ for information
$methods = [
    "tags/" . $query . "/media/recent"
];


$method = $methods[0];
$url = $instagramApiUrl . $method;
$url .= "?" . http_build_query($queryString);


// Retrieves all the instagram data
$fileData = file_get_contents($url);
$instaData = json_decode($fileData);


/*
 * Empty array that will hold all the instagram data that is needed for the application
 */
$jsondata = [];


for ($i = 0; $i < 20; $i++) {


// Validation check voor coordinaten en voegt de long en lat toe in een nieuwe array aan de array $jsondata
    if ($instaData->data[$i]->location->longitude != "" & $instaData->data[$i]->location->latitude != "") {
        array_push($jsondata, [
                'profile_pictures' => $instaData->data[$i]->user->profile_picture,
                'usernames' => $instaData->data[$i]->user->username,
                'images' => $instaData->data[$i]->images->low_resolution->url,
                'likes' => $instaData->data[$i]->likes->count,
                'longitudes' => $instaData->data[$i]->location->longitude,
                'latitudes' => $instaData->data[$i]->location->latitude
            ]
        );
    }
}

/*
 * Checks all the likes. If a image at least have 1 like it will be added to the $likes array.
 * The likes is sorted descending for using top-3 on the map.
 */
$likes = [];
for ($j = 0; $j < 20; $j++) {
    if ($jsondata[$j]['likes'] > 0) {
        array_push($likes, $jsondata[$j]['likes']);
    }
    rsort($likes);
}


$all = [
    'data' => $jsondata,
    'top_likes' => $likes
];


// Geeft aan dat het om JSON data gaat en zet de dimensionale array om naar JSON
header('Content-Type: application/json');
echo json_encode($all);
exit;


