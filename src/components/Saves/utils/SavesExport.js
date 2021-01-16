import localforage from 'localforage';
import dayjs from 'dayjs'; // библиотека для работы с временем
import advancedFormat from 'dayjs/plugin/advancedFormat'; // Плагин
dayjs.extend(advancedFormat);
import { savesNotify } from '../../../js/notificationSystem';

function _writeToDisk(filename, data, mime, bom) { // запись файла на диск
  let blobData = (typeof bom !== 'undefined') ? [bom, data] : [data]
  let blob = new Blob(blobData, {type: mime || 'application/octet-stream'});
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    window.navigator.msSaveBlob(blob, filename);
  }
  else {
    let blobURL = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob);
    let tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', filename);
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank');
    }
    document.body.appendChild(tempLink);
    tempLink.click();
    setTimeout(function() {
      document.body.removeChild(tempLink);
      window.URL.revokeObjectURL(blobURL);
    }, 0)
  }
}

async function _getSaveData(save) {
  const saveData = await localforage.getItem(save).then(data => data)
  // Преобразовываем буфер в строку
  const cipherData = String.fromCharCode.apply(null, new Uint8Array(saveData.cipherData));
  // Преобразовываем представление Uint8 в строку
  const iv = String.fromCharCode.apply(null, new Uint8Array(saveData.iv));
  return {
    saveHeader: save,
    saveData: {
      cipherData,
      iv
    }
  }
}

async function _writeSaveFile(savesList) {
  const saveFile = [];
  for (const save of savesList) {
    await _getSaveData(save).then(saveData => saveFile.push(saveData))
  }
  _writeToDisk(`${this.$root.gameName}-${dayjs().format("DD.MM.YYYY - HH:mm")}.${(saveFile.length > 1 ? 'saves' : 'save')}`, JSON.stringify(saveFile, null, 2))
  savesNotify.export({message: this.$t('notify-save-to-disk')});
}


export default async function saveToDisk() {
  if (this.listSelectedSaves.length) { // Выбранны ли определённые сохранения пользователем
    _writeSaveFile.call(this, this.listSelectedSaves)
  }
  else if (this.savesList.length) { // Если нет, обрабатываем всё
    const allSaves = await localforage.keys().then(keysList => keysList)
    _writeSaveFile.call(this, allSaves)
  }
  else {
    savesNotify.exportError({message: this.$t('notify-save-to-disk-error')});
  }
  this.clearSelectedSavesList()
}