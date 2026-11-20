<?php
/**
 * TALILE Restaurant - Authentication API (Admin & Customer)
 * Endpoint: /backend/api/auth.php
 */

require_once __DIR__ . '/../config/db.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $input = getJsonInput();
    $action = $_GET['action'] ?? $input['action'] ?? 'login';

    if ($action === 'login') {
        $email    = trim($input['email'] ?? '');
        $password = $input['password'] ?? '';

        if (empty($email) || empty($password)) {
            jsonResponse(["success" => false, "message" => "Email and password are required."], 400);
        }

        try {
            $stmt = $pdo->prepare("SELECT * FROM `users` WHERE `email` = ? LIMIT 1");
            $stmt->execute([$email]);
            $user = $stmt->fetch();

            // Default credentials demo check (admin@talile.com / admin123) or hash verify
            $isDemoMatch = ($email === 'admin@talile.com' && $password === 'admin123');
            $isHashMatch = ($user && password_verify($password, $user['password_hash']));

            if ($isDemoMatch || $isHashMatch) {
                $userData = [
                    "id"       => $user['id'] ?? 'usr-admin',
                    "fullName" => $user['full_name'] ?? 'TALILE Admin',
                    "email"    => $email,
                    "role"     => $user['role'] ?? 'admin',
                    "token"    => bin2hex(random_bytes(24))
                ];

                jsonResponse([
                    "success" => true,
                    "message" => "Authentication successful!",
                    "user"    => $userData
                ]);
            } else {
                jsonResponse(["success" => false, "message" => "Invalid email or password."], 401);
            }
        } catch (PDOException $e) {
            jsonResponse(["success" => false, "message" => $e->getMessage()], 500);
        }
    }
}

jsonResponse(["success" => false, "message" => "Invalid auth request."], 400);
