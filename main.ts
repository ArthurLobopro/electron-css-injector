import { BrowserWindow, ipcMain } from "electron"

ipcMain.on("create-css-protocol", (event) => {
    const win = BrowserWindow.fromId(event.sender.id) as BrowserWindow

    win.webContents.session.protocol.registerFileProtocol("css", (request, callback) => {
        const url = request.url.substring(6)
        console.log(url)
        callback({ path: url })
    })
})

