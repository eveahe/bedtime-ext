// Put all the javascript code here, that you want to execute after page load.
const d = new Date();
const n = d.getHours();
console.log(n);



const h = document.body.getElementsByClassName('document-title')
// document.getElementByClassName('document-title').textContent = n;
if(n > 21 || n < 6){
    const sleepDiv = document.createElement("div");
    sleepDiv.textContent = "It is " + n + " o'clock. Go to Sleep!!!!";
    document.body.appendChild(sleepDiv);
    sleepDiv.className = 'sleepMessage'
} 

