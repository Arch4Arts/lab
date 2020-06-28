const twemoji = require('twemoji')

// Список файлов для копирования в сборку (Webpack CopyPlugin)
const FILE_LIST = [
  { from: './src/assets/favicon.png', to: 'assets/img/' },
  { from: './src/assets/info-circle.svg', to: 'assets/img/icons' },
  { from: './src/assets/exclamation-triangle.svg', to: 'assets/img/icons' },
]

// Текущий список смайликов, на основе этого списка производится копирование нужных файлов в сборку.
// * https://emojipedia.org
const EMOJI_LIST = [ 
  '😄',
  '😅',
  '😍',
  '❤️',
]

// Получаем Twemoji CodePaint (название файлов в twemoji-assets) из EMOJI_LIST
const twemojiCodeList = EMOJI_LIST.map((emoji) => {
  let result;
  twemoji.parse(emoji, { callback: (twemojiCode) => { result = twemojiCode } });
  return result;
});

// Формирование массива путей для копирования файлов в сбоку
const emojiPathsList = twemojiCodeList.map((twemojiCode) => {
  return { from: `./source_files/twemoji-assets/svg/${twemojiCode}.svg`, to: 'assets/img/twemoji/' }
})

const pathsForCopyPlugin = [].concat(emojiPathsList, FILE_LIST)

// экспорт в vue.config.js
module.exports = pathsForCopyPlugin;