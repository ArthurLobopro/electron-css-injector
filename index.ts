import path from "path"

/**
 * Injects a CSS file into the DOM
 * @param css_path The path to the CSS file
 */
export function injectCSS(css_path: string) {
    const links = Array.from(document.querySelectorAll('link'))

    const css_exists = links.find(link => {
        return (
            path.normalize(link.getAttribute('href') as string).replace(/file:\\\\/g, "") ===
            path.normalize(css_path)
        )
    })

    if (!css_exists) {
        const css = document.createElement('link')
        css.rel = "stylesheet"
        css.href = css_path
        document.head.appendChild(css)
    }
}