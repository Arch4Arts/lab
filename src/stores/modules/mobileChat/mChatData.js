import store from '../../store'

const mChatData = {
  namespaced: false,
  state: {
    MC: {
      сurrentChatList: ['mc_erza','mc_erza&libido'], // Текущие чаты в телефоне
      currentSelectedTheme: 'Minimalistic', // Текущая тема оформления
      // Используются для отображения только в чате
      // charName изменяется в модуле chars.js
      // AliasName - в случаях когда нужно именовать чат и персонажа в нём, не по имено, но по псевдониму
      charProfiles: [
        {
          name: 'Libido', // Имя
          charID: 'libido', // ID для сравнения с полем author
          isAlias: false, // Если true, отображается псевдоним вместо имени
          aliasName: 'Creator', // Псевдоним
          avatar: require('../../../media/img/Characters/libido.png'),
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
      chatList: [
        {
          chatID: 'mc_erza',
          isGroupChat: false,
          groupChatName: '', // Используется только если isGroupChat
          groupChatAvatar: '',
          unreadMessageCount: 0,
          messagesHistory: [
            { uid: '1k971ar09', type: 'text', author: `erza`, data: { text: `You a **slut**?` } },
            { uid: '1k971bswh', type: 'system', data: { text: 'User changed security key', meta: '04-08-2018 15:57' } },
            { uid: '1k971bzux', type: 'emoji', author: `me`, data: { src: require('../../../media/img/smiling-face.png') } },
            { uid: '1k971c3iy', type: 'text', author: `me`, data: { text: `Do you read me...`, meta: '✓✓ Read' } },
            { uid: '1k971c7a1', type: 'image', author: `erza`, data: { src: require('../../../media/img/2.gif'), meta: '✓✓ Read' } },
            { uid: '1k971cbgd', type: 'image', author: `me`, data: { src: require('../../../media/img/1.jpg'), meta: '✓✓ Read' } },
            { uid: '1k971cfl7', type: 'audio', author: `erza`, data: { src: require('../../../media/audio/test.mp3') } },
            { uid: '1k971cj83', type: 'video', author: `erza`, data: { src: require('../../../media/video/Carmelita.mp4') } },
            { uid: '1k971cmt1', type: 'text', author: `me`, data: { text: `...or **not**?`, meta: '✓ Delivered' }},
            { uid: '1k971cmt1', type: 'suggestion', author: `me`, data: { suggestions: ["Looks good!", "It's OK.", "Uhh.. Do I really have to say something?", "This suggestion is way too long for css purpose. Let's make it long... Longer, and more and more.. Never ending."] } },
          ]
        },
        {
          chatID: 'mc_erza&libido',
          isGroupChat: true,
          groupChatName: 'Тайные желания', // Используется только если isGroupChat
          groupChatAvatar: require('../../../media/img/testGroupChatAvatar.png'),
          unreadMessageCount: 3,
          messagesHistory: [
            { uid: '1k971ar09', type: 'text', author: `erza`, data: { text: `Всё таки ты такая **_шлюшка_**` } },
            { uid: '1k971bswh', type: 'text', author: `libido`, data: { text: 'Ну по крайней мере он честен с собой, и мне нравится видеть как его член дрожит в этой _маленькой_ клетке' } },
            { uid: '1k971ar02', type: 'text', author: `erza`, data: { text: `Еще как, он ведь стал меньше за всё это время не так ли?` } },
          ]
        },  
      ]
    }
  },
}

export default mChatData