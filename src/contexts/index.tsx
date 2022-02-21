import { ReactNode } from "react"
import { AuthProvider } from "./AuthContext"
import { ProductProvider } from "./ProductContext"

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <AuthProvider>
    <ProductProvider>
      {children}
    </ProductProvider>
  </AuthProvider>
)