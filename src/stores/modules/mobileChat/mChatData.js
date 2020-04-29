const mChatData = {
    namespaced: false,
    state: {
    MC: [
      {
        contactName: 'Arch', // Отображаемое имя
        contactID: 'mc', // Для Message.vue используется для сверки contact с полем author
        chatID: 'mc', // Уникальный ID чата, где контакт1 переписывается с контакт2, т.е mc_sister обозначает, что ГГ переписывается с сестрой, а если sister_mc, то сестра с ГГ
        avatar: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4', // Аватар
        unreadMessageCount: 0,
        messagesHistory: [
          { type: 'text', author: `mc`, data: { text: `You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. ` } },
          { type: 'emoji', author: `me`, data: { emoji: `😋` } },
          { type: 'text', author: `me`, data: { text: `Do you read me...`, meta: '✓✓ Read' } },
          { type: 'image', author: `mc`, data: { src: require('../../../media/img/2.gif'), meta: '✓✓ Read' } },
          { type: 'image', author: `me`, data: { src: require('../../../media/img/1.jpg'), meta: '✓✓ Read' } },
          { type: 'text', author: `me`, data: { text: `...or not?`, meta: '✓ Delivered' } },
          { type: 'video', author: `support`, data: { src: require('../../../media/video/Carmelita.mp4'), img: '' , text: `Soo perveted!`, meta: '✓ Hentai' } },
          { type: 'audio', author: `support`, data: { src: require('../../../media/audio/test.mp3'), type: 'audio/mp3' , text: `Soo perveted!`, meta: '✓ Hentai' } },
          { type: 'system', data: { text: 'User changed security key', meta: '04-08-2018 15:57' } },
        ]
      },
      {
        contactName: 'Support',
        contactID: 'support',
        chatID: 'mc_support',
        avatar: require('../../../media/img/avatar.jpg'),
        unreadMessageCount: 0,
        messagesHistory: [
          { uid: '1k971ar09', type: 'text', author: `support`, data: { text: `You a **slut**?` } },
          { uid: '1k971bswh', type: 'system', data: { text: 'User changed security key', meta: '04-08-2018 15:57' } },
          { uid: '1k971bzux', type: 'emoji', author: `me`, data: { src: require('../../../media/img/smiling-face.png') } },
          { uid: '1k971c3iy', type: 'text', author: `me`, data: { text: `Do you read me...`, meta: '✓✓ Read' } },
          { uid: '1k971c7a1', type: 'image', author: `support`, data: { src: require('../../../media/img/2.gif'), meta: '✓✓ Read' } },
          { uid: '1k971cbgd', type: 'image', author: `me`, data: { src: require('../../../media/img/1.jpg'), meta: '✓✓ Read' } },
          { uid: '1k971cfl7', type: 'audio', author: `support`, data: { src: require('../../../media/audio/test.mp3') } },
          { uid: '1k971cj83', type: 'video', author: `support`, data: { src: require('../../../media/video/Carmelita.mp4') } },
          { uid: '1k971cmt1', type: 'text', author: `me`, data: { text: `...or *not*?`, meta: '✓ Delivered' }},
          { uid: '1k971cmt1', type: 'suggestion', author: `me`, data: { suggestions: ["Looks good!", "It's OK.", "Uhh.. Do I really have to say something?", "This suggestion is way too long for css purpose. Let's make it long... Longer, and more and more.. Never ending."] } },
        ]
      },
      {
        contactName: 'Tailor',
        contactID: 'tailor',
        chatID: 'mc_tailor',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        unreadMessageCount: 0,
        messagesHistory: [
          { uid: '1k971ar09', type: 'text', author: `support`, data: { text: `You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. ` } },
          { uid: '1k9jz8ls7', type: 'emoji', author: `me`, data: { emoji: `😋` } },
          { uid: '1k9jz8t3k', type: 'text', author: `tailor`, data: { text: `Do you read me...`, meta: '✓✓ Read' } },
          { uid: '1k9jz8y3s', type: 'image', author: `mattmezza`, data: { src: require('../../../media/img/2.gif'), meta: '✓✓ Read' } },
          { uid: '1k9jz91ar', type: 'image', author: `me`, data: { src: require('../../../media/img/1.jpg'), meta: '✓✓ Read' } },
        ]
      },
      {
        contactName: 'Sophy',
        contactID: 'sophy',
        chatID: 'mc_sophy',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        unreadMessageCount: 0,
        messagesHistory: [
          { type: 'video', author: `support`, data: { src: require('../../../media/video/Carmelita.mp4'), img: '' , text: `Soo perveted!`, meta: '✓ Hentai' } },
        ]
      },
    ],
    }, 
    mutations: {

     },
  }

export default mChatData