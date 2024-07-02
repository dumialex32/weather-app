<?php
require_once __DIR__ . "../../../config.php";

function getCoords($city)
{
    global $accessToken;

    $url = "https://api.mapbox.com/geocoding/v5/mapbox.places/$city.json?access_token=$accessToken";

    $ch = curl_init();

    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 6,
    ]);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        $curlError = curl_error($ch);
        curl_close($ch);
        respondWithError(
            "curl_error",
            "Error occurred during curl request: " . $curlError
        );
    } else {
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if ($http_code !== 200) {
            respondWithError(
                "http_error",
                "Error: received http code " . $http_code
            );
        } else {
            $response_data = json_decode($response, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                respondWithError(
                    "failed_to_decode_json",
                    "Error: Failed to decode JSON response"
                );
            } else {
                return $response_data;
            }
        }
    }
}
?>
