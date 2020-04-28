import store from '../../stores/store'
import eventBus from '../../js/initEventBus'

// Для suggestion ONLY нужно указать type: suggestion и data: undefined
export function sendMessage(ChatID, author, type, data) { 
  store.state.mChat.newMessagesCount = store.state.mChat.show ? store.state.mChat.newMessagesCount : store.state.mChat.newMessagesCount + 1

  let uniqid = require('uniqid');
  // setTimeout можно заменить на sleep(ms)
  if (store.state.mChat.typingIndicatorEnable && type !== 'suggestion' && store.state.mChat.contactsPageShow === false){
    onMessageWasSent(ChatID, {uid: uniqid(), author: author, type: 'typing', data: undefined});
    (type === 'text' && data.text.length <= '8') 
    ? setTimeout(() => onMessageWasSent(ChatID, {uid: uniqid(), author: author, type: type, data: data}), 500) 
    : (type === 'text' && data.text.length <= '20') 
    ? setTimeout(() => onMessageWasSent(ChatID, {uid: uniqid(), author: author, type: type, data: data}), 1000)
    : setTimeout(() => onMessageWasSent(ChatID, {uid: uniqid(), author: author, type: type, data: data}), 3000)
  }
  else onMessageWasSent(ChatID, {uid: uniqid(), author: author, type: type, data: data})
}

export function onMessageWasSent(ChatID, message){ // Импорт для userInput (Suggestions)
  // messageList = [...messageList, message]
  var users = store.state.mChatData.MC; // Не копируем массив, чтобы изменять оригинал
  for (let user of users) { // Перебираем для каждого пользователя
    if (user.chatID === ChatID) {
      user.unreadMessageCount += 1
      // Удаляем сообщение typing, если используется имитация набора
      if (user.messagesHistory[user.messagesHistory.length - 1].type === 'typing') user.messagesHistory.splice([user.messagesHistory.length - 1], 1)
      user.messagesHistory = [...user.messagesHistory, message]

      eventBus.$emit('mChatMessageWasSent');
      store.commit('updateStores');
    }
  }
}

export function addContactToChatList(newContact){
  let doubleDetect = false;
  let contacts = store.state.mChat.сurrentСontactList_MC
  for (let contact of contacts) {
    if (contact === newContact) doubleDetect = true;
  }
  if (doubleDetect === false) {
    store.state.mChat.сurrentСontactList_MC.push(newContact);
    store.commit('updateStores');
  }
}