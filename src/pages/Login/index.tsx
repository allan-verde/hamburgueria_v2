import { Flex } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { LoginInfo } from "./LoginInfo"
import { LoginForm } from "./LoginForm"
import { theme } from "../../styles/theme"
import { useHistory } from "react-router-dom"
import toast from "react-hot-toast"

const signInSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
})

interface SignInData {
  email: string
  password: string
}

export const Login = () => {
  const [loading, setLoading] = useState(false)

  const { signIn } = useAuth()

  const history = useHistory()

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(signInSchema),
  })

  const handleSignIn = (data: SignInData) => {
    setLoading(true)
    signIn(data)
      .then((_) => {
        setLoading(false)
        toast.success('Você esta logado')
        history.push('/dashboard')
      })
      .catch((err) => {
        setLoading(false)
        toast.error('Usuário ou senha inválido')
        console.log(err)
      })
  }

  return (
    <Flex
      padding={["10px 15px", "10 15px", "0px", "0px"]}
      alignItems="center"
      justifyContent="center"
      height={["auto", "auto", "100vh", "100vh"]}
      bgGradient={[
        `linear(to-b, ${theme.colors.vanilla[100]} 65%, ${theme.colors.brown[400]} 35%)`,
        `linear(to-b, ${theme.colors.vanilla[100]} 65%, ${theme.colors.brown[400]} 35%)`,
        `linear(to-l, ${theme.colors.vanilla[100]} 65%, ${theme.colors.brown[400]} 35%)`,
        `linear(to-l, ${theme.colors.vanilla[100]} 65%, ${theme.colors.brown[400]} 35%)`,
      ]}
      color="white"
      minHeight="100vh"
    >
      <Flex
        w={["100%", "100%", "90%", "65%"]}
        justifyContent="center"
        flexDirection={["column", "column", "row", "row"]}
        alignItems="center"
      >
        <LoginForm
          errors={errors}
          handleSignIn={handleSubmit(handleSignIn)}
          loading={loading}
          register={register}
        />
        <LoginInfo />
      </Flex>
    </Flex>
  )
}
