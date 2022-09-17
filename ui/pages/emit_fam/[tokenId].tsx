import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export default function EmitFAM() {
  const router = useRouter()
  const { tokenId } = router.query
  const { address, isConnected } = useAccount()

  const [fractionsAmount, setFractionsAmount] = useState(1)
  const [recipientAddress, setRecipientAddress] = useState('')
  const [newTotalSupply, setNewTotalSupply] = useState(0)

  const numFractionsExisting = 1

  useEffect(() => {
    if (isConnected) {
      setRecipientAddress(address)
    }
  }, [isConnected, address])

  useEffect(() => {
    setNewTotalSupply(numFractionsExisting + fractionsAmount)
  }, [fractionsAmount])

  async function handleEmitFAM() {
    alert('fractionalize it baby')
  }

  return (
    <>
      <Heading as="h1" size="lg">
        Emit FAM tokens for IP-NFT {tokenId}
      </Heading>

      <Box mt={4}>
        <VStack spacing={6}>
          <FormControl>
            <FormLabel>Amount of fractions to create</FormLabel>
            <Input
              variant="outline"
              value={fractionsAmount}
              onChange={(e) => setFractionsAmount(parseInt(e.target.value))}
              type="number"
              min={1}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Recipient address</FormLabel>
            <Input
              variant="outline"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
            />
          </FormControl>

          <p>New total supply will be {newTotalSupply}</p>

          <Button colorScheme="green" onClick={handleEmitFAM}>
            Create FAM tokens
          </Button>
        </VStack>
      </Box>
    </>
  )
}
