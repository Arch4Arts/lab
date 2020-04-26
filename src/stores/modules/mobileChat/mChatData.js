const mChatData = {
    namespaced: false,
    state: [ // Всё существующие контакты в игре (некоторые из них помещаются в mChat_CurrentContacts_MC)
          {
            mChatData_ContactName: 'Arch', // Отображаемое имя
            mChatData_ContactID: 'mc', // ID для messageHistory
            mChatData_ChatID: 'mc', // Уникальный ID чата, где контакт1 переписывается с контакт2, т.е mc_sister обозначает, что ГГ переписывается с сестрой, а если sister_mc, то сестра с ГГ
            mChatData_AvatarImg: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4', // Аватар
            mChatData_unReadMsgCount: 0,
            mChatData_MsgHistory: [
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
            mChatData_ContactName: 'Support',
            mChatData_ContactID: 'support',
            mChatData_ChatID: 'mc_support',
            mChatData_AvatarImg: require('../../../media/img/avatar.jpg'),
            mChatData_unReadMsgCount: 0,
            mChatData_MsgHistory: [
              { uid: '1k971ar09', type: 'text', author: `support`, data: { text: `You a slut?` } },
              { uid: '1k971bswh', type: 'system', data: { text: 'User changed security key', meta: '04-08-2018 15:57' } },
              { uid: '1k971bzux', type: 'emoji', author: `me`, data: { src: require('../../../media/img/smiling-face.png') } },
              { uid: '1k971c3iy', type: 'text', author: `me`, data: { text: `Do you read me...`, meta: '✓✓ Read' } },
              { uid: '1k971c7a1', type: 'image', author: `support`, data: { src: require('../../../media/img/2.gif'), meta: '✓✓ Read' } },
              { uid: '1k971cbgd', type: 'image', author: `me`, data: { src: require('../../../media/img/1.jpg'), meta: '✓✓ Read' } },
              { uid: '1k971cfl7', type: 'audio', author: `support`, data: { src: require('../../../media/audio/test.mp3') } },
              { uid: '1k971cj83', type: 'video', author: `support`, data: { src: require('../../../media/video/Carmelita.mp4') } },
              { uid: '1k971cmt1', type: 'text', author: `me`, data: { text: `...or not?`, meta: '✓ Delivered' }, suggestions: ["Looks good!", "It's OK.", "Uhh.. Do I really have to say something?", "This suggestion is way too long for css purpose. Let's make it long... Longer, and more and more.. Never ending."] },
            ]
          },
          {
            mChatData_ContactName: 'Tailor',
            mChatData_ContactID: 'tailor',
            mChatData_ChatID: 'mc_tailor',
            mChatData_AvatarImg: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            mChatData_unReadMsgCount: 0,
            mChatData_MsgHistory: [
              { type: 'text', author: `support`, data: { text: `You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. ` } },
              { type: 'emoji', author: `me`, data: { emoji: `😋` } },
              { type: 'text', author: `tailor`, data: { text: `Do you read me...`, meta: '✓✓ Read' } },
              { type: 'image', author: `mattmezza`, data: { src: require('../../../media/img/2.gif'), meta: '✓✓ Read' } },
              { type: 'image', author: `me`, data: { src: require('../../../media/img/1.jpg'), meta: '✓✓ Read' } },
              { type: 'text', author: `me`, data: { text: `...or not?`, meta: '✓ Delivered' } },
            ]
          },
          // {
          //   mChatData_ContactID: 'tailor',
          //   mChatData_ChatID: 'tailor_mc',
          //   mChatData_ContactName: 'Tailor2',
          //   mChatData_AvatarImg: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          //   mChatData_unReadMsgCount: 0,
          //   mChatData_MsgHistory: [
          //     { type: 'text', author: `tailor`, data: { text: `You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. ` } },
          //     { type: 'emoji', author: `me`, data: { emoji: `😋` } },
          //     { type: 'text', author: `tailor`, data: { text: `Do you read me...`, meta: '✓✓ Read' } },
          //     { type: 'image', author: `tailor`, data: { src: require('../../../media/img/2.gif'), meta: '✓✓ Read' } },
          //     { type: 'image', author: `me`, data: { src: require('../../../media/img/1.jpg'), meta: '✓✓ Read' } },
          //     { type: 'text', author: `me`, data: { text: `...or not?`, meta: '✓ Delivered' } },
          //   ]
          // },
          {
            mChatData_ContactName: 'Sophy',
            mChatData_ContactID: 'sophy',
            mChatData_ChatID: 'mc_sophy',
            mChatData_AvatarImg: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            mChatData_unReadMsgCount: 0,
            mChatData_MsgHistory: [
              { type: 'video', author: `support`, data: { src: require('../../../media/video/Carmelita.mp4'), img: '' , text: `Soo perveted!`, meta: '✓ Hentai' } },
            ]
          },
    ],
    mutations: {

     },
  }

export default mChatData