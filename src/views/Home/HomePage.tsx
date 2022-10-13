import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { ERC721Interface } from "@/ABI/ERC721";
import { Gap } from "@/components/Common";
import { Card } from "./components";
import "./index.css";
import {
  chain,
  configureChains,
  createClient,
  useAccount,
  useContractRead,
  useContractReads,
  useContractWrite,
  useProvider,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";
import { ethers } from "ethers";
import { Modal } from "@/components/Common/Modal";
const { chains, provider } = configureChains(
  [chain.goerli],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "DAO SPACE NFT PASS",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
const HomeWrap = () => {
  const [visible, setVisible] = useState(false);
  const { data } = useContractRead({
    addressOrName: "0xE9f75B380C751C070bB0894302D6ecE19B85f2A6",
    contractInterface: ERC721Interface,
    functionName: "balanceOf",
    args: "0x4774c2140f54dca848781c391e7f695a5Ad38b2b",
  });
  console.log(Number(data));
  return (
    <RainbowKitProvider chains={chains}>
      <div className="flex justify-center items-center w-full flex-col p-6">
        <ConnectButton />
        <div className="flex justify-center items-center mt-8 title-font">
          NFT PASS
        </div>
        <Card setVisible={setVisible} />
        <Modal visible={visible} setVisible={setVisible} />
      </div>
    </RainbowKitProvider>
  );
};
const Home = (): JSX.Element => {
  return (
    <WagmiConfig client={wagmiClient}>
      <HomeWrap />
    </WagmiConfig>
  );
};

export default Home;
