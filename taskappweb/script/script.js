var taskDescCache = {}
var myid = false

var sendPost = (url, username, pass) => new Promise((res) => {
    var http = new XMLHttpRequest()
    var params = 'username=' + username + '&password=' + pass
    http.open('POST', url, true)
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            console.log(http.responseText)
            res(http.responseText)
        }
    }
    http.send(params)
})

var post = (url, data) => new Promise((res) => {
    var http = new XMLHttpRequest()
    http.open('POST', url, true)
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            console.log(http.responseText)
            res(http.responseText)
        }
    }
    http.send(data)
})

function dateFormat(d) {
    let date = new Date(d * 1000)
    let day = date.getDate()
    let month = date.getMonth() + 1
    let hours = date.getHours()
    let mins = date.getMinutes()

    day = day < 10 ? "0" + day : day
    month = month < 10 ? "0" + month : month
    hours = hours < 10 ? "0" + hours : hours
    mins = mins < 10 ? "0" + mins : mins
    return day + "/" + month + "/" + date.getFullYear() + " - " + hours + ":" + mins
}

function openPage(page, extra) {
    if (page == "login.html") {
        document.getElementById("page-wrapper").innerHTML = Pages["login.html"]
    } else if (page == "user.html") {
        //document.getElementById("page-wrapper").innerHTML = Pages["user.html"]
        document.getElementById("page-wrapper").innerHTML = `
        <div id="main-wrap">
            <div id="left-side">
                <div id="left-side-head">
                <img src="assets/header.png">
                <span>${extra.name} ${extra.surname}</span>
                </div>
                <div id="left-side-buttons">
                    <button onclick="window.reload()">Görev Paneli</button>
                    <button onclick="window.location='/messages.php'">Mesajlarım</button>
                    <button onclick="logout()">Çıkış Yap</button>
                </div>
            </div>
            <div id="right-side">
                <div id="task-window">
                    <div id="task-header">Görevleriniz</div>
                    <div id="task-list"></div>
                </div>
            </div>
        </div>
        `
    } else if (page == "admin.html") {
        let tasksHTML = ""

        for (let i = 0; i < extra.tasks.length; i++) {
            taskDescCache[extra.tasks[i].id] = extra.tasks[i].desc
            let statusHTML
            if (extra.tasks[i].status == "delivered") {
                statusHTML = `<div class="task-list-entry-status delivered" onmouseover="displayTimeTooltip(event, '${dateFormat(extra.tasks[i].date)}')" onmouseout="hideTimeTooltip()">Teslim Edildi</div>`
            } else if (extra.tasks[i].status == "active") {
                statusHTML = `<div class="task-list-entry-status active" onmouseover="displayTimeTooltip(event, '${dateFormat(extra.tasks[i].date)}')" onmouseout="hideTimeTooltip()">Teslim Alındı</div>`
            } else if (extra.tasks[i].status == "open") {
                statusHTML = `<div class="task-list-entry-status open" onmouseover="displayTimeTooltip(event, '${dateFormat(extra.tasks[i].date)}')" onmouseout="hideTimeTooltip()">Beklemede</div>`
            } else if (extra.tasks[i].status == "expired") {
                statusHTML = `<div class="task-list-entry-status expired" onmouseover="displayTimeTooltip(event, '${dateFormat(extra.tasks[i].date)}')" onmouseout="hideTimeTooltip()">Süre Aşımı</div>`
            }
            tasksHTML +=
            `<div id="task-${extra.tasks[i].id}" class="task-list-entry">
                <div class="task-list-entry-name">${extra.tasks[i].name}</div>
                ${statusHTML}
                <img class="task-list-entry-peek" onclick="peekDesc(${extra.tasks[i].id})" src="user/img/desc.png">
                <img class="task-list-entry-delete" onclick="deleteTask(${extra.tasks[i].id})" src="user/img/delete.png">
            </div>`
        }

        //document.getElementById("page-wrapper").innerHTML = Pages["admin.html"]
        document.getElementById("page-wrapper").innerHTML = `
        <div id="main-wrap">
            <div id="left-side">
                <div id="left-side-head">
                <img src="assets/header.png">
                <span>${extra.name} ${extra.surname}</span>
                </div>
                <div id="left-side-buttons">
                    <button onclick="window.reload()">Görev Paneli</button>
                    <button onclick="window.location='/messages.php'">Mesajlarım</button>
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
                                <div id="new-task-user" onclick="openPersonnelDropdown()">Personel Seç <span>v</span></div>
                                <div id="new-task-user-dropdown"></div>
                            </div>
                            <div>
                                <input type="datetime-local" name="" id="new-task-date">
                            </div>
                        </div>
                        <div id="new-task-text-wrap">
                            <div>Görev Açıklaması:</div>
                            <textarea name="" id="new-test-desc" cols="30" rows="10" ></textarea>
                        </div>
                        <div id="new-task-create" onclick="createTask()">Oluştur</div>
                    </div>
                </div>
                <div class="window">
                    <div class="window-top">
                        Görev Listesi
                    </div>
                    <div id="task-list-body" class="window-body">
                        <div id="task-list">
                            ${tasksHTML}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="date-tooltip"></div>
        <div id="desc-tooltip">
            <div></div>
            <img onclick="closeDesc()" src="user/img/close.png">
        </div>`
    }
}

