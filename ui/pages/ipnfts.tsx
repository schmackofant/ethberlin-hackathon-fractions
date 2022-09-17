import {
  Alert,
  AlertIcon,
  Box,
  Fade,
  Heading,
  SimpleGrid
} from '@chakra-ui/react'
import { ipnftData } from 'lib/ipnftData'
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
        <Fade in={isConnected}>
          <SimpleGrid columns={2} spacing={4}>
            {ipnftData.map((ipnft) => (
              <IpnftCard
                key={ipnft.id}
                tokenId={ipnft.id}
                title={ipnft.title}
                fundingAmount={ipnft.fundingAmount}
                mintCount={ipnft.mintCount}
                imageUrl={ipnft.imageUrl}
                therapeuticAreas={ipnft.therapeuticAreas}
              />
            ))}
          </SimpleGrid>
        </Fade>
      )}
    </>
  )
}
