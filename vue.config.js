const SentryCliPlugin = require('@sentry/webpack-plugin');
const packageJson = require('D:/Dev/lab/package.json');
const CopyPlugin = require('copy-webpack-plugin');

const emojiFileList = require('./src/js/twemoji')
const faviconPath = { from: './src/assets/favicon.png', to: 'assets/img/' }
const fileList = [].concat(emojiFileList, faviconPath) 


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

      config.module
      .rule('worker')
      .test(/\.worker\.js$/i)
      .use('worker-loader')
      .loader('worker-loader')
      .tap(options => {
        return {
          inline: 'no-fallback',
          // filename: 'MyWorker.[hash].js'
        };
      })
      .end();
      config.module.rule('js').exclude.add(/\.worker\.js$/); // to avoid cache

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
    plugins: (process.env.NODE_ENV !== 'development' && process.env.FORMAT !== 'library') ? // Production
      [
        new CopyPlugin({
          patterns: fileList
        }),
        new SentryCliPlugin({ // Обработчик ошибок
          release: packageJson.version, // извлечение версии игры из переменной
          include: `./dist/${packageJson.name} ${packageJson.version} community/js/`, // Загрузка js файлов на сервер
          filenameTransform: filename => '~/js/' + filename,
          ignoreFile: '.sentrycliignore',
          ignore: ['node_modules', 'webpack.config.js'],
        }),
      ] : [] // Development
  },
  css: {
    extract: false,
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
  productionSourceMap: false,
}