function tryLogin(uname, pass) {
    let username = uname ?? document.getElementById("kullaniciadi").value
    var password = pass ?? document.getElementById("sifre").value

    sendPost("/login.php", username, password).then((retval) => {
        if (retval == 0) {
            alert("Kullanıcı adı veya şifre hatalı.")
        } else {
            let loginInfo = JSON.parse(retval)
            myid = loginInfo.id
            loginInfo.lastlogin = new Date().getTime()

            if (loginInfo.group == 1) {
                window.localStorage.setItem("sait-loginInfo", JSON.stringify(loginInfo))
                openPage("user.html", loginInfo)
                buildTasks(loginInfo.tasks)
                alert("Personel kullanıcı girişi yapıldı.")
            } else if (loginInfo.group == 2) {
                console.log("admin", loginInfo)
                window.localStorage.setItem("sait-loginInfo", JSON.stringify(loginInfo))
                openPage("admin.html", loginInfo)
                alert("Yönetici kullanıcı girişi yapıldı.")
            }
        }
    }) 
}

function logout() {
    window.localStorage.setItem("sait-loginInfo", "")
    openPage("login.html")
}

function openPersonnelDropdown() {
    post("/getPersonnels.php").then((retval) => {
        retval = JSON.parse(retval)
        // console.log("retval", retval)

        let droplist = document.getElementById("new-task-user-dropdown")
        let innerHTML = ""

        for (let i = 0; i < retval.length; i++) {
            let name = retval[i].name + " " + retval[i].surname
            innerHTML += `<span onclick="personnelSelected(${retval[i].id}, '${name}')">${name}</span>`
        }

        droplist.innerHTML = innerHTML
        droplist.style.opacity = "1"
        droplist.style.pointerEvents = "all"
    })
}

let selectedPersonnel = false

function personnelSelected(id, name) {
    let droplist = document.getElementById("new-task-user-dropdown")
    droplist.style.opacity = "0"
    droplist.style.pointerEvents = "none"

    document.getElementById("new-task-user").innerHTML = `${name} <span>v</span>`
    selectedPersonnel = id
}

