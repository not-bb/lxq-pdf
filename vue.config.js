const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'docs',
  publicPath: '/lxq-pdf/',
  configureWebpack: {
    resolve: {
      extensions: ['.ts', '.js'],
      fallback: {
        https: false,
        url: false,
        os: false,
        http: false,
        util: false,
        assert: false,
        stream: false,
        buffer: false,
        crypto: false,
      },
    },
  },
})
