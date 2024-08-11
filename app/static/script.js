"use strict";
const button = Array.from(document.getElementsByClassName("btn"))
console.log(button);
button.forEach(btn => {
    btn.addEventListener("click", function(){
    button.forEach(element => {
        element.classList.remove("clicked");
    });
    this.classList.add("clicked")
});
});

console.log("hhi")