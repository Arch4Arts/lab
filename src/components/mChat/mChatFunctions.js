import store from '../../stores/store'
import eventBus from '../../js/initEventBus'

// Для suggestion ONLY нужно указать type: suggestion и data: undefined
export function sendMessage(ChatID, author, type, data) { 
  let uniqid = require('uniqid');
  // Если иммитация включан, не suggestion, список чатов не отображается, чат отображается
  if (store.state.mChat.typingIndicatorEnable && type !== 'suggestion' && store.state.mChat.chatListShow === false && store.state.mChat.show === true){
    onMessageWasSent(ChatID, {uid: uniqid(), author: author, type: 'typing', data: undefined});
    (type === 'text' && data.text.length <= '8') 
    ? setTimeout(() => onMessageWasSent(ChatID, {uid: uniqid(), author: author, type: type, data: data}), 500)  // Короткое сообщение
    : (type === 'text' && data.text.length <= '20') 
    ? setTimeout(() => onMessageWasSent(ChatID, {uid: uniqid(), author: author, type: type, data: data}), 1000) // Сообщение средней длинны
    : setTimeout(() => onMessageWasSent(ChatID, {uid: uniqid(), author: author, type: type, data: data}), 3000) // Длинное сообщение
  }
  else onMessageWasSent(ChatID, {uid: uniqid(), author: author, type: type, data: data})
}

export function onMessageWasSent(ChatID, message){ // Импорт для userInput (Suggestions)
  // messageList = [...messageList, message]
  var users = store.state.mChatData.MC.chatList; // Не копируем массив, чтобы изменять оригинал
  for (let user of users) { // Перебираем для каждого пользователя
    if (user.chatID === ChatID) {
      user.unreadMessageCount += 1
      // Удаляем сообщение typing, если используется имитация набора
      if (user.messagesHistory[user.messagesHistory.length - 1].type === 'typing') user.messagesHistory.splice([user.messagesHistory.length - 1], 1)
      // Удаляем предложенные варианты ответов, если таковые есть
      if (user.messagesHistory[user.messagesHistory.length - 1].type === 'suggestion') user.messagesHistory.splice([user.messagesHistory.length - 1], 1)
      user.messagesHistory = [...user.messagesHistory, message]

      eventBus.$emit('mChatMessageWasSent');
      store.commit('updateStores');
    }
  }
}

export function addContactToChatList(newContact){
  let doubleDetect = false;
  let contacts = store.state.mChat.сurrentChatList_MC
  for (let contact of contacts) {
    if (contact === newContact) doubleDetect = true;
  }
  if (doubleDetect === false) {
    store.state.mChat.сurrentChatList_MC.push(newContact);
    store.commit('updateStores');
  }
}