<?php
$servername = "localhost";
$username = "root";
$password = "";

$conn = new PDO("mysql:host=$servername;dbname=taskappdb", $username, $password);  
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$chatid = $_POST["chatid"];
$sender = $_POST["sender"];
$receiver = $_POST["receiver"];
$message = $_POST["message"];
$date = $_POST["date"];

$conn->prepare("INSERT INTO `chat` (`chatid`, `sender`, `receiver`, `message`, `date`) VALUES (?, ?, ?, ?, ?)")->execute([$chatid, $sender, $receiver, $message, $date]);
$conn->prepare("UPDATE `messages` SET `last` = ? WHERE `id` = ?")->execute([$message, $chatid]);

echo "ok";
?>