<?php
include 'db.php';
session_start();

if (!isset($_SESSION['user_id'])) {
  echo "unauthorized";
  exit;
}

$name = $_POST['product_name'];
$user_id = $_SESSION['user_id'];

$image = $_FILES['image'];
$targetDir = "uploads/";
$imageName = time() . '_' . basename($image['name']);
$targetFile = $targetDir . $imageName;

if (move_uploaded_file($image["tmp_name"], $targetFile)) {
  $stmt = $conn->prepare("INSERT INTO products (user_id, name, image) VALUES (?, ?, ?)");
  $stmt->bind_param("iss", $user_id, $name, $imageName);
  $stmt->execute();
  echo "success";
} else {
  echo "upload_error";
}
?>
