import { ChakraProvider, Container } from "@chakra-ui/react";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { chain, createClient, WagmiConfig } from "wagmi";
import { getDefaultProvider } from "ethers";
import MainNav from "@/components/MainNav";

const chains = [chain.goerli];
export const ethersConfig = {
  provider: getDefaultProvider("goerli", {
    infura: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID,
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
        <ConnectKitProvider>
        <Container centerContent>
              <Container maxW={'4xl'} m={6} minWidth="4xl">
          <MainNav />
          <Component {...pageProps} />
          </Container>
          </Container>
        </ConnectKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default MyApp;
