## Chat App
I have used HTML, CSS, Javascript and Node(express) and socket.io to build basic Chat room app.

Here are the some of the steps on how you can install and code your chat app project.

#### For server side (Node Express)

1. Installation of packages inside the node.

   ``` npm init ```
2. Installation of express and socket.io

   ``` npm install express socket.io ---save```

2. Make server.js file inside the app

3. setup express inside the server.js file
     ``` javascript
    const express = require('express');
    const path = require('path');

    const app = express();
    const server = require('http').createServer(app);

    app.use(express.static(path.join(_dirname+'/public')));

    server.listen(5000); 
    ```
    


