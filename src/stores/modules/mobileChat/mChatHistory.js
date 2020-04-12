const mChatHistory = {
    namespaced: false,
    state: [ // Всё существующие контакты в игре (некоторые из них помещаются в mChat_CurrentContacts_MC)
          {
            mChatHistory_ContactName: 'Arch', // Отображаемое имя
            mChatHistory_ContactID: 'mc', // ID для messageHistory
            mChatHistory_ChatID: 'mc', // Уникальный ID чата, где контакт1 переписывается с контакт2, т.е mc_sister обозначает, что ГГ переписывается с сестрой, а если sister_mc, то сестра с ГГ
            mChatHistory_AvatarImg: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4', // Аватар
            mChatHistory_unReadMsgCount: 0,
            mChatHistory_MsgHistory: [
              { type: 'text', author: `mc`, data: { text: `You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. ` } },
              { type: 'emoji', author: `me`, data: { emoji: `😋` } },
              { type: 'text', author: `me`, data: { text: `Do you read me...`, meta: '✓✓ Read' } },
              { type: 'image', author: `mc`, data: { src: require('../../../Media/img/2.gif'), meta: '✓✓ Read' } },
              { type: 'image', author: `me`, data: { src: require('../../../Media/img/1.jpg'), meta: '✓✓ Read' } },
              { type: 'text', author: `me`, data: { text: `...or not?`, meta: '✓ Delivered' } },
              { type: 'video', author: `support`, data: { src: require('../../../Media/video/Carmelita.mp4'), img: '' , text: `Soo perveted!`, meta: '✓ Hentai' } },
              { type: 'audio', author: `support`, data: { src: require('../../../Media/audio/test.mp3'), type: 'audio/mp3' , text: `Soo perveted!`, meta: '✓ Hentai' } },
              { type: 'system', data: { text: 'User changed security key', meta: '04-08-2018 15:57' } },
            ]
          },
          {
            mChatHistory_ContactName: 'Support',
            mChatHistory_ContactID: 'support',
            mChatHistory_ChatID: 'mc_support',
            mChatHistory_AvatarImg: require('../../../Media/img/avatar.jpg'),
            mChatHistory_unReadMsgCount: 0,
            mChatHistory_MsgHistory: [
              { type: 'text', author: `support`, data: { text: `You a slut?` } },
              { type: 'system', data: { text: 'User changed security key', meta: '04-08-2018 15:57' } },
              { type: 'emoji', author: `me`, data: { src: require('../../../Media/img/smiling-face.png') } },
              { type: 'text', author: `me`, data: { text: `Do you read me...`, meta: '✓✓ Read' } },
              { type: 'image', author: `support`, data: { src: require('../../../Media/img/2.gif'), meta: '✓✓ Read' } },
              { type: 'image', author: `me`, data: { src: require('../../../Media/img/1.jpg'), meta: '✓✓ Read' } },
              { type: 'audio', author: `support`, data: { src: require('../../../Media/audio/test.mp3') } },
              { type: 'video', author: `support`, data: { src: require('../../../Media/video/Carmelita.mp4') } },
              { type: 'text', author: `me`, data: { text: `...or not?`, meta: '✓ Delivered' }, suggestions: ["Looks good!", "It's OK.", "Uhh.. Do I really have to say something?", "This suggestion is way too long for css purpose. Let's make it long... Longer, and more and more.. Never ending."] },
            ]
          },
          {
            mChatHistory_ContactName: 'Tailor',
            mChatHistory_ContactID: 'tailor',
            mChatHistory_ChatID: 'mc_tailor',
            mChatHistory_AvatarImg: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            mChatHistory_unReadMsgCount: 0,
            mChatHistory_MsgHistory: [
              { type: 'text', author: `support`, data: { text: `You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. ` } },
              { type: 'emoji', author: `me`, data: { emoji: `😋` } },
              { type: 'text', author: `tailor`, data: { text: `Do you read me...`, meta: '✓✓ Read' } },
              { type: 'image', author: `mattmezza`, data: { src: require('../../../Media/img/2.gif'), meta: '✓✓ Read' } },
              { type: 'image', author: `me`, data: { src: require('../../../Media/img/1.jpg'), meta: '✓✓ Read' } },
              { type: 'text', author: `me`, data: { text: `...or not?`, meta: '✓ Delivered' } },
            ]
          },
          // {
          //   mChatHistory_ContactID: 'tailor',
          //   mChatHistory_ChatID: 'tailor_mc',
          //   mChatHistory_ContactName: 'Tailor2',
          //   mChatHistory_AvatarImg: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          //   mChatHistory_unReadMsgCount: 0,
          //   mChatHistory_MsgHistory: [
          //     { type: 'text', author: `tailor`, data: { text: `You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. You've got to have a story. ` } },
          //     { type: 'emoji', author: `me`, data: { emoji: `😋` } },
          //     { type: 'text', author: `tailor`, data: { text: `Do you read me...`, meta: '✓✓ Read' } },
          //     { type: 'image', author: `tailor`, data: { src: require('../../../Media/img/2.gif'), meta: '✓✓ Read' } },
          //     { type: 'image', author: `me`, data: { src: require('../../../Media/img/1.jpg'), meta: '✓✓ Read' } },
          //     { type: 'text', author: `me`, data: { text: `...or not?`, meta: '✓ Delivered' } },
          //   ]
          // },
          {
            mChatHistory_ContactName: 'Sophy',
            mChatHistory_ContactID: 'sophy',
            mChatHistory_ChatID: 'mc_sophy',
            mChatHistory_AvatarImg: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            mChatHistory_unReadMsgCount: 0,
            mChatHistory_MsgHistory: [
              { type: 'video', author: `support`, data: { src: require('../../../Media/video/Carmelita.mp4'), img: '' , text: `Soo perveted!`, meta: '✓ Hentai' } },
            ]
          },
    ],
    mutations: {

     },
  }

export default mChatHistory