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
        mcColor: 'hsl(100, 70%, 50%)', // Цвет диалогов
    
        sisterName: 'Adelina',
        sisterIm:   'Аделина',
        sisterRod:  'Аделина',
        sisterDat:  'Аделине',
        sisterVin:  'Аделину',
        sisterTvor: 'Аделиной',
        sisterPred: 'Аделине',
        sisterColor: 'hsl(200, 100%, 50%)',
    
        girlfriendName: '',
        girlfriendColor: 'hsl(100, 100%, 50%)',
    
        roommateName: '',
        roommateColor: 'hsl(100, 100%, 50%)',
     },
     mutations:{
        // Сохранение имен при настройке
        saveColorsChar(Color){
          this.state.mcColor = this.state.mcColor;
          this.state.sisterColor = this.state.sisterColor;
        },
        saveCharNames(state, lang){
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
            store.state.chatUsers[0].name = state.mcIm
          } else { // простые английские имена
            this.state.mcName = this.state.mcName;
            this.state.sisterName = this.state.sisterName;
    
            // Обновление имен для чата
          }
        },
    },
  }

export default chars