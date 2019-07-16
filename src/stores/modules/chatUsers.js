const chatUsers = {
    namespaced: false,
    state: [ // Всё существующие контакты в игре (некоторые из них помещаются в currentContacts)
          {
            id: 'mc', // ID для messageHistory
            chatID: 'mc', // mc_sister обозначает, что ГГ переписывается с сестрой, а если sister_mc, то сестра с ГГ
            name: 'Arch', // Отображаемое имя
            imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4', // Аватар
            unreadMSGCount: 0,
            messagesHistory: [
              { type: 'text', author: `mc`, data: { text: `You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. ` } },
              { type: 'emoji', author: `me`, data: { emoji: `😋` } },
              { type: 'text', author: `me`, data: { text: `Do you read me...`, meta: '✓✓ Read' } },
              { type: 'image', author: `mc`, data: { src: require('../../Media/img/2.gif'), meta: '✓✓ Read' } },
              { type: 'image', author: `me`, data: { src: require('../../Media/img/1.jpg'), meta: '✓✓ Read' } },
              { type: 'text', author: `me`, data: { text: `...or not?`, meta: '✓ Delivered' } },
              { type: 'video', author: `support`, data: { src: require('../../Media/video/Carmelita.mp4'), img: '' , text: `Soo perveted!`, meta: '✓ Hentai' } },
              { type: 'audio', author: `support`, data: { src: require('../../Media/audio/test.mp3'), type: 'audio/mp3' , text: `Soo perveted!`, meta: '✓ Hentai' } },
              { type: 'system', data: { text: 'User changed security key', meta: '04-08-2018 15:57' } },
            ]
          },
          {
            id: 'support',
            chatID: 'mc_support',
            name: 'Support',
            imageUrl: 'https://data.whicdn.com/images/301185130/large.jpg',
            unreadMSGCount: 0,
            messagesHistory: [
              { type: 'text', author: `support`, data: { text: `You a slut?` } },
              { type: 'emoji', author: `me`, data: { src: require('../../Media/img/smiling-face.png') } },
              { type: 'text', author: `me`, data: { text: `Do you read me...`, meta: '✓✓ Read' } },
              { type: 'image', author: `support`, data: { src: require('../../Media/img/2.gif'), meta: '✓✓ Read' } },
              { type: 'image', author: `me`, data: { src: require('../../Media/img/1.jpg'), meta: '✓✓ Read' } },
              { type: 'text', author: `me`, data: { text: `...or not?`, meta: '✓ Delivered' }, suggestions: ["Looks good!", "It's OK.", "Uhh.. Do I really have to say something?", "This suggestion is way too long for css purpose. Let's make it long... Longer, and more and more.. Never ending."] },
            ]
          },
          {
            id: 'tailor',
            chatID: 'mc_tailor',
            name: 'Tailor',
            imageUrl: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            unreadMSGCount: 0,
            messagesHistory: [
              { type: 'text', author: `support`, data: { text: `You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. ` } },
              { type: 'emoji', author: `me`, data: { emoji: `😋` } },
              { type: 'text', author: `tailor`, data: { text: `Do you read me...`, meta: '✓✓ Read' } },
              { type: 'image', author: `mattmezza`, data: { src: require('../../Media/img/2.gif'), meta: '✓✓ Read' } },
              { type: 'image', author: `me`, data: { src: require('../../Media/img/1.jpg'), meta: '✓✓ Read' } },
              { type: 'text', author: `me`, data: { text: `...or not?`, meta: '✓ Delivered' } },
            ]
          },
          {
            id: 'sophy',
            chatID: 'mc_sophy',
            name: 'Sophy',
            imageUrl: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            unreadMSGCount: 0,
            messagesHistory: [
              { type: 'video', author: `support`, data: { src: require('../../Media/video/Carmelita.mp4'), img: '' , text: `Soo perveted!`, meta: '✓ Hentai' } },
            ]
          },
    ],
    mutations: {

     },
  }

export default chatUsers