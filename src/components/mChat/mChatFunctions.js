import store from '../../store/store'
import eventBus from '../../js/eventBus'

let numberPendingMessages = 0;
let typingMessageCopy = null;

// Для suggestion ONLY нужно указать type: suggestion и data: null
export function sendMessage(ChatID, author, type, data) { 
  const uniqid = require('uniqid');
  // Если иммитация включан, не suggestion, список чатов не отображается, чат отображается
  if (store.state.mChat.typingIndicatorEnable && 
      type !== 'suggestion' && 
      type !== 'system' && 
      store.state.mChat.showChatList === false && 
      store.state.mChat.show === true) 
  {
    numberPendingMessages++;
    onMessageWasSent(ChatID, {uid: uniqid(), author: author, type: 'typing'});
    typingMessageCopy = {uid: uniqid(), author: author, type: 'typing'};
    if (type === 'text' && data.text.length <= 8) {
      setTimeout(() => { 
        numberPendingMessages--;
        onMessageWasSent(ChatID, {meta: { chatid: ChatID }, uid: uniqid(), author: author, type: type, data: data})
      }, 600); // Длинное сообщение
    } 
    else if (type === 'text' && data.text.length <= 20) {
      setTimeout(() => { 
        numberPendingMessages--;
        onMessageWasSent(ChatID, {meta: { chatid: ChatID }, uid: uniqid(), author: author, type: type, data: data})
      }, 1200); // Сообщение средней длинны
    }
    else
      setTimeout(() => { 
        numberPendingMessages--;
        onMessageWasSent(ChatID, {meta: { chatid: ChatID }, uid: uniqid(), author: author, type: type, data: data})
      }, 3000); // Длинное сообщение
  }
  else onMessageWasSent(ChatID, {meta: { chatid: ChatID }, uid: uniqid(), author: author, type: type, data: data})
}

export function onMessageWasSent(ChatID, message) { // Импорт для userInput (Suggestions)
  let chatList = store.state.mChatList.MC; // Не копируем массив, чтобы изменять оригинал
  for (const chat of chatList) { // Перебираем для каждого пользователя
    if (chat.chatID === ChatID) {
      chat.unreadMessageCount++
      // Удаляем сообщение typing, если используется имитация набора
      if (chat.chatHistory[chat.chatHistory.length - 1].type === 'typing') {
        chat.chatHistory.pop()
      }
      // Удаляем предложенные варианты ответов, если таковые есть
      if (chat.chatHistory[chat.chatHistory.length - 1].type === 'suggestion') 
        chat.chatHistory.pop()
      
      // Добавляем сообщение
      chat.chatHistory.push(message)

      // Добавляем имитацию набора если все еще присуствуют сообщения в очереди (setTimeout stack)
      if (numberPendingMessages >= 1 && chat.chatHistory[chat.chatHistory.length - 1].type !== 'typing')
        chat.chatHistory.push(typingMessageCopy);

      store.commit('updateStore');
      eventBus.emit('mChatMessageWasSent');
      eventBus.emit('mChatMessageWasSent_Notify', message);
    }
  }
}

export function addContactToChatList(newContact) {
  // let doubleDetect = false;
  // let contacts = store.state.mChatData.MC.сurrentChatList
  // for (const contact of contacts) {
  //   if (contact === newContact) doubleDetect = true;
  // }
  // if (doubleDetect === false) {
  //   store.state.mChatData.MC.сurrentChatList.push(newContact);
  //   store.commit('updateStore');
  // }
}