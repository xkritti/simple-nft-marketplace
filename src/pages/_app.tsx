import "@/styles/globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ChainId } from "@thirdweb-dev/sdk";
import type { AppProps } from "next/app";
import MainLayout from "@/components/Layout";

const activeChains = ChainId.Mumbai;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={activeChains}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ThirdwebProvider>
  );
}
