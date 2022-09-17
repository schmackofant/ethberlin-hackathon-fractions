import {
  Alert,
  AlertIcon,
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

import contractABI from '../../abis/IPNFT.json'

export default function EmitFAM() {
  const router = useRouter()
  const { tokenId } = router.query
  const { address, isConnected } = useAccount()

  const [fractionsAmount, setFractionsAmount] = useState(1)
  const [recipientAddress, setRecipientAddress] = useState('')
  const [newTotalSupply, setNewTotalSupply] = useState(0)

  const numFractionsExisting = 1

  const { config: contractWriteConfigForMint } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_ERC1155_CONTRACT,
    contractInterface: contractABI,
    functionName: 'addFAM',
    args: [address, tokenId, fractionsAmount]
  })

  const {
    data: emitData,
    write: emitFAM,
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
    setNewTotalSupply(numFractionsExisting + fractionsAmount)
  }, [fractionsAmount])

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

          <Button
            colorScheme="green"
            onClick={emitFAM as any}
            isDisabled={
              !emitFAM || isEmitLoading || isEmitStarted || !isConnected
            }
            isLoading={isEmitLoading}
          >
            {isEmitLoading && 'Waiting for approval'}
            {isEmitStarted && 'Emitting...'}
            {!isEmitLoading && !isEmitStarted && 'Create FAM tokens'}
          </Button>

          {wasEmitted && (
            <Alert status="success" mt={8}>
              <AlertIcon />
              Your FAM tokens were successfully created!&nbsp;
              <a
                style={{ textDecoration: 'underline' }}
                target="_blank"
                href={`https://goerli.etherscan.io/tx/${txData?.transactionHash}`}
                rel="noreferrer"
              >
                View Transaction
              </a>
            </Alert>
          )}

          {emitError && (
            <p style={{ marginTop: 24, color: '#FF6257' }}>
              Error: {emitError.message}
            </p>
          )}

          {txError && (
            <p style={{ marginTop: 24, color: '#FF6257' }}>
              Error: {txError.message}
            </p>
          )}
        </VStack>
      </Box>
    </>
  )
}
