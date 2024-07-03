<?php
require_once "services/getCoords.php";
require_once "utils/helpers.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $requiredKeys = ["location"];
    $postData = validatePostData($requiredKeys);

    $coordsData = getCoords($postData);

    respondWithJson($coordsData);
} else {
    respondWithError("method_not_allowed", "Not a POST request");
}

?>
