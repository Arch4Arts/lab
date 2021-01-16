import localforage from 'localforage';
import { savesNotify } from '../../../js/notificationSystem';

function _readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  })
}

function str2ab(str) {
  let data = new Object();
  data.buf = new ArrayBuffer(str.length);
  data.bufView = new Uint8Array(data.buf);
  for (const i = 0, strLen = str.length; i < strLen; i++) {
    data.bufView[i] = str.charCodeAt(i);
  }
  return data;
};

function getHeaderSavesList(savesList) {
  const saveHeaderList = [];
  for (const save of savesList) {
    saveHeaderList.push(`${save.saveName},${save.saveTime},${save.saveID},${save.saveGameVersion}`);
  }
  return saveHeaderList;
}

function _loadSaves(saveFile, savesList) {
  if (saveFile.includes('cipherData')) {
    saveFile = JSON.parse(saveFile)
    const saveHeaderList = getHeaderSavesList(savesList)
    for (const save of saveFile) {
      // Проверка на дубликаты
      if (saveHeaderList.includes(save.saveHeader) !== true) {
        localforage.setItem(
          save.saveHeader, 
          { cipherData: str2ab(save.saveData.cipherData).buf, 
            iv: str2ab(save.saveData.iv).bufView }
        )
        const saveHeader = save.saveHeader.split(',');
        savesList.push({ 
          saveName: saveHeader[0], 
          saveTime: saveHeader[1], 
          saveID: saveHeader[2], 
          saveGameVersion: saveHeader[3]
        })        
      }
    }
    savesNotify.import({message: this.$t('notify-load-from-disk')})
  } 
  else {
    savesNotify.importError({message: this.$t('notify-load-from-disk-error')})
  }
}

export async function loadFromDisk(event, savesList) {
  const files = event.target.files
  for (const file of files) {
    _readFile(file)
      .then(saveFile => _loadSaves.call(this, saveFile, savesList))
      .then(() => this.updateSaveList())
      .catch(err => this.$root.pushError(err))   
  }
}

export function chooseFiles() {
  document.getElementById("saveUpload").click()
}