//Start of my super cool browser extension code.
const d = new Date();
const n = d.getHours();
let bt = 20



if(n > bt || n < 6){
    const sleepDiv = document.createElement("div");
    sleepDiv.textContent = "It is " + n + " o'clock. Go to Sleep!!!!";
    document.body.appendChild(sleepDiv);
    sleepDiv.className = 'sleepMessage'
}