const webpack = require('webpack');
const path = require('path');
const { readFileSync } = require('fs');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');

const DEV = process.env.NODE_ENV !== 'production';

const plugins = [
	new webpack.NamedModulesPlugin(),
	new webpack.optimize.OccurrenceOrderPlugin(),
	new webpack.NoEmitOnErrorsPlugin()
];

if (DEV) {
	plugins.push(
		new webpack.DefinePlugin({
			'process.env': {
				BUILD_TARGET: JSON.stringify('server'),
				NODE_ENV: JSON.stringify('development')
			},
		}),
		new StartServerPlugin({
      name: 'server.js'
    })
	);
} else {
	plugins.push(
		new webpack.DefinePlugin({
			'process.env': {
				BUILD_TARGET: JSON.stringify('server'),
				NODE_ENV: JSON.stringify('production')
			},
		})
	);
}

module.exports = {
  devtool: DEV ? 'inline-source-map' : 'source-map',
  entry: DEV ? [
		'webpack/hot/poll?1000',
		'./src/server'
	] : [
		'./src/server'
	],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, '/.build'),
    filename: 'server.js'
  },
	target: 'node',
	externals: DEV ? [
		nodeExternals({ whitelist: ['webpack/hot/poll?1000'] })
	] : [
		nodeExternals()
	],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {
						presets: [
							['env', {
								modules: false,
								targets: {
									node: 'current'
								},
								exclude: ['transform-regenerator']
							}]
						],
						plugins: [
							[
								'transform-react-jsx',
								{
									'pragma': 'h'
								}
							],
							'transform-object-rest-spread',
							'syntax-jsx',
							'syntax-flow',
							'transform-flow-strip-types'
						]
					}
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
				use: 'null-loader'
			}
    ]
  },
	plugins: plugins // eslint-disable-line
};
