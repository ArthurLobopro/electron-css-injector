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
