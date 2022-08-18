<?php
$servername = "localhost";
$username = "root";
$password = "";

$conn = new PDO("mysql:host=$servername;dbname=taskappdb", $username, $password);  
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$personnel = $_POST["personnel"];
$desc = $_POST["desc"];
$date = $_POST["date"];
$name = $conn->query("SELECT `name`, `surname` FROM `users` WHERE `id` = '$personnel'")->fetch();

$stmt = $conn->prepare("INSERT INTO `tasks` (`personel`, `desc`, `date`, `name`, `status`) VALUES (?, ?, ?, ?, ?)");
$stmt->execute([$personnel, $desc, $date, $name["name"] . " " . $name["surname"], "open"]);
echo "ok";
?>