const {ipcRenderer} = require("electron");


ipcRenderer.send('request-info', data)