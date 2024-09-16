const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "app.js",
    library: "ReactFormBuilder",
    libraryTarget: "umd",
    umdNamedDefine: true,
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss", ".css", ".json"],
  },
  module: {
    rules: [
      // Load JavaScript and JSX files with Babel
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      // Load SCSS files
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: false, // Desactiva la generación de source maps para SCSS
              sassOptions: {
                includePaths: ["./node_modules"],
              },
            },
          },
        ],
      },
      // Load CSS files from node_modules
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
            },
          },
        ],
        include: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
  devtool: false, // Desactiva los source maps en la configuración general
};
