<?php
$servername = "localhost";
$username = "root";
$password = "";

$conn = new PDO("mysql:host=$servername;dbname=taskappdb", $username, $password);  
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$taskid = $_POST["taskid"];
$userid = $_POST["userid"];
$action = $_POST["action"];

if ($action == "accept") {
    $conn->prepare("UPDATE `tasks` SET `status` = 'active' WHERE `id` = ?");->execute([$taskid]);
} else if ($action == "deliver") {
    $conn->prepare("UPDATE `tasks` SET `status` = 'delivered' WHERE `id` = ?");->execute([$taskid]);
}

echo "ok";
?>