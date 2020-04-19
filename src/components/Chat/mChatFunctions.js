import store from '../../stores/store'

// Для suggestion ONLY нужно указать type: suggestion и data: undefined
export function sendMessage(ChatID, author, type, data, suggestions) { 
  store.state.mChat.mChat_NewMessagesCount = store.state.mChat.mChat_Show ? store.state.mChat.mChat_NewMessagesCount : store.state.mChat.mChat_NewMessagesCount + 1

  let uniqid = require('uniqid');
  // setTimeout можно заменить на sleep(ms)
  if (store.state.mChat.mChat_TypingIndicatorEnable && type !== 'suggestion' && store.state.mChat.mChat_ContactsPageShow === false){
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
  let contacts = store.state.mChat.mChat_CurrentContacts_MC
  for (let contact of contacts) {
    if (contact === newContact) doubleDetect = true;
  }
  if (doubleDetect === false) {
    store.state.mChat.mChat_CurrentContacts_MC.push(newContact);
    store.commit('updateStores');
  }
}