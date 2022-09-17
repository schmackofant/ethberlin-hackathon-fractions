import { Badge, Box, Button, Flex } from '@chakra-ui/react'
import Link from 'next/link'

export interface CardProps {
  tokenId: number
  title: string
  fundingAmount: string
  mintCount: number
  imageUrl: string
  therapeuticAreas: array
}


const IpnftCard = (props: CardProps) => {

  const { title, imageUrl, fundingAmount, mintCount, therapeuticAreas,  discoveryLink } = props

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow='md'
      
    >
    <Box height="14rem" backgroundColor="red" backgroundImage={imageUrl} backgroundPosition="center">

    </Box>
      

      <Box p="6">
        <Box display="flex" alignItems="baseline">
        {therapeuticAreas.map((area) => (
          <Badge
          borderRadius="full"
          px="2"
          colorScheme="teal"
          marginRight="5px"
        >
          {area}
        </Badge>
            ))}
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {title} {props.tokenId}
        </Box>

        <Box>
          {fundingAmount + ' '}
          <Box as="span" color="gray.600" fontSize="sm">
            total Funding
          </Box>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {mintCount} out of {mintCount}
          </Box>
        </Box>
        <Flex width="100%" justify="space-between" marginTop="20px">
          <a href={discoveryLink} target="_blank">
            <Button width="1/3" backgroundColor="02213a" fontWeight="bold" fontSize='12px'_hover={{ bg: '#B2F5EA' }}>
              View
            </Button>
          </a>
          <Link href={`/emit_fam/${encodeURIComponent(props.tokenId)}`}>
            <Button width="1/3" backgroundColor="02213a" fontSize='12px'_hover={{ bg: '#B2F5EA' }}>
              Create FAM
            </Button>
          </Link>
          <Link href={`/emit_frens/${encodeURIComponent(props.tokenId)}`}>
            <Button width="1/4" backgroundColor="02213a" _hover={{ bg: '#B2F5EA' }} fontSize='12px'>
              Create FRENS
            </Button>
          </Link>
        </Flex>
      </Box>
    </Box>
  )
}

export default IpnftCard
