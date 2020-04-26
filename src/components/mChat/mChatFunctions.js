import store from '../../stores/store'

// Для suggestion ONLY нужно указать type: suggestion и data: undefined
export function sendMessage(ChatID, author, type, data, suggestions) { 
  store.state.mChat.newMessagesCount = store.state.mChat.show ? store.state.mChat.newMessagesCount : store.state.mChat.newMessagesCount + 1

  let uniqid = require('uniqid');
  // setTimeout можно заменить на sleep(ms)
  if (store.state.mChat.typingIndicatorEnable && type !== 'suggestion' && store.state.mChat.contactsPageShow === false){
    onMessageWasSent(ChatID, {id: uniqid(), author: author, type: 'typing', data: undefined, suggestions: undefined});
    (type === 'text' && data.text.length <= '8') 
    ? setTimeout(() => onMessageWasSent(ChatID, {id: uniqid(), author: author, type: type, data: data, suggestions: suggestions}), 500) 
    : (type === 'text' && data.text.length <= '20') 
    ? setTimeout(() => onMessageWasSent(ChatID, {id: uniqid(), author: author, type: type, data: data, suggestions: suggestions}), 1000)
    : setTimeout(() => onMessageWasSent(ChatID, {id: uniqid(), author: author, type: type, data: data, suggestions: suggestions}), 3000)
  }
  else onMessageWasSent(ChatID, {id: uniqid(), author: author, type: type, data: data, suggestions: suggestions})
}

export function onMessageWasSent(ChatID, message){ // Импорт для userInput (Suggestions)
  // messageList = [...messageList, message]
  var users = store.state.mChatData; // Не копируем массив, чтобы изменять оригинал
  for (let user of users) { // Перебираем для каждого пользователя
    if (user.mChatData_ChatID === ChatID) {
      user.mChatData_unReadMsgCount += 1
      // Удаляем сообщение typing, если используется имитация набора
      if (user.mChatData_MsgHistory[user.mChatData_MsgHistory.length - 1].type === 'typing') user.mChatData_MsgHistory.splice([user.mChatData_MsgHistory.length - 1], 1)
      user.mChatData_MsgHistory = [...user.mChatData_MsgHistory, message]
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