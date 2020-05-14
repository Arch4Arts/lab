const SentryCliPlugin = require('@sentry/webpack-plugin');
var packageJson = require('D:/Dev/lab/package.json');
const webpack = require('webpack')

module.exports = {
  configureWebpack: config => {
    // config.output.filename = 'js/[name].js';
  },
  chainWebpack: config => {
    config.module
      .rule('i18n-loader')
      .test(/.\.yaml$/)
      .use('json')
        .loader('json-loader')
      .end()
      .use('yaml')
        .loader('yaml-loader')
      .end();

      // Исключает комментарии из chunk-vendors.js
      config.optimization.minimizer('terser').tap((args) => {
        args[0].terserOptions.output = {
          ...args[0].terserOptions.output,
          comments: false
        }
        return args
      })
  },
  configureWebpack: {
    plugins: 
    // Undefined - community версия, т.к в .env.production нет переменной VUE_APP_EDITION, но есть в .env.special
    (process.env.VUE_APP_EDITION === undefined && process.env.NODE_ENV !== 'development') ? // Production
      [
      new SentryCliPlugin({ // Обработчик ошибок
        release: packageJson.version, // извлечение версии игры из переменной
        include: `./dist/${packageJson.name} ${packageJson.version} community/js/`, // Загрузка js файлов на сервер
        filenameTransform: filename => '~/js/' + filename,
        ignoreFile: '.sentrycliignore',
        ignore: ['node_modules', 'webpack.config.js'],
      }),
      // Не включает файлы в сборку, попадаюшие под данное регулярное выражение
      // Таким образом все файлы Special Edtion должны оканчиваться на _special.vue
      new webpack.IgnorePlugin(/.*_special.vue/)
      ]
    : (process.env.VUE_APP_EDITION === 'special') ? // Special
        [
          new SentryCliPlugin({ // Обработчик ошибок
            release: packageJson.version, // извлечение версии игры из переменной
            include: `./dist/${packageJson.name} ${packageJson.version} special/js/`, // Загрузка js файлов на сервер
            // filenameTransform: filename => '~/js/' + filename,
            ignoreFile: '.sentrycliignore',
            ignore: ['node_modules', 'webpack.config.js'],
          }),
        ]
      : // Development
        [
          // new SentryCliPlugin({ // Обработчик ошибок
          //   release: packageJson.version, // извлечение версии игры из переменной
          //   include: 'D:/Dev/lab/dist/js/', // Загрузка js файлов на сервер
          //   // filenameTransform: filename => '~/js/' + filename,
          //   ignoreFile: '.sentrycliignore',
          //   ignore: ['node_modules', 'webpack.config.js'],
          // }),
        ]
  },
  // chainWebpack: config => {
  //   config.module
  //     .rule('images')
  //     .use('url-loader')
  //     .loader('url-loader')
  //     .tap(options => {
  //       options.limit = -1
  //       return options
  //     });
  // },
  // chainWebpack: (config) => {
  //   const svgRule = config.module.rule('svg');
 
  //   svgRule.uses.clear();
 
  //   svgRule
  //     .use('babel-loader')
  //     .loader('babel-loader')
  //     .end()
  //     .use('vue-svg-loader')
  //     .loader('vue-svg-loader');
  // },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  },

  publicPath: './',
  // Undefined - community версия, т.к в .env.production нет переменной VUE_APP_EDITION, но есть в .env.special
  outputDir: (process.env.VUE_APP_EDITION === undefined) ? 
    `./dist/${packageJson.name} ${packageJson.version} community` 
  : 
    `./dist/${packageJson.name} ${packageJson.version} special`,
  // Каталог для хранения сгенерированных статических ресурсов (js, css, img, fonts).
  assetsDir: 'assets',
  filenameHashing: false,
  // чтобы ошибки в консоле указавали точно местоположение в js
  productionSourceMap: false,
}
