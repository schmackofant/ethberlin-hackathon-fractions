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
import {
  useAccount,
  // useContractEvent,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'

import IPNFTContractABI from '../../abis/IPNFT.json'

export default function EmitFren() {
  const router = useRouter()
  const { tokenId } = router.query
  const { address, isConnected } = useAccount()

  const [fractionsAmount, setFractionsAmount] = useState(1)
  const [recipientAddress, setRecipientAddress] = useState('')
  const [newTotalSupply, setNewTotalSupply] = useState(0)

  const numFrensExisting = 0

  const { config: contractWriteConfigForMint } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_ERC1155_CONTRACT,
    contractInterface: IPNFTContractABI,
    functionName: 'setApprovalForAll',
    args: [process.env.NEXT_PUBLIC_FRENCONSTITUTOR_CONTRACT, true]
  })

  const {
    data: emitData,
    write: setApprovalForAll,
    isLoading: isEmitLoading,
    isSuccess: isEmitStarted,
    error: emitError
  } = useContractWrite(contractWriteConfigForMint)
  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError
  } = useWaitForTransaction({
    hash: emitData?.hash
  })
  const wasEmitted = txSuccess

  useEffect(() => {
    if (isConnected) {
      setRecipientAddress(address)
    }
  }, [isConnected, address])

  useEffect(() => {
    setNewTotalSupply(numFrensExisting + fractionsAmount)
  }, [fractionsAmount])

  return (
    <>
      <Heading as="h1" size="lg">
        Lock IP-NFT {tokenId} and create Fren tokens
      </Heading>

      <Box mt={4}>
        <VStack spacing={6}>
          <FormControl>
            <FormLabel>Amount of Frens to create</FormLabel>
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

          <Button colorScheme="green" onClick={setApprovalForAll as any}>
            Create Fren tokens
          </Button>
        </VStack>
      </Box>
    </>
  )
}
