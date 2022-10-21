/*
 * @Author: byeond009 1249413181@qq.com
 * @Date: 2022-10-10 11:12:33
 * @LastEditors: byeond009 1249413181@qq.com
 * @LastEditTime: 2022-10-21 14:12:30
 * @FilePath: /vite-react-ts/vite.config.ts
 * @Description:
 *
 * Copyright (c) 2022 by byeond009 1249413181@qq.com, All Rights Reserved.
 */
import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import * as path from "path";
import { existsSync } from "fs";
import dotenv from "dotenv";

// Dotenv 是一个零依赖的模块，它能将环境变量中的变量从 .env 文件加载到 process.env 中
dotenv.config({
  path: existsSync(".env")
    ? ".env"
    : path.resolve("envs", `.env.${process.env.NODE_ENV}`),
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      "@@": path.resolve(__dirname),
      "@": path.resolve(__dirname, "src"),
    },
  },
  publicDir: "public",
  server: {
    proxy: {
      "/api": {
        target: "https://61618mh025.zicp.fun",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    cors: true,
    port: process.env.VITE_PORT as unknown as number,
    hmr: {
      host: "localhost",
      protocol: "ws",
      port: process.env.VITE_PORT as unknown as number,
    },
  },
});
