var path = require('path')
var webpack = require('webpack')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')

// Phaser webpack config
var phaserModule = path.join(__dirname, '/game/lib/')
var phaser = path.join(phaserModule, 'phaser.js')
var phaser_input = path.join(phaserModule, 'phaser-input.js')

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, 'game/game.js')
    ]
  },
  devtool: 'source-map',
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'build'),
    publicPath: './build/',
    filename: 'game.js'
  },
  watch: true,
  module:{
    loaders: [
      { test: /\.js$/, loader: 'babel', include: path.join(__dirname, 'game') },
      { test: /phaser\.js$/, loader: 'expose?Phaser' }
    ]
  }
  node: {
    fs: 'empty'
  },
  resolve: {
    alias: {
      'phaser': phaser
    }
  }
}
