var currentChat = null
var updateInterval = false

var messages = []
var users = []

function findUser(id) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            return users[i]
        }
    }
    return false
}

function findChat(id) {
    for (let i = 0; i < messages.length; i++) {
        if (messages[i].id == id) {
            return messages[i]
        }
    }
    return false
}

var post = (url, data) => new Promise((res) => {
    var http = new XMLHttpRequest()
    http.open('POST', url, true)
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            // console.log(http.responseText)
            res(http.responseText)
        }
    }
    http.send(data)
}) 

function openChat(id) {
    if (!id) return
    clearInterval(updateInterval)
    let innerHTML = ""
    
    post("/getChat.php", `chatid=${id}`).then((res) => {
        res = JSON.parse(res)
        res.sort((a, b) => { return a.date > b.date })

        // console.log(res)

        for (let i = 0; i < res.length; i++) {
            if (res[i].sender == myid) {
                innerHTML +=
                `<div id="c-${res[i].id}" class="chat-entry right">
                    <div>${res[i].message}</div>
                </div>`
            } else {
                innerHTML +=
                `<div id="c-${res[i].id}" class="chat-entry left">
                    <div>${res[i].message}</div>
                </div>`
            }
        }

        document.getElementById("chat-last-" + currentChat).innerText = res[res.length - 1].message
        document.getElementById("chat-window").innerHTML = innerHTML
    })

    currentChat = id
    document.getElementById("chat-name").innerText = document.getElementById("chat-name-" + id).innerText

    updateInterval = setInterval(() => {
        openChat(currentChat)
    }, 1000)
}

function openMessages(m, u) {
    messages = m
    users = u
    let innerHTML = ""

    for (let i = 0; i < messages.length; i++) {
        let user = messages[i].user1 == myid ? findUser(messages[i].user2) : findUser(messages[i].user1)
        innerHTML +=
        `<div class="messages-entry" onclick="openChat(${messages[i].id})">
            <img src="test/assets/user.png">
            <div class="messages-text-wrap">
                <div id="chat-name-${messages[i].id}" class="messages-name">${user.name} ${user.surname}</div>
                <div id="chat-last-${messages[i].id}" class="messages-last">${messages[i].last}</div>
            </div>
        </div>`
    }

    document.getElementById("messages-list").innerHTML = innerHTML
}

function sendMessage() {
    if (!currentChat) {
        alert("İlk önce bir sohbet açman lazım.")
        return
    }

    let message = document.getElementById("chat-input").value

    console.log("message", message)

    if (message == "") {
        alert("Boş mesaj gönderemezsin!")
        return
    }

    let chat = findChat(currentChat)
    let receiver = chat.user1 == myid ? chat.user2 : chat.user1
    let date = new Date().getTime()

    let tempmsg = document.createElement("div")
    tempmsg.classList.add("chat-entry", "right")
    tempmsg.innerHTML = "<div>" + message + "</div>"

    document.getElementById("chat-window").append(tempmsg)
    document.getElementById("chat-last-" + currentChat).innerText = message

    post("/sendMessage.php", `chatid=${currentChat}&sender=${myid}&receiver=${receiver}&message=${message}&date=${date}`)

    document.getElementById("chat-input").value = ""
}

var currentNewMessageUser = false

function openSendNewMessage() {
    let innerHTML = ""
    for (let i = 0; i < users.length; i++) {
        if (users[i].id != myid) {
            if (messages.length > 0){
                innerLoop:
                for (let n = 0; n < messages.length; n++) {
                    if (messages[n].user1 != users[i].id && messages[n].user2 != users[i].id) {
                        innerHTML += `<div id="newmsg-user-${users[i].id}" onclick="selectNewMessageTarget(${users[i].id})">${users[i].name} ${users[i].surname}</div>`
                        break innerLoop
                    }
                }
            } else {
                innerHTML += `<div id="newmsg-user-${users[i].id}" onclick="selectNewMessageTarget(${users[i].id})">${users[i].name} ${users[i].surname}</div>`
            }
        }
    }
    document.getElementById("newmsg-userlist").innerHTML = innerHTML
    document.getElementById("newmsg-window-wrapper").style.display = "flex"
}

function closeSendNewMessage() {
    currentNewMessageUser = false
    document.getElementById("newmsg-window-wrapper").style.display = "none"
    document.getElementById("newmsg-userlist").innerHTML = ""
    document.getElementById("newmsg-message-input").value = ""
}

function selectNewMessageTarget(id) {
    if (currentNewMessageUser == id) {
        document.getElementById("newmsg-user-" + id).classList.remove("selected")
        currentNewMessageUser = false
        return
    }
    if (currentNewMessageUser) {
        document.getElementById("newmsg-user-" + currentNewMessageUser).classList.remove("selected")
    }
    document.getElementById("newmsg-user-" + id).classList.add("selected")
    currentNewMessageUser = id
}

function sendNewMessage() {
    if (!currentNewMessageUser) {
        alert("Mesaj göndermeden önce kişi seçmen lazım.")
        return
    }

    let message = document.getElementById("newmsg-message-input").value

    if (message == "") {
        alert("Mesaj yazmadın baboli.")
        return
    }

    let date = new Date().getTime()

    post("/sendNewMessage.php", `sender=${myid}&receiver=${currentNewMessageUser}&message=${message}&date=${date}`).then((res) => {
        res = Number(res)
        let tempmessage = document.createElement("div")
        let appendarea = document.getElementById("messages-list")
        appendarea.insertBefore(tempmessage, appendarea.children[appendarea.children.length - 1])

        let user = findUser(currentNewMessageUser)

        tempmessage.outerHTML =
        `<div class="messages-entry" onclick="openChat(${res})">
            <img src="test/assets/user.png">
            <div class="messages-text-wrap">
                <div id="chat-name-${res}" class="messages-name">${user.name} ${user.surname}</div>
                <div id="chat-last-${res}" class="messages-last">${message}</div>
            </div>
        </div>`
        openChat(res)
        closeSendNewMessage()
    })
}

function logout() {
    window.localStorage.setItem("sait-loginInfo", "")
    window.location = "test/index.html"
}