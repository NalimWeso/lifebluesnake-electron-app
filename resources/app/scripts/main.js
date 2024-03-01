const { app, BrowserWindow } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 1500,
        height: 1000,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    win.maximize()
    win.loadFile('content/loading.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})