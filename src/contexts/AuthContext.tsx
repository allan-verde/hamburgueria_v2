import { createContext, ReactNode, useCallback, useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { api } from "../services/api"

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  email: string
  id: number
  name: string
}

interface AuthState {
  accessToken: string
  user: User
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: User
  accessToken: string
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const history = useHistory()
  const [data, setData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem("@Hamburgueria:accessToken")
    const user = localStorage.getItem("@Hamburgueria:user")

    if (accessToken && user) {
      return { accessToken, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post("/login", { email, password })
    const { accessToken, user } = response.data

    localStorage.setItem("@Hamburgueria:accessToken", accessToken)
    localStorage.setItem("@Hamburgueria:user", JSON.stringify(user))

    setData({ accessToken, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem("@Hamburgueria:accessToken")
    localStorage.removeItem("@Hamburgueria:user")
    history.push('/')
    setData({} as AuthState)
  }, [history])

  return (
    <AuthContext.Provider
      value={{
        accessToken: data.accessToken,
        user: data.user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth }