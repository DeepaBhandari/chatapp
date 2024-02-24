## Chat App

I have used HTML, CSS, Javascript and Node(express) and socket.io to build basic Chat room app.

Here are the some of the steps on how you can install and code your chat app project.

### For server side (Node Express)

1. Installation of packages inside the node.

   `npm init`

2. Installation of express and socket.io

   ` npm install express socket.io ---save`

3. Make server.js file inside the app

4. setup express inside the server.js file

   ```javascript
   const express = require("express");
   const path = require("path");

   const app = express();
   const server = require("http").createServer(app);

   app.use(express.static(path.resolve("./public")));

   server.listen(5000, () => console.log("server started at 5000 port"));
   ```

### For Frontend

1. Create 3 files namely, 'code.js', 'index.html' and 'style.css'.

2. Include the style and script file inside the html file by
   ```html
   <!-- style file -->
   <link rel="stylesheet" type="text/css" href="style.css" />
   <!-- js files -->
   <script type="text/javascript" src="socket.io/socket.io.js"></script>
   <script type="text/javascript" src="code.js"></script>
   ```

### Configure Socket and App Listener

1. Add these lines in server.js file

   ```javascript
   const { Server } = require("socket.io");
   const io = new Server(server);

   io.on("connection", function (socket) {
     socket.on("newuser", function (username) {
       socket.broadcast.emit("update", `${username} joined the conversation`);
     });
     socket.on("exituser", function (username) {
       socket.broadcast.emit("update", `${username} left the conversation`);
     });
     socket.on("chat", function (message) {
       socket.broadcast.emit("chat", message);
     });
   });
   ```

2. Include this in "code.js" file

   ```javascript
   (function () {
     const app = document.querySelector(".app");
     const socket = io();

     let uname;

     app
       .querySelector(".join-screen #join-user")
       .addEventListener("click", () => {
         let username = app.querySelector(".join-screen #username")?.value;
         if (username?.length == 0) {
           return;
         }
         socket.emit("newuser", username);
         uname = username;
         app.querySelector(".join-screen").classList.remove("active");
         app.querySelector(".chat-screen ").classList.add("active");
       });
     app
       .querySelector(".chat-screen #send-message")
       .addEventListener("click", () => {
         let message = app.querySelector(".chat-screen #message-input")?.value;
         if (message?.length == 0) {
           return;
         }
         renderMessage("my", {
           username: uname,
           text: message,
         });
         socket.emit("chat", {
           username: uname,
           text: message,
         });
         app.querySelector(".chat-screen #message-input").value = "";
       });

     app
       .querySelector(".chat-screen #exit-chat")
       .addEventListener("click", () => {
         socket.emit("exituser", uname);
         window.location.href = window.location.href;
       });

     socket.on("update", (update) => {
       renderMessage("update", update);
     });
     socket.on("chat", (message) => {
       renderMessage("other", message);
     });
     const renderMessage = (type, message) => {
       let messageContainer = app.querySelector(".chat-screen .messages");
       if (type == "my") {
         let el = document.createElement("div");
         el.setAttribute("class", "message my-message");
         el.innerHTML = ` <div>
            <div class="name">
               You
            </div>
            <div class="text">${message.text}</div>  
        </div>`;
         messageContainer.appendChild(el);
       } else if (type == "other") {
         let el = document.createElement("div");
         el.setAttribute("class", "message other-message");
         el.innerHTML = ` <div>
            <div class="name">
                ${message.username}
            </div>
            <div class="text">${message.text}</div>  
        </div>`;
         messageContainer.appendChild(el);
       } else if (type == "update") {
         let el = document.createElement("div");
         el.setAttribute("class", "update");
         el.innerText = message;
         messageContainer.appendChild(el);
       }
       messageContainer.scrollTop =
         messageContainer.scrollHeight - messageContainer.clientHeight;
     };
   })();
   ```
