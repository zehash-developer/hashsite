const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Get all component SCSS entry files
const scssEntries = glob.sync("./src/styles/blocks/*/*.scss");

module.exports = scssEntries.map((scssPath) => {
  const componentName = path.basename(path.dirname(scssPath));
  const entryName = `${componentName}`;

  return {
    name: `scss-${componentName}`,
    entry: { [entryName]: path.resolve(__dirname, scssPath) },
    output: {
      path: path.resolve(__dirname, `blocks/${componentName}`),
      filename: "[name].ignore.js", // Required placeholder
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                sassOptions: {
                  includePaths: [path.resolve(__dirname)],
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `${componentName}.css`,
      }),
    ],
    resolve: {
      extensions: [".scss"],
    },
    optimization: {
      minimize: false,
    },
    mode: "development",
    devtool: false,
    target: ["web"],
  };
});
