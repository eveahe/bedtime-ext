/**
 * The start of the super cool browser extension. 
 * Note that the whole content script is wrapped in a function. 
 */
(function () {
    const d = new Date();
    const n = d.getHours();
    /**
     * Here we have three bedtime variables. 
     * The first is the default, defaultBT, that comes preloaded with the extension.
     * The second, messagedBT, is the bedtime sent in a message from the popup when a user changes the time there.
     * The third, storedBT, is the bedtime that is then added to local storage from the popup.
     * The storedBT should persist across tabs. 
     */
    let defaultBT = 23;
    let messagedBT;
    let storedBT;

    /**
     * Next two functions OnGot and OnError, as well as the gettingItem variable
     * All deal with getting the bedtime from local storage.
     */
    function onGot(item) {
        storedBT = item.storedbedtime;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let gettingItem = browser.storage.local.get();
    gettingItem.then(onGot, onError)
        .then(chooseBedtime);


    function checkBedTime(messagedBT) {
        /**
         * We now check if the current time is past one's bed time.
         * Note the special case if the time is past midnight and before 6 am.
         * If it is past that time, we create our sleep message.
         * We check to see if the div has already been created, to avoid duplicates.
         * The sleep message is then made visible/hidden depending on the time.
         */
        if (n >= messagedBT || n < 6) {
            const sleepDiv = document.createElement("div");
            sleepDiv.textContent = "It is " + n + " o'clock. Go to Sleep!!!!";
            sleepDiv.className = 'sleepMessage';
            sleepDiv.setAttribute("id", "goToSleep");
            var gts = document.getElementById("goToSleep");
            if (!gts) {
                document.body.appendChild(sleepDiv);
            } else {
                gts.setAttribute("style", "visibility:visible");
            }
        } else {
            /**
             * Below we are hiding the sleepMessage div if it is later than the bedtime.
             */
            document.getElementById("goToSleep").setAttribute("style", "visibility:hidden");
        }
        console.log("the bedtime checked here is " + messagedBT + " and the n used is " + n)
        console.log(n <= 6)
        console.log(n >= messagedBT)
        console.log(messagedBT)
        console.log(n >= messagedBT && n > 20)
    }
    /**
     * Below is the logic defining which of the BTs to use (stored vs default.)
     * If the storedBT is undefined, we use default
     */
    function chooseBedtime() {
        if (storedBT === undefined) {
            console.log("the default BT is" + defaultBT)
            checkBedTime(defaultBT)
        } else {
            checkBedTime(storedBT)
        }
    }

    /**
     * Below we are updaeted the storedBT variable with the BT received from the popup in the message.
     * Note that we have have to parse the BT as an integer so it can be compared to current time.
     */
    function updateBedTime(newBedTime) {
        messagedBT = parseInt(newBedTime, 10);
        browser.storage.local.set({
            "storedbedtime": messagedBT
        });
        checkBedTime(messagedBT)

    }
    /**
     * Below is the listener to listen for messages from the popup script.
     * We then send whatever receive in the message to the updateBedTime function above.
     */
    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "setbedtime") {
            updateBedTime(message.newBedTime);
        }
    });
})();