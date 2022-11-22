import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { setupStore } from "./store"
import App from "./App"
import "./index.scss"

const container = document.getElementById("root")!
const root = createRoot(container)

export const store = setupStore()
store.subscribe(() => console.log(store.getState()))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
