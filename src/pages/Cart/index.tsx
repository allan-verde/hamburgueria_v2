import { Box, Button, Flex, Grid, Heading } from '@chakra-ui/react'
import { theme } from '../../styles/theme'
import { useAuth } from '../../contexts/AuthContext'
import { useProducts } from '../../contexts/ProductContext'
import { FaStore } from 'react-icons/fa'
import { GrLogout } from 'react-icons/gr'
import { CardCart } from '../../components/CardCart'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import toast from 'react-hot-toast'

interface ProdCartData {
  id: number
  name: string
  category: string
  price: number
  img: string
  quant: number
  userId: number
}

export const Cart = () => {
  const { loadProdCart: loadProduct, cart } = useProducts()
  const { user ,accessToken, signOut } = useAuth()

  useEffect(() => {
    loadProduct(user.id, accessToken)
  }, [user.id, accessToken, loadProduct])

  const history = useHistory()

  return (
    <>
      {/* Header */}
      <Flex
        borderBottom="1px"
        borderBottomColor="#f5f5f5"
        paddingX="8"
        paddingY="2"
        justifyContent='space-between'
      >
        <Flex align="center">
          <Heading ml="4" as='h1' color={theme.colors.brown[400]} size="lg">
            Carrinho
          </Heading>
        </Flex>
        <Flex align="center">
          <Box cursor='pointer' >
            <FaStore fontSize='30' color={theme.colors.brown[400]} onClick={() => history.push('/dashboard')} />
          </Box>
          <Box ml='8' cursor='pointer' onClick={signOut} >
            <GrLogout fontSize='30' color={theme.colors.brown[400]} />
          </Box>
        </Flex>
      </Flex>

      <Flex direction={['column', 'column', 'row', 'row']} >
        {/* Vitrine */}
        <Box w='80%' >

          <Grid
            w="100%"
            templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
            gap={10}
            paddingX="8"
            mt="8"
          >
            {cart.map((prod: ProdCartData) => <CardCart product={prod} />)}
          </Grid>

        </Box>

        {/* Carrinho Total */}
        <Flex minW={['95%', '95%', '380px', '380px']} direction='column' h='100%' borderLeft='2px solid gray' p='8' marginTop='4' marginRight='4' borderRadius='8px' boxSizing='border-box' bgColor={theme.colors.brown[400]} color={theme.colors.vanilla[100]} marginBottom='4' >
          <Heading as='h2' fontSize='2xl' marginBottom='4' >Resumo de sua Compra</Heading>
          <Heading as='h2' fontSize='xl' marginBottom='4' >Quantidade de produtos: {
            cart.reduce((acc, cur) => {
              return acc + cur.quant
            }, 0)
          }</Heading>
          <Heading as='h2' fontSize='xl' marginBottom='4' >Valor total: R$ {
            cart.reduce((acc, cur) => {
              return acc + (cur.price * cur.quant)
            }, 0).toFixed(2).replace('.',',')
          }</Heading>
          <Button
            w="100%"
            h="60px"
            borderRadius="8px"
            onClick={() => toast.error('Botao em manutenção') }
            color={theme.colors.brown[400]}

            bg={theme.colors.yellow[400]}
            
            _hover={{
              background: `${theme.colors.orange[400]}`,
            }}
          >
            Pagar agora
          </Button>
        </Flex>
      </Flex>
    </>
  )
}