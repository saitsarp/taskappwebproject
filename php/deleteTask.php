<?php
$servername = "localhost";
$username = "root";
$password = "";

$conn = new PDO("mysql:host=$servername;dbname=taskappdb", $username, $password);  
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$id = $_POST["id"];

$stmt = $conn->prepare("DELETE FROM `tasks` WHERE id = ?");
$stmt->execute([$id]);
echo "ok";
?>