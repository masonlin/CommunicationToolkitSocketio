module.exports = {
    entry: './js/app.js',
    output: {
        path: './js/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
          { test: /\.css$/, loader: "style-loader!css-loader" },
          { test: /\.png$/, loader: "url-loader?limit=100000" },
          { test: /\.jpg$/, loader: "file-loader" },
          { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: "url-loader?limit=100000" },
          { test: /\.json$/, loader: "json-loader" },
          // { test: /\.js$/, exclude: /node_modules/, loader: 'jsx-loader' },
          { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: 'babel', query: {presets: ['es2015']} },
          // { test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: {presets: ['react']} }
        ]
    }
};
