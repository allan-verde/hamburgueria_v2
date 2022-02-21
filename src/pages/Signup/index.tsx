import { Flex } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { SignupInfo } from "./SignupInfo"
import { SignupForm } from "./SignupForm"
import { theme } from "../../styles/theme"
import { api } from "../../services/api"
import { useHistory } from "react-router-dom"
import toast from "react-hot-toast"

const signUpSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
  confirm_password: yup
    .string()
    .required("Confirmação de senha obrigatória")
    .oneOf([yup.ref("password")], "Senhas diferentes"),
})

interface SignUpData {
  email: string
  password: string
  name: string
}

export const Signup = () => {
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(signUpSchema),
  })

  const handleSignup = ({ name, email, password }: SignUpData) => {
    setLoading(true)

    api
      .post("/register", { name, email, password })
      .then((response) => {
        setLoading(false)
        history.push('/')
        toast.success('Usuário cadastrado')
      })
      .catch((err) => {
        setLoading(false)
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
      `linear(to-r, ${theme.colors.vanilla[100]} 65%, ${theme.colors.brown[400]} 35%)`,
      `linear(to-r, ${theme.colors.vanilla[100]} 65%, ${theme.colors.brown[400]} 35%)`,
      ]}
      color="white"
      boxSizing="border-box"
      maxWidth='100vw'
      minHeight="100vh"
    > 
      <Flex
        alignItems="center"
        w={["100%", "100%", "90%", "65%"]}
        justifyContent="center"
        flexDirection={["column", "column", "row", "row"]}
      >
        <SignupInfo />
        <SignupForm
          errors={errors}
          handleSignup={handleSubmit(handleSignup)}
          loading={loading}
          register={register}
        />
      </Flex>
    </Flex> 
  )
}
