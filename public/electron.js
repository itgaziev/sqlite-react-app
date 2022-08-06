require('../src/message-control/main');
const electron = require('electron')
const { app, BrowserWindow, screen } = electron
const path = require('path')
const isDev = require('electron-is-dev')

const screenElectron = screen;

require('@electron/remote/main').initialize()

function createWindow() {

    let mainScreen = screenElectron.getPrimaryDisplay();
    let dimensions = mainScreen.size;

    const win = new BrowserWindow({
        autoHideMenuBar: false,
        width: dimensions.width * 0.8,
        height: dimensions.height * 0.8,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        }
    })

    //win.maximize()

    win.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    )
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {

    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicity with Cmd+q
    if(process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    // On OS X it is common for applications and their menu bar
    // dock icon is clicked and there are no other windows open

    if(BrowserWindow.getAllWindows() === 0) createWindow()
})