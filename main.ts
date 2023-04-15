import { BrowserWindow, ipcMain } from "electron"

ipcMain.on("create-css-protocol", (event) => {
    const win = BrowserWindow.fromId(event.sender.id) as BrowserWindow

    const alreadyRegistered = win.webContents.session.protocol.isProtocolRegistered("css")

    if (alreadyRegistered) {
        console.warn("CSS protocol already registered")
    } else {
        win.webContents.session.protocol.registerFileProtocol("css", (request, callback) => {
            const url = request.url.substring(6)
            console.log(url)
            callback({ path: url })
        })
    }
})