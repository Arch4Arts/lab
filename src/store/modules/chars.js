import store from './../store'

const chars = {
  namespaced: false,
  state: {
    mcName: 'Artur', // Для английского варианта
    mcIm:   'Артур',
    mcRod:  'Артура',
    mcDat:  'Артуру',
    mcVin:  'Артура',
    mcTvor: 'Артуром',
    mcPred: 'Артуре',
    mcColor: '#00D3FFFF', // Цвет диалогов

    sisterName: 'Adelina',
    sisterIm:   'Аделина',
    sisterRod:  'Аделина',
    sisterDat:  'Аделине',
    sisterVin:  'Аделину',
    sisterTvor: 'Аделиной',
    sisterPred: 'Аделине',
    sisterColor: '#FF00FFFF',

    girlfriendName: '',
    girlfriendColor: 'hsl(100, 100%, 50%)',

    roommateName: '',
    roommateColor: 'hsl(100, 100%, 50%)',
  },
  mutations:{
    // Сохранение имен при настройке
    saveColorChars(){
      this.state.mcColor = this.state.mcColor;
      this.state.sisterColor = this.state.sisterColor;
    },
    saveCharsName(state, lang){
      if ( lang == 'ru' ) { // если ru, сохраняем имена с учетом склонения
        this.state.mcIm = this.state.mcIm;
        this.state.mcRod = this.state.mcRod;
        this.state.mcDat = this.state.mcDat;
        this.state.mcVin = this.state.mcVin;
        this.state.mcTvor = this.state.mcTvor;
        this.state.mcPred = this.state.mcPred;

        this.state.sisterIm = this.state.sisterIm;
        this.state.sisterRod = this.state.sisterRod;
        this.state.sisterDat = this.state.sisterDat;
        this.state.sisterVin = this.state.sisterVin;
        this.state.sisterTvor = this.state.sisterTvor;
        this.state.sisterPred = this.state.sisterPred;

        // Обновление имен для чата
        // store.state.mChatData.MC.characterProfiles[1].name = state.mcIm
      } else { // простые английские имена
        this.state.mcName = this.state.mcName;
        this.state.sisterName = this.state.sisterName;

        // Обновление имен для чата
        // store.state.mChatData.MC.characterProfiles[1].name = state.mcName
      }
    },
  },
}

export default chars