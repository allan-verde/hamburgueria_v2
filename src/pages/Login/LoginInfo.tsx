import { Grid, Heading, VStack, HStack, Image, Text } from "@chakra-ui/react"
import LogoSecondary from "../../assets/burguer.svg"
import { theme } from '../../styles/theme'

export const LoginInfo = () => (
  <Grid w={["100%", "100%", "60%", "60%"]} paddingLeft={['50px', '50px', '80px', '100px']} display='flex' alignItems='flex-end' flexDirection='row'>
    <Image
      src={LogoSecondary}
      alt="doit"
      boxSize={["150px", "180px", "200px", "250px"]}
    />
    <VStack>
      <HStack alignItems='flex-end' >
        <Heading fontSize={['xl', '2xl', '5xl', '5xl']}  color={theme.colors.gray[700]} mt="4" as="h1">
          Burguer
        </Heading>
        <Heading color={theme.colors.red[500]}>
          Kenzie
        </Heading>
      </HStack>
      <Text fontWeight='bold' fontStyle='italic' fontSize={['md', 'md', 'xl', 'xl']} color={theme.colors.vanilla[100]} maxW="350px">
        A vida é como um sanduíche, é preciso recheá-la com os melhores ingredientes.
      </Text>
    </VStack>
  </Grid>
)