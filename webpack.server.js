const webpack = require('webpack');
const path = require('path');
const { readFileSync } = require('fs');
const nodeExternals = require('webpack-node-externals');

const DEV = process.env.NODE_ENV !== 'production';

const plugins = [
	new webpack.NamedModulesPlugin(),
	new webpack.optimize.OccurrenceOrderPlugin(),
	new webpack.NoEmitOnErrorsPlugin()
];

module.exports = {
  devtool: 'inline-source-map',
  entry: [
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
	externals: [
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
      }
    ]
  },
	plugins: plugins // eslint-disable-line
};
