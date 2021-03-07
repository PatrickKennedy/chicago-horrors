const path = require('path')
const moment = require('moment')

process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_COMPILE_TIME = moment.utc().format('x')

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('#', path.resolve(__dirname, 'src', 'components'))
      .set('@img', path.resolve(__dirname, 'src', 'assets', 'images'))
      .set('@icon', path.resolve(__dirname, 'src', 'assets', 'images', 'icons'))
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: [path.resolve(__dirname, './src/styles/main.sass')],
    },
  },
}
