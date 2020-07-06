import localforage from 'localforage';
import { saveNotify } from '../../../js/notificationSystem';

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
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    data.bufView[i] = str.charCodeAt(i);
  }
  return data;
};

function _loadSaves(saveFile, savesList) {
  if (saveFile.includes('cipherData')) {
    saveFile = JSON.parse(saveFile)
    for (const save of saveFile) {
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
    saveNotify({message: this.$t('notify-load-from-disk'), iconUrl: 'assets/img/info-circle.svg', class: 'save-notify__load'})
  } 
  else {
    saveNotify({message: this.$t('notify-load-from-disk-error'), iconUrl: 'assets/img/exclamation-triangle.svg', class: 'save-notify__delete'})
  }
}

export async function loadFromDisk(event, savesList){
  const files = event.target.files
  for (let file of files) {
    _readFile(file)
      .then(saveFile => _loadSaves(saveFile, savesList) )
      .then(() => this.updateSaveList() )
      .catch(error => this.$root.errNotify(error.toString()) )   
  }
}

export function chooseFiles() {
  document.getElementById("saveUpload").click()
}