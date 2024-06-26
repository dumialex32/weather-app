<?php  
require_once __DIR__ . '/../config.php';

header('Content-Type: application/json'); 

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!isset($_POST['city'])) {
        echo json_encode(['error'=> 'Wrong city input']);
    } else {
        $googleApiKey = $_ENV['GOOGLE_API_KEY'];
        $city = urlencode($_POST['city']); // url encoded 

        $mapboxAccessToken = 'pk.eyJ1IjoiYWxleDMzYWxleCIsImEiOiJjbHh3NnUxeWYxM3VtMmtzZGllMm4xcHdpIn0.Kz9Q4PwinMOj-GNx5hbEeA'; 

        $url = "https://api.mapbox.com/geocoding/v5/mapbox.places/$city.json?access_token=$mapboxAccessToken";

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($ch);

        if ($response === false) {
            echo json_encode(['error'=> 'Failed to fetch data from the API']);
        } else {
            $data = json_decode($response, true);

            
            if ($data) {
                echo json_encode($data);
            } else {
                echo json_encode(['error'=> $data['status']]);
            }
        }
    }
}
?>
