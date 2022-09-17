import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack
} from '@chakra-ui/react'
import { BigNumber } from 'ethers'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  useAccount,
  // useContractEvent,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction
} from 'wagmi'

import FRENConstitutorContractABI from '../../abis/FRENConstitutor.json'
import IPNFTContractABI from '../../abis/IPNFT.json'

export default function EmitFren() {
  const router = useRouter()
  const { tokenId } = router.query
  const { address, isConnected } = useAccount()

  const [initialSupply, setInitialSupply] = useState(1)
  const [FamLockAmount, setFamLockAmount] = useState(1)

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
  // const wasApproved = true

  // minting FRENS
  const { config: contractWriteConfigForMint } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_FRENCONSTITUTOR_CONTRACT,
    contractInterface: FRENConstitutorContractABI,
    functionName: 'createFren',
    args: [tokenId, FamLockAmount, initialSupply]
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

  return (
    <>
      <Heading as="h1" size="lg">
        Lock IP-NFT {tokenId} and create Fren tokens
      </Heading>

      <Box mt={4}>
        <VStack spacing={6}>
          {/* <p>New total supply will be {newTotalSupply}</p> */}

          {!wasApproved && (
            <Button colorScheme="green" onClick={setApprovalForAll as any}>
              Approve FAM tokens
            </Button>
          )}

          {wasApproved && (
            <>
              <FormControl>
                <FormLabel>Initial FRENS supply</FormLabel>
                <Input
                  variant="outline"
                  value={initialSupply}
                  onChange={(e) => setInitialSupply(parseInt(e.target.value))}
                  type="number"
                  min={1}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Amount of FAM tokens to lock</FormLabel>
                <Input
                  variant="outline"
                  value={FamLockAmount}
                  onChange={(e) => setFamLockAmount(e.target.value)}
                />
              </FormControl>
              <Button
                colorScheme="green"
                onClick={createFren as any}
                loadingText="Waiting for transaction..."
                // isDisabled={
                //   !emitFAM || isEmitLoading || isEmitStarted || !isConnected
                // }
                isLoading={isEmitLoading || (isEmitStarted && !wasApproved)}
              >
                {!isEmitLoading && !isEmitStarted && 'Create FAM tokens'}
              </Button>
            </>
          )}
        </VStack>
      </Box>
    </>
  )
}
