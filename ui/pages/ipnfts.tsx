import { Alert, AlertIcon, Box, Heading, SimpleGrid, Fade } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

import IpnftCard from '@/components/IpnftCard'

const Ipnfts = [
  {id: 1,
  title: "The longevity Molecule",
  imageUrl: "https://bit.ly/2Z4KKcF",   
  therapeuticAreas: ["AGEING", "MENTAL HEALTH", "RESPIRATORY"],
  fundingAmount: "250.000",
  mintCount: 1
  
}
]

export default function Home() {
  const { address, isConnected } = useAccount()

  return (
    <>
      <Heading as="h1" size="lg">
        Your IP-NFTs
      </Heading>

      <Box mt={2}>
        {(!address || !isConnected) && (
          <Alert colorScheme="red">
            <AlertIcon />
            Please connect your wallet to continue
          </Alert>
        )}
      </Box>

      {address && (
        <Fade in={isConnected}>
        <SimpleGrid columns={2} spacing={4}>
          <IpnftCard />
          <IpnftCard />
          <IpnftCard />
          <IpnftCard />
          <IpnftCard />
          <IpnftCard />
          <IpnftCard />
        </SimpleGrid>
        </Fade>
      )}
    </>
  )
}
