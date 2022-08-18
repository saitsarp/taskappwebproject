<?php
$servername = "localhost";
$username = "root";
$password = "";

session_start();

$conn = new PDO("mysql:host=$servername;dbname=taskappdb", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$id = $_SESSION["userid"];

$messages = $conn->query("SELECT * FROM `messages` WHERE user1 = '$id' OR user2 = '$id'")->fetchAll();
$users = $conn->query("SELECT id, name, surname FROM `users`")->fetchAll();

?>

<!DOCTYPE html>
<html lan="en" and dir="Itr">
<head>
    <meta charset="utf-8">
    <title>Mesajlarım</title>
    <link rel="stylesheet" href="test/style/style.css?v1">
    <link rel="stylesheet" href="test/style/admin.css?v1">
    <link rel="stylesheet" href="test/style/user.css?v1">
    <link rel="stylesheet" href="test/style/messages.css?v1">
</head>
<body>
    <div id="page-wrapper">
        <div id="main-wrap">
            <div id="left-side">
                <div id="left-side-head">
                <img src="test/assets/header.png">
                <span id="name-surname"><?php echo $_SESSION["name"] . " " . $_SESSION["surname"]; ?></span>
                </div>
                <div id="left-side-buttons">
                    <button onclick="window.location='test/index.html'">Görev Paneli</button>
                    <button onclick="window.reload()">Mesajlarım</button>
                    <button onclick="logout()">Çıkış Yap</button>
                </div>
            </div>
            <div id="right-side" style="justify-content: center; gap: 20px;">
                <div id="messages">
                    <div id="messages-header">
                        <div>Mesajlarım</div>
                        <div id="messages-new" onclick="openSendNewMessage()">
                            <img src="test/assets/plus.png">
                            <div>Yeni Mesaj</div>
                        </div>
                    </div>
                    <div id="messages-list"></div>
                </div>
                <div id="chat">
                    <div id="chat-name"></div>
                    <div id="chat-window"></div>
                    <div id="chat-controls">
                        <input type="text" id="chat-input" placeholder="Bir şeyler yaz...">
                        <img src="test/assets/send.png" onclick="sendMessage()">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="newmsg-window-wrapper">
        <div id="newmsg-window">
            <div id="newmsg-header">
                <div>Yeni Mesaj</div>
                <img src="test/assets/close.png" onclick="closeSendNewMessage()">
            </div>
            <div id="newmsg-userlist"></div>
            <div id="newmsg-controls">
                <input type="text" id="newmsg-message-input" placeholder="Yeni mesajın...">
                <img onclick="sendNewMessage()" src="test/assets/send.png">
            </div>
        </div>
    </div>
    <!-- <script src="test/script/script.js?v=1"></script> -->
    <script src="test/script/messages.js"></script>
    <script>
        const myid = <?php echo $id; ?>;
        openMessages(<?php echo json_encode($messages) . ", " . json_encode($users) ?>);
    </script>
</body>
</html>