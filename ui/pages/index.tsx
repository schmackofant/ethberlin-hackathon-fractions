import { Flex, Heading, Button, useColorMode, useColorModeValue} from "@chakra-ui/react";
import IpnftCard from "@/components/IpnftCard";

export default function Home() {
  const { toggleColorMode} = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex background={formBackground} height="100vh" width="60rem" direction="column" padding="10">
        <Button onClick={toggleColorMode}>Toggle Color Mode</Button>
        <IpnftCard/>
    </Flex>
    </Flex>
  )
}
