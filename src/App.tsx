import { Routes } from "./routes"
import { Toaster } from 'react-hot-toast'

export const App = () => (
  <>
    <Routes />
    <Toaster
      position='top-left'
      reverseOrder={false}
    />
  </>
)
