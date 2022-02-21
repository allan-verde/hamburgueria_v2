import {
  Button,
  Center,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  HStack
} from "@chakra-ui/react"
import { useState } from "react"
import toast from "react-hot-toast"
import { GrAddCircle, GrSubtractCircle } from 'react-icons/gr'
import { useAuth } from "../../contexts/AuthContext"
import { useProducts } from "../../contexts/ProductContext"
import { theme } from "../../styles/theme"

interface Product {
  id: number
  name: string
  category: string
  price: number
  img: string
}

interface ModalProductCartDetailProps {
  isOpen: boolean
  onClose: () => void
  product: Product
  onNewUserOpen: () => void
}

export const ModalTaskDetail = ({
  isOpen,
  onClose,
  product,
  onNewUserOpen
}: ModalProductCartDetailProps) => {
  const [quantProd, setQuantProd] = useState(1)
  const { accessToken, user } = useAuth()
  const { newProduct, cart } = useProducts()

  const handleClick = ( prod : Product) => {
    if (!accessToken) {
      onClose()
      onNewUserOpen()
      
    } else {
      const prodNRepet = cart.every(prodCart => prodCart.name !== prod.name)
  
      if (prodNRepet) {
        const newProdCart = { ...prod, quant: quantProd } 
        newProduct(newProdCart, user.id, accessToken)
        onClose()
      } else {
        toast.error('Produto já adicionado')
        onClose()
      }
    }

  }

  const addQuant = () => {
    setQuantProd(quantProd + 1)
  }
  const subQuant = () => {
    if(quantProd > 1) {
      setQuantProd(quantProd - 1)
    }
  }
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding="2" bg="white" color="gray.800">
        <ModalHeader display="flex" justifyContent="space-between">
          <Heading fontSize='3xl' as="h2" color={theme.colors.brown[400]}>{product.name}</Heading>
          <Center
              onClick={() => {
                onClose()
                setQuantProd(1)
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
          <VStack borderRadius='8' bgColor={theme.colors.gray[50]} >
            <Image  bgColor={theme.colors.gray[50]} src={product.img} alt='hamburguer' />

            <VStack p='6' paddingLeft='12%' alignItems='start' borderTop='4px dashed white' w='100%' >
              <HStack>
              <Heading fontWeight='bold' fontSize='md' as="h2" color={theme.colors.brown[400]}>
                Quantidade: 
              </Heading>
                <GrAddCircle  cursor='pointer' onClick={addQuant}/>
              <Heading fontSize='md' as="h2" color={theme.colors.red[500]}>
              {quantProd}
              </Heading>
              {quantProd > 1 && <GrSubtractCircle cursor='pointer' onClick={subQuant}/>}

              </HStack>
              <HStack>
              <Heading fontWeight='bold' fontSize='md' as="h2" color={theme.colors.brown[400]}>
                Preço total:
              </Heading>
              <Heading fontSize='md' as="h2" color={theme.colors.red[500]}>R$ {product.price * quantProd}</Heading>
              </HStack>
            </VStack>
          </VStack>
        </ModalBody>
        <ModalFooter>
        <Button
          bg={theme.colors.yellow[400]}
          w="100%"
          color={theme.colors.brown[400]}
          h="60px"
          borderRadius="8px"
          onClick={() => {
            handleClick(product)
            setQuantProd(1)
          }}
          _hover={{
            background: `${theme.colors.orange[400]}`,
          }}
        >
          Adicionar ao carrinho
        </Button>
        </ModalFooter>

      </ModalContent>
    </Modal>
  )
}