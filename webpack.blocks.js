/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const scssFiles = glob.sync('./src/styles/blocks/*/*.scss');

const configs = scssFiles.map((file) => {
  const match = file.match(/src\/styles\/blocks\/([^/]+)\/\1\.scss$/);
  if (!match) return null;

  const name = match[1];
  return {
    name,
    entry: {
      [name]: path.resolve(__dirname, `src/styles/blocks/${name}/${name}.scss`),
    },
    output: {
      path: path.resolve(__dirname, `blocks/${name}`),
      filename: '[name].js', // dummy
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `${name}.css`,
      }),
    ],
    mode: 'production',
    cache: false,
    optimization: {
      splitChunks: false,
    },
  };
}).filter(Boolean);

module.exports = configs;
