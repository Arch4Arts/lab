import store from '../../store/store'
import eventBus from '../../js/eventBus'

let numberPendingMessages = 0;
let typingMessageCopy = undefined;

// Для suggestion ONLY нужно указать type: suggestion и data: undefined
export function sendMessage(ChatID, author, type, data) { 
  const uniqid = require('uniqid');
  // Если иммитация включан, не suggestion, список чатов не отображается, чат отображается
  if (store.state.mChat.typingIndicatorEnable && 
      type !== 'suggestion' && 
      store.state.mChat.chatListShow === false && 
      store.state.mChat.show === true) 
  {
    numberPendingMessages++;
    onMessageWasSent(ChatID, {uid: uniqid(), author: author, type: 'typing'});
    typingMessageCopy = {uid: uniqid(), author: author, type: 'typing'};
    if (type === 'text' && data.text.length <= 8) {
      setTimeout(() => { 
        numberPendingMessages--;
        onMessageWasSent(ChatID, {uid: uniqid(), author: author, type: type, data: data})
      }, 600); // Длинное сообщение
    } 
    else if (type === 'text' && data.text.length <= 20) {
      setTimeout(() => { 
        numberPendingMessages--;
        onMessageWasSent(ChatID, {uid: uniqid(), author: author, type: type, data: data})
      }, 1200); // Сообщение средней длинны
    }
    else
      setTimeout(() => { 
        numberPendingMessages--;
        onMessageWasSent(ChatID, {uid: uniqid(), author: author, type: type, data: data})
      }, 3000); // Длинное сообщение
  }
  else onMessageWasSent(ChatID, {uid: uniqid(), author: author, type: type, data: data})
}

export function onMessageWasSent(ChatID, message){ // Импорт для userInput (Suggestions)
  let users = store.state.mChatData.MC.chatList; // Не копируем массив, чтобы изменять оригинал
  for (let user of users) { // Перебираем для каждого пользователя
    if (user.chatID === ChatID) {
      user.unreadMessageCount++
      // Удаляем сообщение typing, если используется имитация набора
      if (user.messagesHistory[user.messagesHistory.length - 1].type === 'typing') {
        user.messagesHistory.splice([user.messagesHistory.length - 1], 1);
      }
      // Удаляем предложенные варианты ответов, если таковые есть
      if (user.messagesHistory[user.messagesHistory.length - 1].type === 'suggestion') 
        user.messagesHistory.splice([user.messagesHistory.length - 1], 1);
      
      // Добавляем сообщение
      user.messagesHistory = [...user.messagesHistory, message]

      // Добавляем имитацию набора если все еще присуствуют сообщения в очереди (setTimeout stack)
      if (numberPendingMessages >= 1 && user.messagesHistory[user.messagesHistory.length - 1].type !== 'typing')
        user.messagesHistory = [...user.messagesHistory, typingMessageCopy]

      store.commit('updateStore');
      eventBus.emit('mChatMessageWasSent');
      eventBus.emit('mChatMessageWasSent_Notify', message);
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
    store.commit('updateStore');
  }
}