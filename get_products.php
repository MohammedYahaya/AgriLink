<?php
include 'db.php';
$result = $conn->query("SELECT p.*, u.full_name FROM products p JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC");

$products = [];

while ($row = $result->fetch_assoc()) {
  $products[] = $row;
}

echo json_encode($products);
?>
