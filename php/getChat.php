<?php
$servername = "localhost";
$username = "root";
$password = "";

$conn = new PDO("mysql:host=$servername;dbname=taskappdb", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$id = $_POST["chatid"];

$stmt = $conn->query("SELECT * FROM `chat` WHERE `chatid` = '$id'");
$result = $stmt->fetchAll();
echo json_encode($result);
?>