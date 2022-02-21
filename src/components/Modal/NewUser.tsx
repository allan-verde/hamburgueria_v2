import {
  Button,
  Center,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react"
import { useHistory } from "react-router-dom";
import { theme } from "../../styles/theme";

interface ModalNewUserProps {
  isOpen: boolean
  onClose: () => void
  frase: string
}

export const NewUser = ({ isOpen, onClose, frase }: ModalNewUserProps) => {
  const history = useHistory()
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding="2" bg="white" color="gray.800">
        <ModalHeader display="flex" justifyContent="space-between">
          <Heading fontSize='3xl' as="h2" color={theme.colors.brown[400]}>Não é usuário?</Heading>
          <Center
              onClick={() => {
                onClose()
              }}
              as="button"
              ml="auto"
              w="32px"
              h="32px"
              bg={theme.colors.red[500]}
              color={theme.colors.gray[100]}
              fontSize="2xl"
              fontWeight='bold'
              borderRadius="md"
            >
              x
            </Center>
        </ModalHeader>

        <ModalBody>
          <Center >
            <Heading fontWeight='bold' fontSize='md' as="h2" color={theme.colors.brown[400]}>
              Você precisa estar logado <br/>para {frase}
            </Heading>
          </Center>
        </ModalBody>
        <ModalFooter w='100%'>
          <VStack w='100%'>
            <Button
              bg={theme.colors.yellow[400]}
              w="100%"
              color={theme.colors.brown[400]}
              h="60px"
              borderRadius="8px"
              onClick={() => history.push('/')}
              _hover={{
                background: `${theme.colors.orange[400]}`,
              }}
            >
              Logar agora
            </Button>

            <Button
              bg={theme.colors.red[500]}
              w="100%"
              color={theme.colors.vanilla[100]}
              h="60px"
              borderRadius="8px"
              onClick={() => history.push('/signup')}
              _hover={{
                background: `${theme.colors.red[400]}`,
              }}
            >
              Criar um cadastro
            </Button>
          </VStack>
        </ModalFooter>

      </ModalContent>
    </Modal>
  )
}