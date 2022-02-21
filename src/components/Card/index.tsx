import {
  Box,
  Flex,
  Heading,
  Image,
  VStack,
} from "@chakra-ui/react"
import { theme } from "../../styles/theme"

interface Product {
  id: number
  userId: number
  name: string
  category: string
  price: number
  img: string
}

interface CardProps {
  product: Product
  handleClick: (product: Product) => void
}

export const  Card = ({ product, handleClick }: CardProps) => {

  return (
    <Box
      onClick={() => handleClick(product)}
      cursor="pointer"
      _hover={{ transform: "translateY(-7px)", borderColor: "gray.100" }}
      transition="border 0.2s, ease 0s, transform 0.2s"
      borderWidth="1px"
      borderColor="gray.50"
      boxShadow="base"
      w={["80vw", "300px"]}
      h='350px'
      boxSizing="border-box"
      marginRight='4'
    >
      <Flex justify="space-between" w='100%' h='100%' boxSizing="border-box">
        <VStack borderRadius='8' bgColor={theme.colors.gray[50]} w='100%' h='100%' >

          <Image  bgColor={theme.colors.gray[50]} src={product.img} alt={product.category} h='50%' />
          <VStack paddingLeft='12%' alignItems='start' borderTop='4px dashed white' h='50%' w='100%' paddingTop='4' >
            <Heading fontSize='lg' as="h2" color={theme.colors.brown[400]}>{product.name}</Heading>
            <Heading fontSize='lg' as="h2" color={theme.colors.brown[400]}>{product.category}</Heading>
            <Heading fontSize='md' as="h2" color={theme.colors.yellow[400]}>Preço: R$ {product.price.toFixed(2).replace('.', ',')}</Heading>
          </VStack>
        </VStack>
      </Flex>

    </Box>
  );
};
