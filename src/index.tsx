import React from "react"
import ReactDOM from "react-dom"
import { App } from "./App"
import { AppProvider } from "./contexts"
import { BrowserRouter } from "react-router-dom"
import { ChakraProvider, theme } from "@chakra-ui/react"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
)