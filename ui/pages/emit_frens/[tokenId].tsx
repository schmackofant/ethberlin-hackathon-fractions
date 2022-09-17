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
import FRENConstitutorContractABI from '../../abis/FRENConstitutor.json'

export default function EmitFren() {
  const router = useRouter()
  const { tokenId } = router.query
  const { address, isConnected } = useAccount()

  const [fractionsAmount, setFractionsAmount] = useState(1)
  const [recipientAddress, setRecipientAddress] = useState('')
  const [newTotalSupply, setNewTotalSupply] = useState(0)

  const numFrensExisting = 0

  // approval
  const { config: contractWriteConfigForApproval } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_ERC1155_CONTRACT,
    contractInterface: IPNFTContractABI,
    functionName: 'setApprovalForAll',
    args: [process.env.NEXT_PUBLIC_FRENCONSTITUTOR_CONTRACT, true]
  })

  const {
    data: emitDataForApproval,
    write: setApprovalForAll,
    isLoading: isEmitLoading,
    isSuccess: isEmitStarted,
    error: emitError
  } = useContractWrite(contractWriteConfigForApproval)
  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError
  } = useWaitForTransaction({
    hash: emitDataForApproval?.hash
  })
  const wasApproved = txSuccess


  // minting FRENS
  const { config: contractWriteConfigForMint } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_FRENCONSTITUTOR_CONTRACT,
    contractInterface: FRENConstitutorContractABI,
    functionName: 'createFren',
    args: [id, amountFAMToLock, initialSupply]
  })

  const {
    data: emitDataForMint,
    write: createFren,
    isLoading: isEmitFrenLoading,
    isSuccess: isEmitFrenStarted,
    error: emitFrenError
  } = useContractWrite(contractWriteConfigForMint)
  const {
    data: frenTxData,
    isSuccess: frenTxSuccess,
    error: frenTxError
  } = useWaitForTransaction({
    hash: emitDataForMint?.hash
  })
  const wasCreated = txSuccess

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

          {!wasApproved && (
            <Button
              colorScheme="green"
              onClick={emitFAM as any}
              loadingText="Waiting for transaction..."
              isDisabled={
                !emitFAM || isEmitLoading || isEmitStarted || !isConnected
              }
              isLoading={isEmitLoading || (isEmitStarted && !wasApproved)}
            >
              {!isEmitLoading && !isEmitStarted && 'Create FAM tokens'}
            </Button>
          )}
        </VStack>
      </Box>
    </>
  )
}
