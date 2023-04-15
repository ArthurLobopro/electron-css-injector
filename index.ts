import path from "node:path"

import { ipcRenderer } from "electron"

ipcRenderer.sendSync("create-css-protocol")

/**
 * Injects a CSS file into the DOM
 * @param css_path The path to the CSS file
 * @param css_id The ID to identify the CSS file already injected
 */
export function injectCSS(css_path: string, css_id?: string) {
    const links = Array.from(document.querySelectorAll('link'))

    const css_exists = links.find(link => {
        if (css_id && link.dataset.id === css_id) {
            return true
        }

        const file_regex = process.platform === "win32" ? /file:\\\\/g : /file:\/\//g

        return (
            path.normalize(link.getAttribute('href') as string).replace(file_regex, "") ===
            path.normalize(css_path)
        )
    })

    if (!css_exists) {
        const css = document.createElement('link')
        css.rel = "stylesheet"
        css.href = `css://${css_path}`
        if (css_id) {
            css.dataset.id = css_id
        }
        document.head.appendChild(css)
    }
}