var webpack = require('webpack');

module.exports = {
	entry: {
		bundle: './js/app.js'
	},
	output: {
		path: __dirname + '/dist/js',
		filename: '[name].js',
		sourceMapFilename: '[file].map?hash=[hash]'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.js?$/,
				loader: 'babel',
				exclude: /node_modules/
				// query: {
				// 	presets: ['es2015', 'react', 'stage-1']
				// }
			}
		]
	}
	// plugins: [
 //  //       new webpack.optimize.UglifyJsPlugin({
	// 	//     compress: {
	// 	//         warnings: false
	// 	//     }
	// 	// })
	// 	['transform-decorators-legacy']
 //    ]
}