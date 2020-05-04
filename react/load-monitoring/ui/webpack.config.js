const path = require(`path`);
const HTMLPlugin = require(`html-webpack-plugin`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);

// Define loaders
const loaders = {
  babel: `babel-loader`,
  html: `html-loader`,
  file: `file-loader`,
  style: `style-loader`,
  css: [
    { loader: MiniCssExtractPlugin.loader },
    'css-loader',
  ],
};

// Define Webpack config
const config = {
  target: "web",
  mode: `development`,
  devtool: 'source-map',
  context: path.join(__dirname, `src`),
  entry: `./index`,
  output: {
    filename: `app.js`,
    path: path.join(__dirname, `dist`),
  },
  plugins: [
    new HTMLPlugin({ template: `index.html` }),
    new MiniCssExtractPlugin({
      filename: `style.css`,
    }),
  ],
  resolve: {
    modules: [`node_modules`, path.join(__dirname, `src `)],
    aliasFields: [`browser`],
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: loaders.babel
    }, {
      test: /\.html$/,
      use: loaders.html,
    }, {
      test: /\.css$/,
      use: loaders.css,
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: loaders.file,
        options: {
          name: `assets/[hash].[ext]`,
        }
      }]
    }]
  }
};

module.exports = config;
