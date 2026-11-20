<?php
/**
 * TALILE Restaurant - Menu & Categories API
 * Endpoint: /backend/api/menu.php
 */

require_once __DIR__ . '/../config/db.php';

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'];

// 1. GET: Fetch Categories and Menu Items
if ($method === 'GET') {
    try {
        $catStmt = $pdo->query("SELECT * FROM `categories` ORDER BY `name` ASC");
        $categories = $catStmt->fetchAll();

        $categoryId = $_GET['category'] ?? null;
        if ($categoryId && $categoryId !== 'all') {
            $itemStmt = $pdo->prepare("SELECT * FROM `menu_items` WHERE `category_id` = ? ORDER BY `is_popular` DESC, `name` ASC");
            $itemStmt->execute([$categoryId]);
        } else {
            $itemStmt = $pdo->query("SELECT * FROM `menu_items` ORDER BY `is_popular` DESC, `name` ASC");
        }
        $items = $itemStmt->fetchAll();

        // Format items
        $formattedItems = array_map(function($i) {
            return [
                "id"             => $i['id'],
                "name"           => $i['name'],
                "amharicName"    => $i['amharic_name'],
                "oromoName"      => $i['oromo_name'],
                "description"    => $i['description'],
                "price"          => floatval($i['price']),
                "category"       => $i['category_id'],
                "imageUrl"       => $i['image_url'],
                "isAvailable"    => (bool)$i['is_available'],
                "isPopular"      => (bool)$i['is_popular'],
                "isChefSpecial"  => (bool)$i['is_chef_special'],
                "preparationTime"=> $i['preparation_time'],
                "calories"       => intval($i['calories']),
                "spiceLevel"     => $i['spice_level'],
                "rating"         => floatval($i['rating']),
                "reviewCount"    => intval($i['review_count'])
            ];
        }, $items);

        jsonResponse([
            "success"    => true,
            "categories" => $categories,
            "items"      => $formattedItems
        ]);
    } catch (PDOException $e) {
        jsonResponse(["success" => false, "message" => $e->getMessage()], 500);
    }
}

// 2. POST: Add New Menu Item (Admin)
if ($method === 'POST') {
    $input = getJsonInput();

    $id             = $input['id'] ?? ('item-' . time());
    $name           = trim($input['name'] ?? '');
    $amharicName    = trim($input['amharicName'] ?? '');
    $oromoName      = trim($input['oromoName'] ?? '');
    $description    = trim($input['description'] ?? '');
    $price          = floatval($input['price'] ?? 0);
    $categoryId     = $input['category'] ?? 'cat-lunch-dinner';
    $imageUrl       = $input['imageUrl'] ?? 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c';
    $isAvailable    = isset($input['isAvailable']) ? (int)$input['isAvailable'] : 1;
    $isPopular      = isset($input['isPopular']) ? (int)$input['isPopular'] : 0;
    $isChefSpecial  = isset($input['isChefSpecial']) ? (int)$input['isChefSpecial'] : 0;
    $prepTime       = $input['preparationTime'] ?? '20-30 mins';
    $spiceLevel     = $input['spiceLevel'] ?? 'Mild';

    if (empty($name) || $price <= 0) {
        jsonResponse(["success" => false, "message" => "Valid item name and price are required."], 400);
    }

    try {
        $stmt = $pdo->prepare("
            INSERT INTO `menu_items` 
            (`id`, `name`, `amharic_name`, `oromo_name`, `description`, `price`, `category_id`, `image_url`, `is_available`, `is_popular`, `is_chef_special`, `preparation_time`, `spice_level`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        $stmt->execute([
            $id, $name, $amharicName, $oromoName, $description, $price, $categoryId, $imageUrl,
            $isAvailable, $isPopular, $isChefSpecial, $prepTime, $spiceLevel
        ]);

        jsonResponse(["success" => true, "message" => "Menu item added successfully!", "id" => $id], 201);
    } catch (PDOException $e) {
        jsonResponse(["success" => false, "message" => $e->getMessage()], 500);
    }
}

// 3. PUT: Update Item (Price, Availability, etc.)
if ($method === 'PUT') {
    $input = getJsonInput();
    $id = $input['id'] ?? $_GET['id'] ?? null;

    if (!$id) {
        jsonResponse(["success" => false, "message" => "Item id is required."], 400);
    }

    try {
        // Toggle availability or update fields
        if (isset($input['isAvailable'])) {
            $stmt = $pdo->prepare("UPDATE `menu_items` SET `is_available` = ? WHERE `id` = ?");
            $stmt->execute([(int)$input['isAvailable'], $id]);
        }
        if (isset($input['price'])) {
            $stmt = $pdo->prepare("UPDATE `menu_items` SET `price` = ? WHERE `id` = ?");
            $stmt->execute([floatval($input['price']), $id]);
        }

        jsonResponse(["success" => true, "message" => "Menu item updated successfully."]);
    } catch (PDOException $e) {
        jsonResponse(["success" => false, "message" => $e->getMessage()], 500);
    }
}

// 4. DELETE: Remove Item
if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) {
        jsonResponse(["success" => false, "message" => "Item id is required."], 400);
    }

    try {
        $stmt = $pdo->prepare("DELETE FROM `menu_items` WHERE `id` = ?");
        $stmt->execute([$id]);
        jsonResponse(["success" => true, "message" => "Menu item deleted successfully."]);
    } catch (PDOException $e) {
        jsonResponse(["success" => false, "message" => $e->getMessage()], 500);
    }
}

jsonResponse(["success" => false, "message" => "Method not allowed."], 405);
