const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')

let win
let selectedMenu = 'selector'

ipcMain.on('menuItemClick', function(event, name) {
    selectedMenu = name;
});

function createWindow () {
    win = new BrowserWindow({width: 1366, height: 768})

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'template/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)