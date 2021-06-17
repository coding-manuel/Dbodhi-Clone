module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        "/api": {
          target: "https://dbodhi-clone.herokuapp.com",
        },
      },
    },
  },
};
