// Put all the javascript code here, that you want to execute after page load.
const d = new Date();
const n = d.getHours();
console.log(n);



const h = document.body.getElementsByClassName('document-title')
// document.getElementByClassName('document-title').textContent = n;
if(n > 21){
    document.body.style.border = "20px solid red";
    // h.style.color = "red";
    // document.body.style.h1 = "red";
    // document.h1.style.color = "red"
    // h.style.cssText = "color: blue; border: 1px solid black"; 
    h[0].innerHTML = "It is " + n + " o'clock. Go to Sleep!!!!";
}