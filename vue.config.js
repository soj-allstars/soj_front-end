const webpack = require("webpack");
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
		plugins: [
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery',
				Popper: ['popper.js', 'default']
			}),
			new CompressionPlugin({
				test: /\.(js|css|html|svg)(\?.*)?$/i,
				algorithm: 'gzip',
				threshold: 10240,
				minRatio: 0.8,
			}),
		],
		devtool: 'source-map',
  },
  assetsDir: './static',
}