const PptxGenJS = require("pptxgenjs");

let pptx = new PptxGenJS();

// global variables
let nextSaturday = getNextSaturday();

// Define a slide master
pptx.defineSlideMaster({
    title: "SONG_SLIDE_LAYOUT",
    background: {color: "FFFFFF"},
    objects: [
        {text: { text: "Title Text", options: {x: 0 , y: 1, w: 10, h: 2 , fontSize: 24, align: "center", color: "000000", autofit: true}}},
        {text: { text: "testing",  options: {x: 1, y: 3, w: 9, h, 1, fontSize: 12, color: "000000" , autofit: true}}}
    ],
})


// Slide initializers
let addDarkSlide = () => {let slide = pptx.addSlide();slide.background = { color: "000000" };};
let addWelcomeSlide = () => {createWelcomeSlide()};

// Helper Functions
function getNextSaturday() {
    let today = new Date();
    let nextSaturday = new Date();
    nextSaturday.setDate(today.getDate() + (6 - today.getDay() + 7) % 7);
    nextSaturday = nextSaturday.toLocaleDateString('en-GB',{ day: 'numeric', month: 'long', year: 'numeric' });
    return nextSaturday;
}

function createWelcomeSlide() {
    let slide = pptx.addSlide({
       background: { path: "/welcome_slide.jpeg"}
    });
    slide.addText(nextSaturday, {x: 1, y: 2.5, fontSize: 12, color: "FFFFFF"})
    slide.addText("Welcome to Remaja"), {x: 1, y: 2.8, fontSize: 28, color: "FFFFFF"}
    
}





















// Slide Layouts
addDarkSlide();
addWelcomeSlide();
pptx.addSlide({ masterName: "SONG_SLIDE_LAYOUT"});


// save function (for debug purposes, for now saves locally)
pptx.writeFile({ fileName: "presentation.pptx"}).then(fileName => {console.log(`created file: ${fileName}`)});