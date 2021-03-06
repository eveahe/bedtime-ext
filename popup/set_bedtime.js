const hidePage = `body > {
  position: fixed;
}`;
/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  document.addEventListener("click", (e) => {

    function onError(error) {
      console.log(error)
    }

    /**
     * REMOVE THE PAGE HIDING CSS SOMEHOW!!
     * Setting the bedtime to the id, instead of to the textContent, so the text content doesn't have to be numeric.
     * We are then sending this id as a message to the content script. 
     */
    function setBedTime(tabs) {
      browser.tabs.insertCSS({
        code: hidePage
      }).then(() => {
        let newBedTime = e.target.id;
        browser.tabs.sendMessage(tabs[0].id, {
          command: "setbedtime",
          newBedTime: newBedTime
        });
      });
    }

    /**
     * Just log the error to the console.
     */
    function reportError(error) {
      console.error(`Something's gone wrong! ${error}`);
    }

    /**
     * Get the active tab,
     */
    if (e.target.classList.contains("btn-bedtime")) {
      browser.tabs.query({
          active: true,
          currentWindow: true
        })
        .then(setBedTime)
        .catch(reportError);
    }
  });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute bedtime! ${error.message}`);
}

// /**
// * When the popup loads, inject a content script into the active tab,
// * and add a click handler.
// * If we couldn't inject the script, handle the error.
// */

browser.tabs.executeScript({
    file: "../content_script.js"
  })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);