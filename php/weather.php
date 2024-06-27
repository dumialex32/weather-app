<?php  
require_once '../config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!isset($_POST['city'])) {
        echo json_encode(['error'=> 'Wrong city input']);
        exit;
    }

    $city = urlencode($_POST['city']); // URL encoded 

    // $mapboxAccessToken = getenv('MAP_BOX_ACCESS_TOKEN');
    // var_dump($mapboxAccessToken); 
    // if (!$mapboxAccessToken) {
    //     echo json_encode(['error' => 'Mapbox access token is not set']);
    //     exit;
    // }

    $url = "https://api.mapbox.com/geocoding/v5/mapbox.places/$city.json?access_token=$accessToken";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);

    if ($response === false) {
        echo json_encode(['error'=> 'Failed to fetch data from the API']);
        curl_close($ch);
        exit;
    } else {
        $data = json_decode($response, true);

        curl_close($ch);

        if (json_last_error() === JSON_ERROR_NONE) {
            echo json_encode($data);
        } else {
            echo json_encode(['error'=> 'Invalid data received from the API']);
        }
    }
}
?>
