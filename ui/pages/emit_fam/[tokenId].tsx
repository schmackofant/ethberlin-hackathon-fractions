import { Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function EmitFAM() {
  const router = useRouter()
  const { tokenId } = router.query

  return (
    <>
      <Heading as="h1" size="lg">
        Emit FAM tokens for IP-NFT {tokenId}
      </Heading>
    </>
  )
}
