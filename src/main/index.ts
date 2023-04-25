import { app, protocol } from "electron"
import path from "node:path"

function createCSSProtocol() {
    const protocol_regex = /^css:(\/\/)/g

    protocol.registerFileProtocol("css", (request, callback) => {
        const url = request.url.replace(protocol_regex, "")
        callback({ path: path.normalize(url) })
    })
}

if (app.isReady()) {
    createCSSProtocol()
} else {
    app.on("ready", createCSSProtocol)
}

// ipcMain.on("create-css-protocol", (event) => {
//     const win = BrowserWindow.fromId(event.sender.id) as BrowserWindow

//     const protocol_regex = /^css:(\/\/)/g

//     const alreadyRegistered = win.webContents.session.protocol.isProtocolRegistered("css")

//     if (alreadyRegistered) {
//         console.log("CSS protocol already registered")
//     } else {
//         win.webContents.session.protocol.registerFileProtocol("css", (request, callback) => {
//             const url = request.url.replace(protocol_regex, "")
//             console.log(url)
//             callback({ path: path.normalize(url) })
//         })
//     }
// })