<?php
/**
 * TALILE Restaurant - Contact Inquiries API
 * Endpoint: /backend/api/contact.php
 */

require_once __DIR__ . '/../config/db.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'];

// 1. POST: Submit Contact Message
if ($method === 'POST') {
    $input = getJsonInput();

    $fullName    = trim($input['fullName'] ?? $input['name'] ?? '');
    $email       = trim($input['email'] ?? '');
    $phoneNumber = trim($input['phoneNumber'] ?? $input['phone'] ?? '');
    $subject     = trim($input['subject'] ?? 'General Dining Inquiry');
    $message     = trim($input['message'] ?? '');

    if (empty($fullName) || empty($email) || empty($message)) {
        jsonResponse([
            "success" => false,
            "message" => "Name, email, and message are required."
        ], 400);
    }

    try {
        $stmt = $pdo->prepare("
            INSERT INTO `contact_messages` (`full_name`, `email`, `phone_number`, `subject`, `message`)
            VALUES (?, ?, ?, ?, ?)
        ");
        $stmt->execute([$fullName, $email, $phoneNumber, $subject, $message]);

        jsonResponse([
            "success" => true,
            "message" => "Galatoomaa! Message received. Our team will contact you shortly."
        ], 201);
    } catch (PDOException $e) {
        jsonResponse(["success" => false, "message" => $e->getMessage()], 500);
    }
}

// 2. GET: List Messages (Admin)
if ($method === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM `contact_messages` ORDER BY `created_at` DESC LIMIT 50");
        $messages = $stmt->fetchAll();

        jsonResponse([
            "success"  => true,
            "messages" => $messages
        ]);
    } catch (PDOException $e) {
        jsonResponse(["success" => false, "message" => $e->getMessage()], 500);
    }
}

jsonResponse(["success" => false, "message" => "Method not allowed."], 405);
