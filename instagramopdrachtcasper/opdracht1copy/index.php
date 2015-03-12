<?php
require_once "includes/config.php";

?>
<!doctype html>
<html>
<head>
    <title>Oefenen met Events</title>
    <meta name="description" content="Oefenen met het DOM"/>
    <meta charset="utf-8"/>
    <link rel="stylesheet" href="css/style.css"/>

</head>
<body>
<div id="map-canvas"></div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=<?= API_KEY_MAPS ?>"></script>
<script type="text/javascript" src="js/main.js"></script>
</body>
</html>