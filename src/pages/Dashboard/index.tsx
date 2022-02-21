import { Box, Center, Flex, Grid, Heading, Input, useDisclosure } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import { theme } from '../../styles/theme'
import { useProducts } from '../../contexts/ProductContext'
import { FaShoppingCart } from 'react-icons/fa'
import { Card } from '../../components/Card'
import { ModalTaskDetail } from '../../components/Modal/ProductDetail'
import { NewUser } from '../../components/Modal/NewUser'
import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

interface Product {
  id: number
  userId: number
  name: string
  category: string
  price: number
  img: string
}

export const Dashboard = () => {
  const { searchProduct, allProductRender,  } = useProducts()
  const { signOut } = useAuth()

  const {
    isOpen: isProductDetailOpen,
    onOpen: onProductDetailOpen,
    onClose: onProductDetailClose,
  } = useDisclosure()

  const {
    isOpen: isNewUserOpen,
    onOpen: onNewUserOpen,
    onClose: onNewUserClose,
  } = useDisclosure()

  const [selectedProduct, setSelectedProduct] = useState<Product>({} as Product)

  const handleClick = (product: Product) => {
    setSelectedProduct(product)
    onProductDetailOpen()
  }

  const history = useHistory()
  
  return (
    <>
      <ModalTaskDetail
        isOpen={isProductDetailOpen}
        onClose={onProductDetailClose}
        product={selectedProduct}
        onNewUserOpen={onNewUserOpen}
      />
      <NewUser
        isOpen={isNewUserOpen}
        onClose={onNewUserClose}
        frase='Adicionar um produto'
      />
      <Box boxSizing="border-box" w='100%' >
        {/* Header */}
        <Flex
          borderBottom="1px"
          borderBottomColor="#f5f5f5"
          paddingX="8"
          paddingY="2"
          justifyContent='space-between'
          boxSizing="border-box"
        >
          <Flex align="center" boxSizing="border-box">
            <Heading ml="4" as='h1' color={theme.colors.brown[400]} size="lg">
              Dashboard
            </Heading>
          </Flex>
          <Flex align="center" boxSizing="border-box">
            <Box  cursor='pointer' >
              <FaShoppingCart fontSize='30' color={theme.colors.brown[400]} onClick={() => history.push('/cart')} />
            </Box>
            <Box cursor='pointer' ml='8' onClick={signOut} boxSizing="border-box" >
              <GrLogout fontSize='30' color={theme.colors.brown[400]} />
            </Box>
          </Flex>
        </Flex>

        {/* SearchBox */}
        <Flex
          mt="6"
          w="100%"
          paddingX={["8", "8"]}
          paddingY="2"
          boxSizing="border-box"
          paddingBottom="6"
          borderBottomWidth="1px"
          borderColor="gray.50"
          flexDir={["column", "column", "row", "row"]}
        >
          <Flex /* onSubmit={handleSubmit(handleSearch)} */ >
            <Input
              name='teste name'
              onChangeCapture={(e) => searchProduct(e.currentTarget.value)}
              borderColor={theme.colors.brown[400]}
              color={theme.colors.brown[400]}
              bg='white'
              variant="outline"
              _hover={{ bgColor: `${theme.colors.gray[50]}` }}
              _placeholder={{ color: `${theme.colors.gray[400]}` }}
              _focus={{
                bg: `${theme.colors.gray[50]}`
              }}
              size="lg"
              h="60px"
            />
            <Center cursor='default'
              borderRadius="8px"
              as="button"
              ml="2"
              w="65px"
              h="60px"
              fontSize="2xl"
              bg={theme.colors.red[500]}
            >
              <FaSearch color={theme.colors.white} />
            </Center>
          </Flex>
        </Flex>

        {/* Vitrine */}
        <Grid
          w="100%"
          templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
          gap={10}
          paddingX="8"
          mt="8"
          boxSizing="border-box"
        >
          {allProductRender.map((product) => <Card key={product.id} product={product} handleClick={() => handleClick(product)} />)}
        </Grid>

      </Box>
    </>
  )
}