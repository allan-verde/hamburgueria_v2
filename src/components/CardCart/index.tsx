import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  VStack,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { GrAddCircle, GrSubtractCircle } from "react-icons/gr"
import { useAuth } from "../../contexts/AuthContext"
import { useProducts } from "../../contexts/ProductContext"
import { theme } from "../../styles/theme"

interface Product {
  id: number
  name: string
  category: string
  price: number
  img: string
  quant: number
  userId: number
}

interface ProdCartData {
  product: Product
}

export const CardCart = ({ product }: ProdCartData) => {
  const [button, setButton] = useState('Remover')
  const { updateProduct, deleteProduct } = useProducts()
  const { user, accessToken } = useAuth()

  const [quantProd, setQuantProd] = useState(() => product.quant)

  const addQuant = () => setQuantProd(quantProd + 1)
  const subQuant = () => setQuantProd(quantProd - 1)

  const removeProd = () => {
    deleteProduct(product.id, accessToken)
  }

  const updateProd = () => {
    updateProduct(product.id, user.id, accessToken, quantProd)
  }

  const handleClick = () => {
    if (button === 'Atualizar') {
      updateProd()
    } 
    else {
      removeProd()
    }
  }

  useEffect(() => {
    if (product.quant !== quantProd && button === 'Remover') {
      setButton('Atualizar')
    } else if (product.quant === quantProd && button === 'Atualizar') {
      setButton('Remover')
    }
  },[quantProd, product, button])

  return (
    <Box
      borderWidth="1px"
      borderColor="gray.50"
      boxShadow="base"
      w={["80vw", "300px"]}
      h='370px'
      boxSizing="border-box"
      marginRight='4'
    >
      <Flex justify="space-between" w='100%' h='100%'>
        <VStack borderRadius='8' bgColor={theme.colors.gray[50]} w='100%' h='100%' paddingBottom='4' paddingTop='4'>
          <Image  bgColor={theme.colors.gray[50]} src={product.img} alt='hamburguer' h='45%' />

          <VStack paddingLeft='12%' alignItems='start' borderTop='4px dashed white' w='100%' h='55%' paddingTop='4' >
            <Heading fontSize='lg' as="h2" color={theme.colors.brown[400]}>{product.name}</Heading>
            <Heading fontSize='lg' as="h2" color={theme.colors.brown[400]}>{product.category}</Heading>
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
              <Heading fontSize='md' as="h2" color={theme.colors.red[500]}>R$ {(product.price * quantProd).toFixed(2).replace('.', ',')}</Heading>
            </HStack>
          </VStack>
          <Button
            w="90%"
            h="60px"
            borderRadius="8px"
            onClick={() => {
              handleClick()
            }}
            color={ button === 'Atualizar' ? theme.colors.brown[400] : theme.colors.vanilla[100]}

            bg={ button === 'Atualizar' ? theme.colors.yellow[400] : theme.colors.red[500] }
            
            _hover={{
              background: `${button === 'Atualizar' ? theme.colors.orange[400] : theme.colors.red[400]}`,
            }}
          >
            {button === 'Atualizar' ? 'Atualizar' : 'Remover do'} carrinho
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
};
