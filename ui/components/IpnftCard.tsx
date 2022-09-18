import { Badge, Box, Button, Flex, Skeleton } from '@chakra-ui/react'
import Link from 'next/link'
import { useAccount, useContractRead } from 'wagmi'

import contractABI from '../abis/IPNFT.json'

export interface CardProps {
  tokenId: number
  title: string
  fundingAmount: string
  mintCount: number
  imageUrl: string
  therapeuticAreas: Array<string>
  discoveryLink: string
}

const IpnftCard = (props: CardProps) => {
  const {
    title,
    imageUrl,
    fundingAmount,
    mintCount,
    therapeuticAreas,
    discoveryLink
  } = props

  const { address } = useAccount()

  const {
    data: totalSupplyData,
    // isError: totalSupplyError,
    isLoading: isTotalSupplyLoading
  } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_ERC1155_CONTRACT,
    contractInterface: contractABI,
    functionName: 'totalSupply',
    args: [props.tokenId]
  })

  const {
    data: balanceData,
    // isError: balanceError,
    isLoading: isBalanceLoading
  } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_ERC1155_CONTRACT,
    contractInterface: contractABI,
    functionName: 'balanceOf',
    args: [address, props.tokenId]
  })

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="md"
    >
      <Box
        height="14rem"
        backgroundImage={imageUrl}
        backgroundPosition="center"
      ></Box>

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          {therapeuticAreas.map((area) => (
            <Badge
              key={area}
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

        {(isTotalSupplyLoading || isBalanceLoading) && (
          <Skeleton height="22px" />
        )}

        {totalSupplyData && balanceData && (
          <Box display="flex" mt="2" alignItems="center">
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              You own {balanceData.toString()} out of{' '}
              {totalSupplyData.toString()}
            </Box>
          </Box>
        )}

        <Flex width="100%" justify="space-between" marginTop="20px">
          <a href={discoveryLink} target="_blank" rel="noreferrer">
            <Button
              width="1/3"
              backgroundColor="02213a"
              fontWeight="bold"
              fontSize="12px"
              _hover={{ bg: '#B2F5EA' }}
            >
              View
            </Button>
          </a>
          <Link href={`/emit_fam/${encodeURIComponent(props.tokenId)}`}>
            <Button width="1/3" colorScheme="blue" fontSize="12px">
              Create FAM
            </Button>
          </Link>
          <Link href={`/emit_frens/${encodeURIComponent(props.tokenId)}`}>
            <Button width="1/4" colorScheme="blue" fontSize="12px">
              Create FRENS
            </Button>
          </Link>
        </Flex>
      </Box>
    </Box>
  )
}

export default IpnftCard
