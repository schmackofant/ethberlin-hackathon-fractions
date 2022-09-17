import { Badge, Box, Button, Flex } from '@chakra-ui/react'
import Link from 'next/link'

export interface CardProps {
  tokenId: number
  title: string
  fundingAmount: string
  mintCount: number
  imageUrl: string
}

const property = {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    title: 'The Longevity Molecule',
    foundingAmount: '$250.000',
    mintCount: 1
  }


const IpnftCard = (props: CardProps) => {

  const { title, imageUrl, fundingAmount, mintCount } = props;

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow='md'
    >
      <img
        src={imageUrl}
      />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge
            borderRadius="full"
            px="2"
            colorScheme="teal"
            marginRight="5px"
          >
            Ageing
          </Badge>
          <Badge
            borderRadius="full"
            px="2"
            colorScheme="teal"
            marginRight="5px"
          >
            Mental Health
          </Badge>
          <Badge borderRadius="full" px="2" colorScheme="teal">
            Respiratory
          </Badge>
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
            {property.mintCount} out of {property.mintCount}
          </Box>
        </Box>
        <Flex width="100%" justify="space-between" marginTop="20px">
          <Link href={`/ipnft/${encodeURIComponent(props.tokenId)}`}>
            <Button width="1/3" colorScheme="blue">
              View
            </Button>
          </Link>
          <Link href={`/emit_fam/${encodeURIComponent(props.tokenId)}`}>
            <Button width="1/4" colorScheme="blue">
              Create FAM
            </Button>
          </Link>
          <Link href={`/emit_frens/${encodeURIComponent(props.tokenId)}`}>
            <Button width="1/4" colorScheme="blue">
              Create FRENS
            </Button>
          </Link>
        </Flex>
      </Box>
    </Box>
  )
}

export default IpnftCard
