# electron-css-injector

Inject css in your electron app.

## How to use

* Install the package in your project with `yarn add electron-css-injector` or `npm install electron-css-injector` 

* In your preload script add: 

```typescript
import { injectCSS } from "electron-css-injector"

window.addEventListener("DOMContentLoaded", () => {
   injectCSS("path/to/archive.css")
})
```