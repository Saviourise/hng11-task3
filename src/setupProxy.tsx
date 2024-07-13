const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app: any) {
  app.use(
    createProxyMiddleware({
      target: "https://api.timbu.cloud",
      changeOrigin: true,
    })
  );
};
