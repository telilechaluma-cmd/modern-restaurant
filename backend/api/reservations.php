<?php
/**
 * TALILE Restaurant - Table Reservations API
 * Endpoint: /backend/api/reservations.php
 */

require_once __DIR__ . '/../config/db.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'];

// 1. POST: Create New Table Reservation
if ($method === 'POST') {
    $input = getJsonInput();

    $fullName     = trim($input['fullName'] ?? $input['full_name'] ?? '');
    $phoneNumber  = trim($input['phoneNumber'] ?? $input['phone_number'] ?? '');
    $date         = $input['date'] ?? $input['reservation_date'] ?? date('Y-m-d');
    $time         = $input['time'] ?? $input['reservation_time'] ?? '19:30';
    $guests       = $input['guests'] ?? '2 Guests';
    $seatingArea  = $input['seatingArea'] ?? $input['seating_area'] ?? 'Main Dining Hall';
    $occasion     = $input['occasion'] ?? 'Dinner';
    $specialNotes = trim($input['specialNotes'] ?? $input['special_notes'] ?? '');
    $id           = $input['id'] ?? ('TAL-RES-' . rand(10000, 99999));
    $status       = $input['status'] ?? 'Confirmed';

    if (empty($fullName) || empty($phoneNumber)) {
        jsonResponse([
            "success" => false,
            "message" => "Full name and phone number are required."
        ], 400);
    }

    try {
        $stmt = $pdo->prepare("
            INSERT INTO `reservations` 
            (`id`, `full_name`, `phone_number`, `reservation_date`, `reservation_time`, `guests`, `seating_area`, `occasion`, `special_notes`, `status`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        $stmt->execute([
            $id,
            $fullName,
            $phoneNumber,
            $date,
            $time,
            $guests,
            $seatingArea,
            $occasion,
            $specialNotes,
            $status
        ]);

        jsonResponse([
            "success" => true,
            "message" => "Table reservation created successfully!",
            "reservation" => [
                "id"           => $id,
                "fullName"     => $fullName,
                "phoneNumber"  => $phoneNumber,
                "date"         => $date,
                "time"         => $time,
                "guests"       => $guests,
                "seatingArea"  => $seatingArea,
                "occasion"     => $occasion,
                "specialNotes" => $specialNotes,
                "status"       => $status,
                "createdAt"    => date('c')
            ]
        ], 201);
    } catch (PDOException $e) {
        jsonResponse([
            "success" => false,
            "message" => "Database error: " . $e->getMessage()
        ], 500);
    }
}

// 2. GET: List All Reservations (with optional status or date filter)
if ($method === 'GET') {
    try {
        $status = $_GET['status'] ?? null;
        $date   = $_GET['date'] ?? null;

        $sql = "SELECT * FROM `reservations` WHERE 1=1";
        $params = [];

        if ($status) {
            $sql .= " AND `status` = ?";
            $params[] = $status;
        }
        if ($date) {
            $sql .= " AND `reservation_date` = ?";
            $params[] = $date;
        }

        $sql .= " ORDER BY `created_at` DESC";

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $rows = $stmt->fetchAll();

        $reservations = array_map(function($r) {
            return [
                "id"           => $r['id'],
                "fullName"     => $r['full_name'],
                "phoneNumber"  => $r['phone_number'],
                "date"         => $r['reservation_date'],
                "time"         => $r['reservation_time'],
                "guests"       => $r['guests'],
                "seatingArea"  => $r['seating_area'],
                "occasion"     => $r['occasion'],
                "specialNotes" => $r['special_notes'],
                "status"       => $r['status'],
                "createdAt"    => $r['created_at']
            ];
        }, $rows);

        jsonResponse([
            "success" => true,
            "count"   => count($reservations),
            "reservations" => $reservations
        ]);
    } catch (PDOException $e) {
        jsonResponse([
            "success" => false,
            "message" => "Database error: " . $e->getMessage()
        ], 500);
    }
}

// 3. PUT: Update Reservation Status (e.g., Confirmed, Seated, Cancelled)
if ($method === 'PUT') {
    $input = getJsonInput();
    $id     = $input['id'] ?? $_GET['id'] ?? null;
    $status = $input['status'] ?? null;

    if (!$id || !$status) {
        jsonResponse(["success" => false, "message" => "Reservation id and new status are required."], 400);
    }

    try {
        $stmt = $pdo->prepare("UPDATE `reservations` SET `status` = ? WHERE `id` = ?");
        $stmt->execute([$status, $id]);

        jsonResponse([
            "success" => true,
            "message" => "Reservation status updated to $status."
        ]);
    } catch (PDOException $e) {
        jsonResponse(["success" => false, "message" => $e->getMessage()], 500);
    }
}

jsonResponse(["success" => false, "message" => "Method not allowed."], 405);
