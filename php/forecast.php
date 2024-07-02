<?php

require_once "utils/helpers.php";
require_once "services/getForecast.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    respondWithError("method_not_allowed", "Method not allowed");
} else {
    $requiredKeys = ["lng", "lat"];
    $postData = validatePostData($requiredKeys);

    $forecastData = getForecast($postData);

    respondWithJson($forecastData);
}
