import { Alert, AlertIcon, Box, Heading } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

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
    </>
  )
}
