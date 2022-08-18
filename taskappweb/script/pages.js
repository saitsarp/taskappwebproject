const Pages = {
    ["login.html"]: `
    <form class="login-box" action="localhost/login.php" method="POST">
        <h1>
            taskapp login
        </h1>
        <input type="text" name="" placeholder="Kullanici Adi Gir" id="kullaniciadi">
        <input type="password" name="" placeholder="Sifre Gir" id="sifre">
        <input id="login-button" type="button" name="" value="Login" onclick="tryLogin()" >
    </form>
    <script src="login.js"> </script>
    `,
    ["user.html"]: `
    <div id="main-wrap">
            <div id="left-side">
                <div id="left-side-head">
                    <img src="assets/header.png">
                    <span>saitsarp</span>
                </div>
                <div id="left-side-buttons">
                    <button>Görev Paneli</button>
                    <button>Mesajlarım</button>
                    <button onclick="logout()">Çıkış Yap</button>
                </div>
            </div>
            <div id="right-side"></div>
        </div>
    `,
    ["admin.html"]: `
    <div id="main-wrap">
        <div id="left-side">
            <div id="left-side-head">
            <img src="assets/header.png">
                <span>Yönetici İsmi</span>
            </div>
            <div id="left-side-buttons">
                <button>Görev Paneli</button>
                <button>Mesajlarım</button>
                <button onclick="logout()">Çıkış Yap</button>
            </div>
        </div>
        <div id="right-side">
            <div class="window">
                <div class="window-top">
                    Yeni Görev Oluştur
                </div>
                <div id="new-task-body" class="window-body">
                    <div id="new-task-head">
                        <div>
                            <div id="new-task-user">Personel Seç <span>v</span></div>
                            <div id="new-task-user-dropdown">
                                <span>Sarpsait</span>
                                <span>Saitsarp</span>
                                <span>Ahmetsarp</span>
                            </div>
                        </div>
                        <div>
                            <input type="datetime-local" name="" id="">
                        </div>
                    </div>
                    <div id="new-task-text-wrap">
                        <div>Görev Açıklaması:</div>
                        <textarea name="" id="new-test-desc" cols="30" rows="10" ></textarea>
                    </div>
                    <div id="new-task-create">Oluştur</div>
                </div>
            </div>
            <div class="window">
                <div class="window-top">
                    Aktif Görev Listesi
                </div>
                <div id="task-list-body" class="window-body">
                    <div id="task-list">
                        <div class="task-list-entry">
                            <div class="task-list-entry-name">Personel saitsarp</div>
                            <div class="task-list-entry-status">Teslim Edildi</div>
                            <img class="task-list-entry-delete" src="user/img/delete.png">
                        </div>
                        <div class="task-list-entry">
                            <div class="task-list-entry-name">Personel saitsarp</div>
                            <div class="task-list-entry-status">Teslim Edildi</div>
                            <img class="task-list-entry-delete" src="user/img/delete.png">
                        </div>
                        <div class="task-list-entry">
                            <div class="task-list-entry-name">Personel saitsarp</div>
                            <div class="task-list-entry-status">Teslim Edildi</div>
                            <img class="task-list-entry-delete" src="user/img/delete.png">
                        </div>
                        <div class="task-list-entry">
                            <div class="task-list-entry-name">Personel saitsarp</div>
                            <div class="task-list-entry-status">Teslim Edildi</div>
                            <img class="task-list-entry-delete" src="user/img/delete.png">
                        </div>
                        <div class="task-list-entry">
                            <div class="task-list-entry-name">Personel saitsarp</div>
                            <div class="task-list-entry-status">Teslim Edildi</div>
                            <img class="task-list-entry-delete" src="user/img/delete.png">
                        </div>
                        <div class="task-list-entry">
                            <div class="task-list-entry-name">Personel saitsarp</div>
                            <div class="task-list-entry-status">Teslim Edildi</div>
                            <img class="task-list-entry-delete" src="user/img/delete.png">
                        </div>
                        <div class="task-list-entry">
                            <div class="task-list-entry-name">Personel saitsarp</div>
                            <div class="task-list-entry-status">Teslim Edildi</div>
                            <img class="task-list-entry-delete" src="user/img/delete.png">
                        </div>
                        <div class="task-list-entry">
                            <div class="task-list-entry-name">Personel saitsarp</div>
                            <div class="task-list-entry-status">Teslim Edildi</div>
                            <img class="task-list-entry-delete" src="user/img/delete.png">
                        </div>
                        <div class="task-list-entry">
                            <div class="task-list-entry-name">Personel saitsarp</div>
                            <div class="task-list-entry-status">Teslim Edildi</div>
                            <img class="task-list-entry-delete" src="user/img/delete.png">
                        </div>
                        <div class="task-list-entry">
                            <div class="task-list-entry-name">Personel saitsarp</div>
                            <div class="task-list-entry-status">Teslim Edildi</div>
                            <img class="task-list-entry-delete" src="user/img/delete.png">
                        </div>
                        <div class="task-list-entry">
                            <div class="task-list-entry-name">Personel saitsarp</div>
                            <div class="task-list-entry-status">Teslim Edildi</div>
                            <img class="task-list-entry-delete" src="user/img/delete.png">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
}