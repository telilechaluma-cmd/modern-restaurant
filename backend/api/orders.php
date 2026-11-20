<?php
/**
 * TALILE Restaurant - Orders API
 * Endpoint: /backend/api/orders.php
 */

require_once __DIR__ . '/../config/db.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'];

// 1. POST: Place New Food Order
if ($method === 'POST') {
    $input = getJsonInput();

    $id             = $input['id'] ?? ('TAL-' . rand(10000, 99999));
    $orderNumber    = $input['orderNumber'] ?? $id;
    $customerInfo   = $input['customerInfo'] ?? [];
    $customerName   = trim($customerInfo['fullName'] ?? $input['customerName'] ?? 'Guest Customer');
    $phoneNumber    = trim($customerInfo['phoneNumber'] ?? $input['phoneNumber'] ?? '');
    $email          = trim($customerInfo['email'] ?? $input['email'] ?? '');
    $subCity        = $customerInfo['subCity'] ?? 'Bole';
    $deliveryAddress= $customerInfo['deliveryAddress'] ?? 'Addis Ababa';
    $landmark       = $customerInfo['landmark'] ?? '';
    $orderType      = $input['orderType'] ?? 'Delivery';
    $paymentMethod  = $input['paymentMethod'] ?? 'Telebirr';
    $paymentStatus  = $input['paymentStatus'] ?? 'Pending';
    $subtotal       = floatval($input['subtotal'] ?? 0);
    $deliveryFee    = floatval($input['deliveryFee'] ?? 0);
    $discount       = floatval($input['discount'] ?? 0);
    $totalAmount    = floatval($input['totalAmount'] ?? ($subtotal + $deliveryFee - $discount));
    $orderNotes     = $input['notes'] ?? $customerInfo['orderNotes'] ?? '';
    $items          = $input['items'] ?? [];

    if (empty($customerName) || empty($phoneNumber)) {
        jsonResponse(["success" => false, "message" => "Customer name and phone number are required."], 400);
    }

    try {
        $pdo->beginTransaction();

        $stmt = $pdo->prepare("
            INSERT INTO `orders` 
            (`id`, `order_number`, `customer_name`, `phone_number`, `email`, `delivery_subcity`, `delivery_address`, `landmark`, `order_type`, `order_status`, `payment_method`, `payment_status`, `subtotal`, `delivery_fee`, `discount`, `total_amount`, `notes`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', ?, ?, ?, ?, ?, ?, ?)
        ");

        $stmt->execute([
            $id,
            $orderNumber,
            $customerName,
            $phoneNumber,
            $email,
            $subCity,
            $deliveryAddress,
            $landmark,
            $orderType,
            $paymentMethod,
            $paymentStatus,
            $subtotal,
            $deliveryFee,
            $discount,
            $totalAmount,
            $orderNotes
        ]);

        // Insert Order Line Items
        if (!empty($items) && is_array($items)) {
            $itemStmt = $pdo->prepare("
                INSERT INTO `order_items` 
                (`order_id`, `menu_item_id`, `item_name`, `quantity`, `unit_price`, `total_price`, `portion`, `spice_level`)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ");

            foreach ($items as $it) {
                $foodId    = $it['foodItem']['id'] ?? $it['id'] ?? 'item-01';
                $foodName  = $it['foodItem']['name'] ?? $it['name'] ?? 'Dish';
                $qty       = intval($it['quantity'] ?? 1);
                $unitPrice = floatval($it['unitPrice'] ?? $it['price'] ?? 0);
                $lineTotal = $qty * $unitPrice;
                $portion   = $it['selectedPortion'] ?? '';
                $spice     = $it['selectedSpiceLevel'] ?? '';

                $itemStmt->execute([
                    $id,
                    $foodId,
                    $foodName,
                    $qty,
                    $unitPrice,
                    $lineTotal,
                    $portion,
                    $spice
                ]);
            }
        }

        $pdo->commit();

        jsonResponse([
            "success" => true,
            "message" => "Order placed successfully!",
            "order" => [
                "id"            => $id,
                "orderNumber"   => $orderNumber,
                "customerName"  => $customerName,
                "phoneNumber"   => $phoneNumber,
                "totalAmount"   => $totalAmount,
                "orderStatus"   => "Pending",
                "paymentMethod" => $paymentMethod,
                "createdAt"     => date('c')
            ]
        ], 201);
    } catch (PDOException $e) {
        $pdo->rollBack();
        jsonResponse(["success" => false, "message" => "Database error: " . $e->getMessage()], 500);
    }
}

// 2. GET: List All Orders or Specific Order By ID / Number
if ($method === 'GET') {
    $orderId = $_GET['id'] ?? $_GET['order_number'] ?? null;

    try {
        if ($orderId) {
            $stmt = $pdo->prepare("SELECT * FROM `orders` WHERE `id` = ? OR `order_number` = ? LIMIT 1");
            $stmt->execute([$orderId, $orderId]);
            $order = $stmt->fetch();

            if (!$order) {
                jsonResponse(["success" => false, "message" => "Order not found."], 404);
            }

            // Fetch Line Items
            $itemStmt = $pdo->prepare("SELECT * FROM `order_items` WHERE `order_id` = ?");
            $itemStmt->execute([$order['id']]);
            $order['items'] = $itemStmt->fetchAll();

            jsonResponse(["success" => true, "order" => $order]);
        }

        // List Orders (with optional status filter)
        $status = $_GET['status'] ?? null;
        $sql = "SELECT * FROM `orders` WHERE 1=1";
        $params = [];

        if ($status) {
            $sql .= " AND `order_status` = ?";
            $params[] = $status;
        }

        $sql .= " ORDER BY `created_at` DESC LIMIT 100";

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $orders = $stmt->fetchAll();

        jsonResponse([
            "success" => true,
            "count"   => count($orders),
            "orders"  => $orders
        ]);
    } catch (PDOException $e) {
        jsonResponse(["success" => false, "message" => $e->getMessage()], 500);
    }
}

// 3. PUT: Update Order Status
if ($method === 'PUT') {
    $input  = getJsonInput();
    $id     = $input['id'] ?? $_GET['id'] ?? null;
    $status = $input['orderStatus'] ?? $input['status'] ?? null;

    if (!$id || !$status) {
        jsonResponse(["success" => false, "message" => "Order id and new orderStatus are required."], 400);
    }

    try {
        $stmt = $pdo->prepare("UPDATE `orders` SET `order_status` = ? WHERE `id` = ?");
        $stmt->execute([$status, $id]);

        jsonResponse(["success" => true, "message" => "Order status updated to $status."]);
    } catch (PDOException $e) {
        jsonResponse(["success" => false, "message" => $e->getMessage()], 500);
    }
}

jsonResponse(["success" => false, "message" => "Method not allowed."], 405);
