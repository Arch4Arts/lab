const SentryWebpackPlugin = require("@sentry/webpack-plugin");
const WebpackObfuscator = require('webpack-obfuscator');
const RemovePlugin = require('remove-files-webpack-plugin');
const packageJson = require('./package.json');
const CopyPlugin = require('copy-webpack-plugin');

const emojiFileList = require('./src/js/twemoji')
const fileList = [].concat(emojiFileList) 

module.exports = {
  chainWebpack: config => {
    // поддержка yaml и json файлов
    config.module
      .rule('i18n-loader')
      .test(/.\.yaml$/)
      .use('json')
        .loader('json-loader')
      .end()
      .use('yaml')
        .loader('yaml-loader')
      .end();

      // Удаляет комментарии из chunk-vendors.js
      config.optimization.minimizer('terser').tap((args) => {
        args[0].terserOptions.output = {
          ...args[0].terserOptions.output,
          comments: false
        }
        return args
      })
  },
  configureWebpack: {
    module: {
      rules: [ 
        {
          test: /specialActivate.js/,
          enforce: 'post',
          use: { 
              loader: WebpackObfuscator.loader, 
              options: {
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 1,
                deadCodeInjection: true,
                deadCodeInjectionThreshold: 1,
                identifierNamesGenerator: 'hexadecimal',
                numbersToExpressions: true,
                rotateStringArray: true,
                selfDefending: true,
                shuffleStringArray: true,
                simplify: true,
                splitStrings: true,
                splitStringsChunkLength: 5,
                stringArray: true,
                stringArrayEncoding: ['rc4'],
                stringArrayWrappersCount: 5,
                stringArrayWrappersChainedCalls: true,
                stringArrayWrappersType: 'function',
                stringArrayThreshold: 1,
                transformObjectKeys: true,
              }
          }
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
          exclude: /node_modules/,
        },
    ]
    },
    plugins: (process.env.NODE_ENV !== 'development' && process.env.FORMAT !== 'library') ? // Production
      [
        new SentryWebpackPlugin({
          release: packageJson.version,
          include: `./dist/${packageJson.name} ${packageJson.version}/assets/js/`,
          ignore: ["node_modules", "vue.config.js"],
        }),
        new RemovePlugin({ // Удаление Source Maps после сборки
          after: {
            root: `./dist/${packageJson.name} ${packageJson.version}/assets/`,
            test: [
              {
                folder: './js',
                method: (absoluteItemPath) => {
                  return new RegExp(/\.js\.map$/, 'm').test(absoluteItemPath);
                },
                recursive: true
              }
            ],
            trash: true
          }
        }),
        new CopyPlugin({
          patterns: fileList
        }),
      ] : [
        new CopyPlugin({
          patterns: fileList
        }),
      ], // Development
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },

  publicPath: './',
  outputDir: `./dist/${packageJson.name} ${packageJson.version}`,
  assetsDir: 'assets',        // Каталог для хранения сгенерированных статических ресурсов (js, css, img, fonts).
  filenameHashing: false,
  productionSourceMap: true,
}
