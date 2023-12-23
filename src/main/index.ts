import { app, net, protocol } from "electron"
import path from "node:path"

function legacyCreateCSSProtocol() {
    const protocol_regex = /^css:(\/\/)/g

    protocol.registerFileProtocol("css", (request, callback) => {
        const url = request.url.replace(protocol_regex, "")
        callback({ path: path.normalize(url) })
    })
}

function createCSSProtocol() {
    protocol.handle('css', (request) =>
        net.fetch('file://' + request.url.slice('css://'.length)))
}

const isVersionBiggerOrEqualTo25 = (
    () => {
        const version = process.versions.electron
        const versionArray = version.split(".")
        return Number(versionArray[0]) >= 25
    }
)()

const createHandler = (
    isVersionBiggerOrEqualTo25 ?
        createCSSProtocol
        : legacyCreateCSSProtocol
)

if (app.isReady()) {
    createHandler()
} else {
    app.on("ready", createHandler)
}
