import { Box, Divider, Heading, Image, Stack, Text } from '@chakra-ui/react'

export default function Home() {
  return (
    <>
      <Heading as="h1" size="lg">
        Tokenized Intellectual Property.
        <br />
      </Heading>
      <Box boxSize="l" my="30px">
        <Image
          src="/images/fractional.jpg"
          borderRadius="5px"
        />
      </Box>
      <Divider orientation="horizontal" marginBottom="30px" />
      <Text fontStyle="italic">
        Scientists must collect funds to conduct research. Patients should be
        empowered to fund therapeutics. Fractionalized IP-NFTs enable risk
        sharing partnerships for researchers, investors and patients.
      </Text>
    </>
  )
}
