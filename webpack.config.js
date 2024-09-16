const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./app.js",
  devtool: "source-map", // Mantén esta opción para generar source maps
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "app.js",
    library: "MyLibrary",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss", ".css", ".json"],
    alias: {
      jquery: path.resolve(__dirname, "./jquery-stub.js"),
    },
  },
  plugins: [
    // Agrega tus plugins aquí si es necesario
  ],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader", // Inyecta estilos en el DOM
          },
          {
            loader: "css-loader", // Carga archivos CSS
            options: {
              sourceMap: true, // Activa los source maps para CSS
            },
          },
          {
            loader: "sass-loader", // Compila SCSS a CSS
            options: {
              sourceMap: true, // Activa los source maps para SCSS
              sassOptions: {
                includePaths: ["./node_modules"], // Rutas para incluir en SCSS
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true, // Activa los source maps para CSS
            },
          },
          "postcss-loader",
        ],
        enforce: "pre",
        include: /node_modules/,
      },
    ],
  },
};
