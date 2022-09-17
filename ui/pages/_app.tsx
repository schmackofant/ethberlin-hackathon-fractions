import { Box,ChakraProvider, Container } from "@chakra-ui/react";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { getDefaultProvider } from "ethers";
import { chain, createClient, WagmiConfig } from "wagmi";

import MainNav from "@/components/MainNav";

const chains = [chain.rinkeby];
export const ethersConfig = {
  provider: getDefaultProvider("rinkeby", {
    infura: process.env.NEXT_PUBLIC_INFURA_ID,
    etherscan: '-',
    alchemy: '-',
    pocket: '-',
    ankr: '-'
  }),
};

const client = createClient(
  getDefaultClient({
    appName: "Tokenized IP",
    autoConnect: true,
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    chains,
  })
);

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <WagmiConfig client={client}>
        <ConnectKitProvider options={{
          walletConnectName: "WalletConnect",
          hideNoWalletCTA: true
        }}>
          <Container centerContent>
            <Container maxW={'4xl'} m={6} minWidth="3xl">
              <MainNav />
              <Box px={4} py={6} bg='gray.100' borderRadius="md" mt={4}>
                <Component {...pageProps} />
              </Box>
            </Container>
          </Container>
        </ConnectKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default MyApp;
