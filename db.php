<?php
$host = 'localhost';
$user = 'root';
$pass = '5221040728';
$dbname = 'agrilink_db';

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
