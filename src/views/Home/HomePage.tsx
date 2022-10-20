/*
 * @Author: byeond009 1249413181@qq.com
 * @Date: 2022-10-10 11:12:33
 * @LastEditors: byeond009 1249413181@qq.com
 * @LastEditTime: 2022-10-20 22:07:50
 * @FilePath: /vite-react-ts/src/views/Home/HomePage.tsx
 * @Description:
 *
 * Copyright (c) 2022 by byeond009 1249413181@qq.com, All Rights Reserved.
 */
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
  Chain,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import "@rainbow-me/rainbowkit/styles.css";
import { ethers } from "ethers";
import { Modal } from "@/components/Common/Modal";
const MoonbeamNetwork: Chain = {
  id: 1284,
  name: "Moonbeam",
  network: "Moonbeam",
  nativeCurrency: { name: "GLMR", symbol: "GLMR", decimals: 18 },
  rpcUrls: {
    default: "https://rpc.api.moonbeam.network",
  },
  testnet: false,
};
const moonbeamProvider = new ethers.providers.JsonRpcProvider(
  `https://moonbeam.public.blastapi.io`
);
const { chains, provider } = configureChains(
  [MoonbeamNetwork],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://moonbeam.public.blastapi.io`,
      }),
    }),
  ]
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
    addressOrName: "0xce6685530FbA7cC34538149B2278e213Ce73FcDa",
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
