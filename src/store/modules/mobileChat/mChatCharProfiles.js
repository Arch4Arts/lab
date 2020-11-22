const mChatCharProfiles = {
  namespaced: false,
  state: [
      // Используются для отображения только в чате
      // name изменяется в модуле chars.js
      // AliasName - в случаях когда нужно именовать чат и персонажа в нём, не по имено, но по псевдониму
        {
          name: 'Arch', // Имя
          charID: 'arch', // ID для сравнения с полем author
          isAlias: false, // Если true, отображается псевдоним вместо имени
          aliasName: 'Developer', // Псевдоним
          avatar: require('../../../media/img/Characters/arch.png'),
        },
        {
          name: 'MC',
          charID: 'mc',
          isAlias: false, 
          aliasName: '', 
          avatar: require('../../../media/img/Characters/mc.png'),
        },
        {
          name: 'Erza',
          charID: 'erza',
          isAlias: false, 
          aliasName: 'Red Queen', 
          avatar: require('../../../media/img/Characters/erza.png'),
        }
    ],
}

globalThis.mChatCharProfiles = mChatCharProfiles.state

export default mChatCharProfiles