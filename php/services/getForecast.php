<?php

function getForecast($postData)
{
    $lat = $postData["lat"];
    $lng = $postData["lng"];

    $url =
        "https://api.open-meteo.com/v1/forecast?latitude=" .
        urlencode($lat) .
        "&longitude=" .
        urlencode($lng) .
        "&hourly=temperature_2m";

    $ch = curl_init();

    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 10,
    ]);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        $curlError = curl_error($ch);
        curl_close($ch);
        respondWithError("curl_error", "Error: " . $curlError);
    } else {
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode !== 200) {
            respondWithError(
                "http_error",
                "Error: Received HTTP code " . $httpCode
            );
        } else {
            $responseData = json_decode($response, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                respondWithError(
                    "failed_to_decode_json",
                    "Error: Failed to decode JSON response."
                );
            } else {
                return $responseData;
            }
        }
    }

    respondWithError("unknown_error", "An unknown error occurred.");
}

?>
