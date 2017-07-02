const webpack = require('webpack');
const path = require('path');
const { readFileSync } = require('fs');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const Purify = require('purifycss-webpack-plugin');

const babelSettings = JSON.parse(readFileSync('.babelrc'));
const DEV = process.env.NODE_ENV !== 'production';
const MAPS = process.env.MAPS !== undefined;
const ANALYZE = process.env.ANALYZE !== undefined;

const extractSass = new ExtractTextPlugin({
	filename: '[name].[contenthash].css',
	disable: DEV
});

const plugins = [
	//new webpack.optimize.ModuleConcatenationPlugin(),
	new webpack.NamedModulesPlugin(),
	new webpack.optimize.OccurrenceOrderPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
	new webpack.optimize.CommonsChunkPlugin({
		names: 'vendor',
		minChunks: Infinity
	}),
	new webpack.optimize.CommonsChunkPlugin({
		async: true,
		children: true,
		minChunks: 4
	}),
	new AssetsPlugin(
	{
		path: '.build/',
		filename: 'assets.json'
	}),
  new webpack.DefinePlugin({
    'process.env': {
      BUILD_TARGET: JSON.stringify('client'),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  })
];

const rules = [
	{
		test: /\.(js)$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			query: babelSettings
		}
	}, {
    test: /\.(png|jpg|gif|svg)$/,
    loader: 'url-loader',
    options: {
      limit: 1,
      name: '[name].[hash].[ext]'
    }
  }, {
		test: /\.scss$/,
		use: extractSass.extract({
			use: [{
				loader: 'css-loader'
			}, {
				loader: `sass-loader?includePaths[]=${path.resolve(__dirname, '../node_modules')}` // eslint-disable-line
			}],
			fallback: 'style-loader'
		})
	}
];

const entry = {
	main: [
		'./src/index.js'
	],
	vendor: [
		'hyperapp',
    '@hyperapp/router',
		'shortid',
    'qim'
	]
};

let DEVTOOL = false;
if (DEV) {
	DEVTOOL = 'inline-source-map';

	entry.main.push(
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
	);

	plugins.push(
		new webpack.HotModuleReplacementPlugin()
	);
} else {
	plugins.push(
    new webpack.NoEmitOnErrorsPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    }),
		new ExtractTextPlugin('styles.[hash].css')/*,
		new Purify({
      basePath: __dirname,
      paths: [
        'dist/main*.js'
      ]
    })*/
	);

	if (MAPS) {
		DEVTOOL = 'cheap-module-source-map';
	}

	if (ANALYZE) {
		plugins.push(
			new BundleAnalyzerPlugin()
		);
	}
}

module.exports = {
  devtool: DEVTOOL,
  entry: entry, // eslint-disable-line
  resolve: {
    extensions: ['.js']
  },
	externals: DEV ? [] : [
		'redux',
		'lodash-es',
		'hyperapp-redux-devtools',
		'hyperapp-webpack-hmr',
		'redux-devtools-extension'
	],
  output: {
    path: path.join(__dirname, '.build/'),
    filename: DEV ? '[name].js' : '[name].[hash].js',
    chunkFilename: DEV ? '[name].js' : '[name].[hash].js'
  },
  module: {
    rules: rules // eslint-disable-line
  },
	plugins: plugins // eslint-disable-line
};
