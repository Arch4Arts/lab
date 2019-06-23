const chatUsers = {
    namespaced: false,
    state: [ // Всё существующие контакты в игре (некоторые из них помещаются в currentContacts)
          {
            id: 'mattmezza', // ID для messageHistory
            name: 'Matteo', // Отображаемое имя
            imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4', // Аватар
            messagesHistory: [
              { type: 'text', author: `support`, data: { text: `You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. ` } },
              { type: 'emoji', author: `me`, data: { emoji: `😋` } },
              { type: 'text', author: `me`, data: { text: `Do you read me...`, meta: '✓✓ Read' } },
              { type: 'image', author: `mattmezza`, data: { src: require('../../Media/img/2.gif'), meta: '✓✓ Read' } },
              { type: 'image', author: `me`, data: { src: require('../../Media/img/1.jpg'), meta: '✓✓ Read' } },
              { type: 'text', author: `me`, data: { text: `...or not?`, meta: '✓ Delivered' } },
              { type: 'video', author: `support`, data: { src: require('../../Media/video/Carmelita.mp4'), img: '' , text: `Soo perveted!`, meta: '✓ Hentai' } },
              { type: 'audio', author: `support`, data: { src: require('../../Media/audio/test.mp3'), type: 'audio/mp3' , text: `Soo perveted!`, meta: '✓ Hentai' } },
              { type: 'system', data: { text: 'User changed security key', meta: '04-08-2018 15:57' } },
              { type: 'text', author: `support`, data: { text: `What about suggestions?` }}
            ]
          },
          {
            id: 'support',
            name: 'Support',
            imageUrl: 'https://data.whicdn.com/images/301185130/large.jpg',
            messagesHistory: [
              { type: 'text', author: `support`, data: { text: `You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. ` } },
              { type: 'emoji', author: `me`, data: { emoji: `😋` } },
              { type: 'text', author: `me`, data: { text: `Do you read me...`, meta: '✓✓ Read' } },
              { type: 'image', author: `mattmezza`, data: { src: require('../../Media/img/2.gif'), meta: '✓✓ Read' } },
              { type: 'image', author: `me`, data: { src: require('../../Media/img/1.jpg'), meta: '✓✓ Read' } },
              { type: 'text', author: `me`, data: { text: `...or not?`, meta: '✓ Delivered' } },
              { type: 'video', author: `support`, data: { src: require('../../Media/video/Carmelita.mp4'), img: '' , text: `Soo perveted!`, meta: '✓ Hentai' } },
              { type: 'audio', author: `support`, data: { src: require('../../Media/audio/test.mp3'), type: 'audio/mp3' , text: `Soo perveted!`, meta: '✓ Hentai' } },
              { type: 'system', data: { text: 'User changed security key', meta: '04-08-2018 15:57' } },
              { type: 'text', author: `support`, data: { text: `What about suggestions?` }}
            ]
          },
          {
            id: 'tailor',
            name: 'Tailor',
            imageUrl: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            messagesHistory: [
              { type: 'text', author: `support`, data: { text: `You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. ` } },
              { type: 'emoji', author: `me`, data: { emoji: `😋` } },
              { type: 'text', author: `me`, data: { text: `Do you read me...`, meta: '✓✓ Read' } },
              { type: 'image', author: `mattmezza`, data: { src: require('../../Media/img/2.gif'), meta: '✓✓ Read' } },
              { type: 'image', author: `me`, data: { src: require('../../Media/img/1.jpg'), meta: '✓✓ Read' } },
              { type: 'text', author: `me`, data: { text: `...or not?`, meta: '✓ Delivered' } },
              { type: 'video', author: `support`, data: { src: require('../../Media/video/Carmelita.mp4'), img: '' , text: `Soo perveted!`, meta: '✓ Hentai' } },
              { type: 'audio', author: `support`, data: { src: require('../../Media/audio/test.mp3'), type: 'audio/mp3' , text: `Soo perveted!`, meta: '✓ Hentai' } },
              { type: 'system', data: { text: 'User changed security key', meta: '04-08-2018 15:57' } },
              { type: 'text', author: `support`, data: { text: `What about suggestions? Lalala` }}
            ]
          },
          {
            id: 'sophy',
            name: 'Sophy',
            imageUrl: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            messagesHistory: [
              { type: 'text', author: `support`, data: { text: `You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. ` } },
              { type: 'emoji', author: `me`, data: { emoji: `😋` } },
              { type: 'text', author: `me`, data: { text: `Do you read me...`, meta: '✓✓ Read' } },
              { type: 'image', author: `mattmezza`, data: { src: require('../../Media/img/2.gif'), meta: '✓✓ Read' } },
              { type: 'image', author: `me`, data: { src: require('../../Media/img/1.jpg'), meta: '✓✓ Read' } },
              { type: 'text', author: `me`, data: { text: `...or not?`, meta: '✓ Delivered' } },
              { type: 'video', author: `support`, data: { src: require('../../Media/video/Carmelita.mp4'), img: '' , text: `Soo perveted!`, meta: '✓ Hentai' } },
              { type: 'audio', author: `support`, data: { src: require('../../Media/audio/test.mp3'), type: 'audio/mp3' , text: `Soo perveted!`, meta: '✓ Hentai' } },
              { type: 'system', data: { text: 'User changed security key', meta: '04-08-2018 15:57' } },
              { type: 'text', author: `support`, data: { text: `What about suggestions?` }}
            ]
          },
    ],
    mutations: {

     },
  }

export default chatUsers