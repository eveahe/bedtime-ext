//Start of my super cool browser extension code.
(function () {
    const d = new Date();
    const n = d.getHours();
    let defaultBT = 20

    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;
    console.log("bt is " + defaultBT);

    function checkBedTime() {
        // We run the first part if the current time is past one's bed time
        if (n > defaultBT || n < 6) {
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
            console.log("checked bedtime with " + defaultBT);
        }
    }
    checkBedTime()

    function updateBedTime(newBedTime) {
        defaultBT = parseInt(newBedTime, 10);
        checkBedTime(defaultBT)
        console.log("the updated defaultBT is " + defaultBT)
    }

    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "setbedtime") {
            updateBedTime(message.newBedTime);
            /*The problem with the below is that the content script can't access local storage
            from the popup.*/
            console.log("the stored bedtime is " + localStorage.getItem("bedTime"));
            alert(message.newBedTime + ' bedtime received!');
        } else if (message.command === "reset") {
            alert('reset message received')
        }
    });
})();