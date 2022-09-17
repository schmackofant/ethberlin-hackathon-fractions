import { Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function ViewIPNFT() {
  const router = useRouter()
  const { tokenId } = router.query

  return (
    <>
      <Heading as="h1" size="lg">
        View IP-NFT {tokenId}
      </Heading>
    </>
  )
}