function createTask() {
    if (!selectedPersonnel) {alert("Lütfen personel seçiniz."); return}
    //let name = document.getElementById("new-task-user").textContent
    let desc = document.getElementById("new-test-desc").value
    let date = document.getElementById("new-task-date").value
    let datenow = Math.floor(Date.now() / 1000)
    if (desc == "") {alert("Lütfen açıklama kısmını doldurun."); return}
    if (date == "") {alert("Lütfen tarih kısmını doldurun."); return}
    date = Math.floor(new Date(date).getTime() / 1000)

    if(date < datenow) return alert("Geçmiş zamana görev oluşturulamaz.")

    post("/newTask.php", `personnel=${selectedPersonnel}&desc=${desc}&date=${date}`)

    document.getElementById("new-test-desc").value = ""
    document.getElementById("new-task-date").value = ""
    document.getElementById("new-task-user").innerHTML = `Personel Seç <span>v</span>`
    selectedPersonnel = false
    alert("Yeni görev oluşturuldu.")
    location.reload()
}

function deleteTask(id) {
    post("/deleteTask.php", "id=" + id).then(() => {
        alert("Görev silindi!")
        let task = document.getElementById("task-" + id)
        task.style.pointerEvents = "none"
        task.style.background = "rgb(250, 50, 50)"
        setTimeout(() => {
            task.remove()
        }, 1500)
    })
}

function buildTasks(tasks) {
    // console.log("buildTasks", tasks)
    let innerHTML = ""

    for (let i = 0; i < tasks.length; i++) {
        let button = ""
        if (tasks[i].status == "open") {
            button = `<div class="task-entry-button accept" onclick="acceptTask(${tasks[i].id})">Görevi Al</div>`
        } else if (tasks[i].status == "active") {
            button = `<div class="task-entry-button deliver" onclick="deliverTask(${tasks[i].id})">Teslim Et</div>`
        } else if (tasks[i].status == "delivered") {
            button = `<div class="task-entry-button delivered">Teslim Edildi</div>`
        } else if (tasks[i].status == "expired") {
            button = `<div class="task-entry-button expired">Süresi Geçti</div>`
        }
        innerHTML +=
        `
        <div class="task-entry">
            <div class="task-entry-desc">${tasks[i].desc}</div>
            <div class="task-entry-date">${dateFormat(tasks[i].date)}</div>
            <div class="task-entry-buttons">${button}</div>
        </div>
        `
    }

    document.getElementById("task-list").innerHTML = innerHTML
}

function acceptTask(id) {
    post("/updateTask.php", "taskid=" + id + "&userid=" + myid + "&action=accept")
    alert("Görev teslim alındı!")
    location.reload()
}

function deliverTask(id) {
    post("/updateTask.php", "taskid=" + id + "&userid=" + myid + "&action=deliver")
    alert("Görev teslim edildi!")
    location.reload()
}

function displayTimeTooltip(event, text) {
    let tooltip = document.getElementById("date-tooltip")
    let target = event.target.getBoundingClientRect()

    tooltip.innerText = text

    let width = tooltip.getBoundingClientRect().width

    tooltip.style.left = ((target.left + target.width / 2) - (width / 2)) + "px"
    tooltip.style.top = (target.bottom + 15) + "px"
    tooltip.style.opacity = "1"
}

function hideTimeTooltip() {
    document.getElementById("date-tooltip").style.opacity = "0"
}

function peekDesc(id) {
    if (!taskDescCache[id]) {
        alert("Açıklama bulunamadı.")
        return
    }

    let tooltip = document.getElementById("desc-tooltip")
    tooltip.children[0].innerText = taskDescCache[id]
    tooltip.style.display = "flex"
}

function closeDesc() {
    document.getElementById("desc-tooltip").style.display = "none"
}

(() => {
    let loginInfo = window.localStorage.getItem("sait-loginInfo")
    
    if (loginInfo) {
        loginInfo = JSON.parse(loginInfo)
        if (new Date().getTime() - loginInfo.lastlogin > 300000) {
            openPage("login.html")
        } else {
            tryLogin(loginInfo.username, loginInfo.password)
            // if (loginInfo.group == 1) {
            //     openPage("user.html", loginInfo)
            // } else if (loginInfo.group == 2) {
            //     openPage("admin.html", loginInfo)
            // }
        }
    } else {
        openPage("login.html")
    }
})();