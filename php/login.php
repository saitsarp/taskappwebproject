<?php
$servername = "localhost";
$username = "root";
$password = "";

session_start();

$conn = new PDO("mysql:host=$servername;dbname=taskappdb", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$user = $_POST["username"];
$pass = $_POST["password"];
$stmt = $conn->query("SELECT * FROM `users` WHERE username = '$user' AND password = '$pass'");
$result = $stmt->fetch();
if ($result == false) {
    echo 0;
} else {
	$_SESSION["username"] = $result["username"];
	$_SESSION["userid"] = $result["id"];
	$_SESSION["name"] = $result["name"];
	$_SESSION["surname"] = $result["surname"];

	if ($result["group"] == 1) {
		$id = $result["id"];
		$statement = $conn->query("SELECT * FROM `tasks` WHERE personel = '$id'");
		$result["tasks"] = $statement->fetchAll();

		$curdate = time();
		foreach ($result["tasks"] as $val) {
			if ($val["status"] == "open" || $val["status"] == "active") {
				if ($curdate > $val["date"]) {
					$conn->prepare("UPDATE `tasks` SET `status` = ? WHERE `id` = ?")->execute(["expired", $val["id"]]);
					$val["status"] = "expired";
				}
			}
		}
	} else if ($result["group"] == 2) {
		$statement = $conn->query("SELECT * FROM `tasks`");
		$result["tasks"] = $statement->fetchAll();

		$curdate = time();
		foreach ($result["tasks"] as $val) {
			if ($val["status"] == "open" || $val["status"] == "active") {
				if ($curdate > $val["date"]) {
					$conn->prepare("UPDATE `tasks` SET `status` = ? WHERE `id` = ?")->execute(["expired", $val["id"]]);
					$val["status"] = "expired";
				}
			}
		}
	}
    echo json_encode($result);
}
?>
