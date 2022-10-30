/*
 * @Author: byeond009 1249413181@qq.com
 * @Date: 2022-10-10 11:12:33
 * @LastEditors: byeond009 1249413181@qq.com
 * @LastEditTime: 2022-10-21 15:38:04
 * @FilePath: /vite-react-ts/src/views/Home/HomePage.tsx
 * @Description:
 *
 * Copyright (c) 2022 by byeond009 1249413181@qq.com, All Rights Reserved.
 */

import React, { useState, useEffect } from "react";
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
  useSignMessage,
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
const AvalancheProvider = new ethers.providers.JsonRpcProvider(
  `https://api.avax.network/ext/bc/C/rpc`
);
const AvalancheNetwork: Chain = {
  id: 43114,
  name: "Avalanche",
  network: "Avalanche",
  nativeCurrency: { name: "AVAX", symbol: "AVAX", decimals: 18 },
  rpcUrls: {
    default: "https://api.avax.network/ext/bc/C/rpc",
  },
  testnet: false,
};
const moonbeamProvider = new ethers.providers.JsonRpcProvider(
  `https://moonbeam.public.blastapi.io`
);

const { chains, provider } = configureChains(
  [AvalancheNetwork],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://api.avax.network/ext/bc/C/rpc`,
      }),
    }),
  ]
);
const HomeWrap = (): JSX.Element => {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const [visible, setVisible] = useState(false);
  const [tokenIds, setTokenIds] = useState([]);
  const provider = useProvider();
  const signMessage = useSignMessage({
    message: "gm wagmi frens",
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const balanceOf = () => {
    const { data, isFetching } = useContractRead({
      addressOrName: "0xF94AEc47Decd15655755b4feb0D7399b7fEE3145",
      contractInterface: ERC721Interface,
      functionName: "balanceOf",
      args: address,
    });
    return data;
  };
  const fetchNFT = async (address: string) => {
    console.log(address);
    const NFT = new ethers.Contract(
      "0xF94AEc47Decd15655755b4feb0D7399b7fEE3145",
      ERC721Interface,
      provider
    );
    const balance = await NFT.balanceOf(address);
    console.log(Number(balance));
    const tmpTokenIds: any = [];
    for (let i = 0; i < balance; i++) {
      const id = await NFT.tokenOfOwnerByIndex(address, i);
      tmpTokenIds.push(id);
    }

    setTokenIds(tmpTokenIds);
  };
  useEffect(() => {
    console.log(isConnected, address);
    if (isConnected && address) {
      fetchNFT(address);
    }
  }, [isConnected]);
  return (
    <RainbowKitProvider chains={chains}>
      <div className="flex justify-center items-center w-full flex-col p-6">
        <ConnectButton />
        <div className="flex justify-center items-center mt-8 title-font">
          NFT PASS
        </div>
        {tokenIds.map((v, k) => {
          return <Card key={k} tokenId={Number(v)} />;
        })}
      </div>
    </RainbowKitProvider>
  );
};

export default HomeWrap;
