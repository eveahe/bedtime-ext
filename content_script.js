//Start of my super cool browser extension code.
(function(){
const d = new Date();
const n = d.getHours();
let bt = 22

  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
window.hasRun = true;

if(n > bt || n < 6){
    const sleepDiv = document.createElement("div");
    sleepDiv.textContent = "It is " + n + " o'clock. Go to Sleep!!!!";
    document.body.appendChild(sleepDiv);
    sleepDiv.className = 'sleepMessage'
}

function updateBedTime(newBedTime){
     bt = newBedTime
}

browser.runtime.onMessage.addListener((message) => {
    if (message.command === "setbedtime") {
      alert(message.newBedTime + ' bedtime received!')
      updateBedTime(message.newBedTime);
      console.log(message.newBedTime);
    } else if (message.command === "reset") {
      alert('reset message received')
    }
  });
})();