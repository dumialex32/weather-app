<?php
require __DIR__ . DIRECTORY_SEPARATOR . 'vendor/autoload.php';

// Load .env file
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

?>
