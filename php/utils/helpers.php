<?php

/**
 * Validate $_POST data.
 *
 * @param array $requiredKeys An array of keys that are required in $_POST.
 * @param array $optionalKeys An array of keys that are optional in $_POST.
 * @return array Validated and sanitized data.
 */
function validatePostData(array $requiredKeys, array $optionalKeys = [])
{
    $data = [];

    // Check for required keys
    foreach ($requiredKeys as $key) {
        if (!isset($_POST[$key])) {
            respondWithError("invalid_format", "Missing required input: $key.");
        }

        if (empty(trim($_POST[$key]))) {
            respondWithError("invalid_format", "Input $key cannot be empty.");
        }

        $data[$key] = sanitizeInput($_POST[$key]);
    }

    // Check for optional keys
    foreach ($optionalKeys as $key) {
        if (isset($_POST[$key])) {
            $data[$key] = sanitizeInput($_POST[$key]);
        }
    }

    return $data;
}

/**
 * Sanitize input data.
 *
 * @param mixed $input The input data to sanitize.
 * @return mixed Sanitized input.
 */
function sanitizeInput($input)
{
    // Add more sanitization as needed
    return htmlspecialchars(strip_tags(trim($input)));
}

/******************** Handle JSON response function **********************/

function respondWithJson($data, $status = 200)
{
    http_response_code($status);
    $response = json_encode($data);
    echo $response;
    exit();
}

/************************* Handling error responses ************************/

define("HTTP_OK", 200);
define("HTTP_BAD_REQUEST", 400);
define("HTTP_INTERNAL_SERVER_ERROR", 500);
define("HTTP_METHOD_NOT_ALLOWED", 405);
define("HTTP_BAD_GATEAWAY", 502);

$errorMap = [
    "invalid_format" => HTTP_BAD_REQUEST,
    "coords_not_provided" => HTTP_BAD_REQUEST,
    "coords_not_numeric" => HTTP_BAD_REQUEST,
    "failed_to_decode_json" => HTTP_INTERNAL_SERVER_ERROR,
    "curl_error" => HTTP_INTERNAL_SERVER_ERROR,
    "method_not_allowed" => HTTP_METHOD_NOT_ALLOWED,
    "http_error" => HTTP_BAD_GATEAWAY,
];

function respondWithError($errorKey, $message)
{
    global $errorMap;
    $statusCode = isset($errorMap[$errorKey])
        ? $errorMap[$errorKey]
        : HTTP_INTERNAL_SERVER_ERROR;

    respondWithJson(["error" => $message], $statusCode);
}
?>
