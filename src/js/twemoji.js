const twemoji = require('twemoji')

// Текущий список смайликов, на основе этого списка производится копирование нужных файлов в сборку.
// * https://emojipedia.org
const EMOJI_LIST = [ 
  '😄',
  '😅',
  '😍',
  '❤️',
]

// Получаем Twemoji CodePaint (название файлов в twemoji-assets) из EMOJI_LIST
let twemojiCodeList = EMOJI_LIST.map((emoji) => {
  let result;
  twemoji.parse(emoji, { callback: (twemojiCode) => { result = twemojiCode } });
  return result;
});

// Формирование массива путей для копирования файлов в сбоку
let copyPluginPaths = twemojiCodeList.map((twemojiCode) => {
  return { from: `./source_files/twemoji-assets/svg/${twemojiCode}.svg`, to: 'assets/img/twemoji/' }
})

// экспорт в vue.config.js
module.exports = copyPluginPaths