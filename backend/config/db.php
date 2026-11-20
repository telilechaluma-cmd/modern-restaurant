<?php
/**
 * TALILE Restaurant & Lounge - Database Configuration & Helpers
 * Supports MySQL / MariaDB via PDO with prepared statements.
 */

// Enable CORS for frontend requests (React / Vite)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database Credentials
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'talile_restaurant');
define('DB_CHARSET', 'utf8mb4');

function getDbConnection() {
    static $pdo = null;

    if ($pdo === null) {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            // Return clean JSON error
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Database connection failed. Check db.php credentials.",
                "error"   => $e->getMessage()
            ]);
            exit();
        }
    }

    return $pdo;
}

// JSON Input Helper
function getJsonInput() {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?? [];
}

// Response Helper
function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit();
}
