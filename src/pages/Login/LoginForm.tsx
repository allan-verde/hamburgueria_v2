import { Box, Button, Grid, Heading, Text, VStack } from "@chakra-ui/react"
import { DeepMap, FieldError, UseFormRegister } from "react-hook-form"
import { FieldValues } from "react-hook-form"
import { FaEnvelope, FaLock } from "react-icons/fa"
import { useHistory } from "react-router-dom"
import { Input } from "../../components/Form/Input"
import { theme } from "../../styles/theme"

interface LoginFormProps {
  handleSignIn: () => void;
  errors: DeepMap<FieldValues, FieldError>
  register: UseFormRegister<FieldValues>
  loading: boolean
}

export const LoginForm = ({
  handleSignIn,
  errors,
  register,
  loading,
}: LoginFormProps) => {
  const history = useHistory()
  return (
    <Grid
      onSubmit={handleSignIn}
      as="form"
      padding="30px 15px"
      border="3px solid"
      borderColor="gray.100"
      bg="white"
      color={theme.colors.brown[400]}
      mt={["4", "4", "0"]}
      w={["100%", "100%", "40%", "40%"]}
    >
      <Heading size="lg"> Faça seu Login</Heading>
      <VStack mt="6" spacing="5">
        <Box w="100%">
          <Input
            placeholder="Digite seu login"
            type="email"
            label="Email"
            error={errors.email}
            icon={FaEnvelope}
            {...register("email")}
          />
          {!errors.email && (
            <Text ml="1" mt="1" color="gray.300">
              Ex: nome@mail.com
            </Text>
          )}
        </Box>
        <Input
          type="password"
          placeholder="Digite sua senha"
          label="Senha"
          error={errors.password}
          icon={FaLock}
          {...register("password")}
        />
      </VStack>
      <VStack mt="4" spacing="5">
        <Button
          isLoading={loading}
          w="100%"
          h="60px"
          borderRadius="8px"
          color={theme.colors.vanilla[100]}
          bg={theme.colors.red[500]}
          _hover={{
            background: `${theme.colors.red[400]}`,
          }}
          type="submit"
        >
          Entrar
        </Button>
        <Text color="gray.400">Ainda não possui uma conta? </Text>
        <Button
          bg={theme.colors.yellow[400]}
          w="100%"
          color={theme.colors.brown[400]}
          h="60px"
          borderRadius="8px"
          onClick={() => history.push("/signup")}
          _hover={{
            background: `${theme.colors.orange[400]}`,
          }}
        >
          Cadastrar
        </Button>
      </VStack>
    </Grid>
  )
}
