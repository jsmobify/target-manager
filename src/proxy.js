const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
app.use(
  "/",
  createProxyMiddleware({
    target: "https://cloud.mobify.com/",
    changeOrigin: true
  })
);
app.listen(4000);