var setbedtime = ""

//This whole thing doesn't work at all and needs to be rewritten for local storage. 

// function onError(error) {
//     console.error(`Error: ${error}`);
//   }
  
//   function sendMessageToTabs(tabs) {
//     for (let tab of tabs) {
//       browser.tabs.sendMessage(
//         tab.id,
//         {greeting: "Hi from background script"}
//       ).then(response => {
//         console.log("Message from the content script:");
//         console.log(response.response);
//       }).catch(onError);
//     }
//   }
  
//   browser.browserAction.onClicked.addListener(() => {
//     browser.tabs.query({
//       currentWindow: true,
//       active: true
//     }).then(sendMessageToTabs).catch(onError);
//   });