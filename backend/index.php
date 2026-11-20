<?php
/**
 * TALILE Modern Restaurant - PHP Backend API Router & Health Check
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

echo json_encode([
    "status"      => "online",
    "name"        => "TALILE Restaurant & Lounge API",
    "version"     => "2.0.0",
    "framework"   => "PHP / PDO / MySQL",
    "endpoints"   => [
        "POST /backend/api/reservations.php" => "Create VIP Table Reservation",
        "GET  /backend/api/reservations.php" => "List Reservations (Admin)",
        "PUT  /backend/api/reservations.php" => "Update Reservation Status",
        "POST /backend/api/orders.php"       => "Place Food Order",
        "GET  /backend/api/orders.php"       => "List / Track Orders",
        "PUT  /backend/api/orders.php"       => "Update Order Status",
        "GET  /backend/api/menu.php"         => "List Categories & Dishes",
        "POST /backend/api/menu.php"         => "Add Dish (Admin)",
        "POST /backend/api/auth.php"         => "Admin Login Authentication",
        "POST /backend/api/contact.php"      => "Submit Contact / Inquiry"
    ],
    "author"      => "TALILE Restaurant Development Team",
    "timestamp"   => date('c')
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
