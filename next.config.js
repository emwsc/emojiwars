const path = require("path");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // config.module.rules.push({
    //   test: /\.ts?$/,
    //   use: [
    //     defaultLoaders.babel,
    //     {
    //       loader: "ts-loader",
    //     },
    //   ],
    //   include: [path.join(__dirname, "..", "shared")],
    // });
    return config;
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
};
