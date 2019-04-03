//Start of my super cool browser extension code.
(function () {
    const d = new Date();
    const n = d.getHours();
    let defaultBT = 16;
    let storedBT;
    let messagedBT;
    let checkedBT;


    function onGot(item) {
        storedBT = item.testbedtime;
        console.log(storedBT + " from the onGot")
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let gettingItem = browser.storage.local.get();
    gettingItem.then(onGot, onError)
        .then(chooseBedtime);


    function checkBedTime(messagedBT) {
        // We run the first part if the current time is past one's bed time
        // chooseBedTime()
        if (n >= messagedBT || n <= 6) {
            const sleepDiv = document.createElement("div");
            sleepDiv.textContent = "It is " + n + " o'clock. Go to Sleep!!!!";
            sleepDiv.className = 'sleepMessage';
            sleepDiv.setAttribute("id", "goToSleep");

            //I'm confused as to how the below is working...
            if (!document.getElementById("state-mode")) {
                document.body.appendChild(sleepDiv);
            } else {
                sleepDiv.setAttribute("style", "display:null")
            }
        } else {
            //Below we are hiding the sleepMessage div's if it is later than the bedtime.
            //Need to change this to instead show the above if it's created and stop creating duplicate divs, it seems messy.
            var sm = document.body.getElementsByClassName("sleepMessage")
            for (i = 0; i < sm.length; i++) {
                sm[i].setAttribute("style", "display:none")
            }
        }
        console.log("the bedtime checked here is " + messagedBT)
    }

    function chooseBedtime() {
        if (storedBT === undefined) {
            //if it's undefined, use default.
            console.log("the storedBT is" + storedBT)
            checkBedTime(defaultBT)
            // console.log("the checked BT is " + checkedBT)
        } else {
            checkBedTime(storedBT)
        }
    }

    function updateBedTime(newBedTime) {
        messagedBT = parseInt(newBedTime, 10);
        browser.storage.local.set({
            "testbedtime": messagedBT
        });
        checkBedTime(messagedBT)

    }


    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "setbedtime") {
            updateBedTime(message.newBedTime);
            /*The problem with the below is that the content script can't access local storage
            from the popup.*/
            // alert(message.newBedTime + " o'clock bedtime received!")
        }
    });
})();