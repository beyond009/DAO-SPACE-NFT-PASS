/*
 * @Author: byeond009 1249413181@qq.com
 * @Date: 2022-10-10 11:12:33
 * @LastEditors: byeond009 1249413181@qq.com
 * @LastEditTime: 2022-10-21 11:36:18
 * @FilePath: /vite-react-ts/src/main.tsx
 * @Description:
 *
 * Copyright (c) 2022 by byeond009 1249413181@qq.com, All Rights Reserved.
 */
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/redux/store";
import "./assets/styles/index.css";
import "@/i18n";
import { Route } from "react-router";
import NotFound from "@/views/NotFound";
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
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { ethers } from "ethers";

const avalancheChain: Chain = {
  id: 43_114,
  name: "Avalanche",
  network: "avalanche",
  nativeCurrency: {
    decimals: 18,
    name: "Avalanche",
    symbol: "AVAX",
  },
  rpcUrls: {
    default: "https://api.avax.network/ext/bc/C/rpc",
  },
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://snowtrace.io" },
  },
  testnet: false,
};

const { chains, provider } = configureChains(
  [avalancheChain],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://api.avax.network/ext/bc/C/rpc`,
      }),
    }),
  ]
);

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

const { connectors } = getDefaultWallets({
  appName: "DAO SPACE NFT PASS",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const Home = lazy(() => import("@/views/Home"));

const App = (): JSX.Element => {
  return (
    <Suspense fallback={<></>}>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/home" component={Home} />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </Suspense>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <WagmiConfig client={wagmiClient}>
          <App />
        </WagmiConfig>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
