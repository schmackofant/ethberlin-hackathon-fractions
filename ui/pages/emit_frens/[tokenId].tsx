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
import { useState } from 'react'
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

  const [initialSupply, setInitialSupply] = useState(1000)
  const [FamLockAmount, setFamLockAmount] = useState(1)

  // approval
  const { config: contractWriteConfigForApproval } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_ERC1155_CONTRACT,
    contractInterface: IPNFTContractABI,
    functionName: 'setApprovalForAll',
    args: [process.env.NEXT_PUBLIC_FRENCONSTITUTOR_CONTRACT, true]
  })

  const {
    data: dataForApproval,
    write: setApprovalForAll,
    isLoading: isApprovalLoading,
    isSuccess: isApprovalStarted,
    error: approvalError
  } = useContractWrite(contractWriteConfigForApproval)
  const {
    data: approvalTxData,
    isSuccess: approvalTxSuccess,
    error: approvalTxError
  } = useWaitForTransaction({
    hash: dataForApproval?.hash
  })
  const wasApproved = approvalTxSuccess

  // Minting FRENS
  const { config: contractWriteConfigForEmit } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_FRENCONSTITUTOR_CONTRACT,
    contractInterface: FRENConstitutorContractABI,
    functionName: 'createFren',
    args: [tokenId, FamLockAmount, initialSupply]
  })

  const {
    data: dataForEmit,
    write: createFren,
    isLoading: isEmitFrenLoading,
    isSuccess: isEmitFrenStarted,
    error: emitFrenError
  } = useContractWrite(contractWriteConfigForEmit)
  const {
    data: frenTxData,
    isSuccess: frenTxSuccess,
    error: frenTxError
  } = useWaitForTransaction({
    hash: dataForEmit?.hash
  })
  const wasEmitted = frenTxSuccess

  return (
    <>
      <Heading as="h1" size="lg">
        Create FRENS tokens
      </Heading>

      <Box mt={4}>
        <VStack spacing={6}>
          {!wasApproved && (
            <Button
              colorScheme="green"
              onClick={setApprovalForAll as any}
              loadingText="Waiting for approval..."
              isLoading={
                isApprovalLoading || (isApprovalStarted && !wasApproved)
              }
            >
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
                  onChange={(e) => setFamLockAmount(parseInt(e.target.value))}
                />
              </FormControl>

              <Button
                colorScheme="green"
                onClick={createFren as any}
                loadingText="Waiting for transaction..."
                // isDisabled={
                //   !emitFAM || isEmitLoading || isEmitStarted || !isConnected
                // }
                isLoading={
                  isEmitFrenLoading || (isEmitFrenStarted && !wasEmitted)
                }
              >
                Create FRENS
              </Button>

              {wasEmitted && (
                <Alert status="success" mt={8}>
                  <AlertIcon />
                  Your FRENS tokens were successfully created!&nbsp;
                  <a
                    style={{ textDecoration: 'underline' }}
                    target="_blank"
                    href={`https://goerli.etherscan.io/tx/${frenTxData?.transactionHash}`}
                    rel="noreferrer"
                  >
                    View Transaction
                  </a>
                </Alert>
              )}
            </>
          )}
        </VStack>
      </Box>
    </>
  )
}
