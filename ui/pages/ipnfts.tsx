import { Alert, AlertIcon, Box, Heading, SimpleGrid } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

import IpnftCard from '@/components/IpnftCard'

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
        <SimpleGrid columns={2} spacing={4}>
          <IpnftCard />
          <IpnftCard />
          <IpnftCard />
          <IpnftCard />
          <IpnftCard />
          <IpnftCard />
          <IpnftCard />
        </SimpleGrid>
      )}
    </>
  )
}
