<?php
require_once __DIR__ . '/vendor/autoload.php'; // Path to autoload.php
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__); // path to env file
$dotenv->load();

// Access your environment variables
$accessToken = $_ENV['MAP_BOX_ACCESS_TOKEN'];

// Use $accessToken in your application
?>
