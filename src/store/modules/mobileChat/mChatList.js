const mChatList = {
  namespaced: false,
  state: {
    MC: [
          {
            chatID: 'erza',
            chatName: null,
            chatAvatar: null,
            get chatName() {
              return globalThis.mChatCharProfiles[2].name;
            },
            get chatAvatar() {
              return globalThis.mChatCharProfiles[2].avatar;
            },
            isGroupChat: false,
            isDisabled: false,
            unreadMessageCount: 0,
            chatHistory: [
              { uid: '1k971ar09', type: 'text', author: `erza`, data: { text: `Lorem ipsum dolor 😄 sit **amet**?` } },
              { uid: '1k971bswh', type: 'system', data: { text: 'User changed security key', meta: '04-08-2018 15:57' } },
              { uid: '1k971bzux', type: 'emoji', author: `me`, data: { emoji: '😍' } },
              { uid: '1k971c3iy', type: 'text', author: `me`, data: { text: `Do you read me...`, meta: '✓✓ Read' } },
              { uid: '1k971c7a1', type: 'image', author: `erza`, data: { src: require('../../../media/img/2.gif'), meta: '✓✓ Read' } },
              { uid: '1k971cbgd', type: 'image', author: `me`, data: { src: require('../../../media/img/1.jpg'), meta: '✓✓ Read' } },
              { uid: '1k971cfl7', type: 'audio', author: `erza`, data: { src: require('../../../media/audio/test.mp3') } },
              { uid: '1k971cj83', type: 'video', author: `erza`, data: { src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', poster: require("../../../media/img/video test preview.jpeg") } },
              { uid: '1k971cmt1', type: 'text', author: `me`, data: { text: `...or **not**?`, meta: '✓ Delivered' }},
              { uid: '1k971cmt1', type: 'suggestion', author: `me`, data: { suggestions: ["Looks good!", "It's OK.", "Uhh.. Do I really have to say something?", "This suggestion is way too long for css purpose. Let's make it long... Longer, and more and more.. Never ending."] } },
            ]
          },
          {
            chatID: 'erza&arch',   
            chatName: 'Беседка',      
            chatAvatar: require('../../../media/img/preview - костыльки.jpeg'),      
            isGroupChat: true,
            isDisabled: false,
            unreadMessageCount: 3,
            chatHistory: [
              { uid: '1k971ar09', type: 'text', author: `erza`, data: { text: `Aenean massa. Cum sociis natoque penatibus et magnis dis parturient **_montes_**, nascetur ridiculus mus.` } },
              { uid: '1k971bswh', type: 'text', author: `arch`, data: { text: 'Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque' } },
              { uid: '1k971ar02', type: 'text', author: `erza`, data: { text: `Sed consequat, leo eget bibendum sodales` } },
            ]
          },
    ]
  },
}

export default mChatList