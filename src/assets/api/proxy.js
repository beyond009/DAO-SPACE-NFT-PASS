/*
 * @Author: byeond009 1249413181@qq.com
 * @Date: 2022-10-21 16:02:01
 * @LastEditors: byeond009 1249413181@qq.com
 * @LastEditTime: 2022-10-21 16:06:03
 * @FilePath: /vite-react-ts/src/assets/api/proxy.js
 * @Description:
 *
 * Copyright (c) 2022 by byeond009 1249413181@qq.com, All Rights Reserved.
 */
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (req, res) => {
  let target = "";

  if (req.url.startsWith("/api")) {
    target = "https://61618mh025.zicp.fun" + req.url.replace(/^\/api/, "");
    createProxyMiddleware({
      target,
      changeOrigin: true,
    })(req, res);
  }
};
