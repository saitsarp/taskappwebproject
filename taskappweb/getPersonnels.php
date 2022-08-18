<?php
$servername = "localhost";
$username = "root";
$password = "";

$conn = new PDO("mysql:host=$servername;dbname=taskappdb", $username, $password);
  
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$stmt = $conn->query("SELECT `id`, `name`, `surname` FROM `users` WHERE `group` = 1");
$result = $stmt->fetchAll();
echo json_encode($result);
?>