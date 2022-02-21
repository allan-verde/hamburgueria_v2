import { Box, Button, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { DeepMap, FieldError, UseFormRegister } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { Input } from "../../components/Form/Input";
import { theme } from "../../styles/theme";

interface LoginFormProps {
  handleSignup: () => void
  errors: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<FieldValues>;
  loading: boolean;
}

export const SignupForm = ({
  handleSignup,
  errors,
  register,
  loading,
}: LoginFormProps) => {
  return (
    <Grid
      onSubmit={handleSignup}
      as="form"
      padding="30px 15px"
      border="3px solid"
      borderColor="gray.100"
      bg="white"
      color={theme.colors.brown[400]}
      mt={["4", "4", "0"]}
      w={["100%", "100%", "40%", "40%"]}
    >
      <Heading size="lg">Crie sua conta</Heading>
      <VStack mt="6" spacing="5">
        <Input
          placeholder="Digite seu nome"
          label="Nome"
          error={errors.name}
          icon={FaUser}
          {...register("name")}
        />
        <Box w="100%">
          <Input
            placeholder="Digite seu login"
            type="email"
            label="Login"
            error={errors.email}
            icon={FaEnvelope}
            {...register("email")}
          />
          {!errors.email && (
            <Text ml="1" mt="1" color="gray.300">
              Exemplo: nome@email.com
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
        <Input
          type="password"
          placeholder="Confirme sua senha"
          label="Confirmação de senha"
          error={errors.confirm_password}
          icon={FaLock}
          {...register("confirm_password")}
        />
      </VStack>
      <Button
        mt="8"
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
        Finalizar cadastro
      </Button>
      <Text mt='4' textAlign='center' color={theme.colors.gray[500]}>Já é cadastrado? faça seu <strong><Link to='/' >Login</Link></strong></Text>
    </Grid>
  );
};
