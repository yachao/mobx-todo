var webpack = require('webpack');

module.exports = {
	entry: {
		bundle: ['babel-polyfill', './js/app.js']
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
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
		  'process.env': { 
		     NODE_ENV: JSON.stringify('production') 
		   }
		}),
        new webpack.optimize.UglifyJsPlugin({
		    compress: {
		        warnings: false
		    }
		})
    ]
}