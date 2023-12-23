import { app, protocol } from "electron"
import path from "node:path"

function legacyCreateCSSProtocol() {
    const protocol_regex = /^css:(\/\/)/g

    protocol.registerFileProtocol("css", (request, callback) => {
        const url = request.url.replace(protocol_regex, "")
        callback({ path: path.normalize(url) })
    })
}

if (app.isReady()) {
    legacyCreateCSSProtocol()
} else {
    app.on("ready", legacyCreateCSSProtocol)
}
