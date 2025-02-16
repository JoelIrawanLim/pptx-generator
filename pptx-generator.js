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
        {text: { text: "testing",  options: {x: 1, y: 3, w: 9, h: 1, fontSize: 12, color: "000000" , autofit: true}}}
    ],
});

pptx.defineSlideMaster({
   title: "WELCOME_SLIDE_LAYOUT",
   background: {path: "assets/welcome_slide.jpeg"},
   objects: [
      {text: { text: nextSaturday, options: {x: 0.5, y: 1.6, w: 10, h:1, fontSize: 18, autofit: true, color: "F5F6F7", FontFace:"Lato"}}},
      {text: { text:"Welcome to Remaja", options: {x: 0.5, y: 1.25, w:10, h: 3, fontSize: 60, color: "FFFFFF", FontFace:"Lato", bold:true}}},
      // {text: {text:"Reformed Evangelical Church Singapore", options:{x: 0, y: 1, w:10, h:4.3, fontSize: 18, color: "6F7D91", align: "center"}}}
   ],
});


// Slide initializers
let addDarkSlide = () => {let slide = pptx.addSlide();slide.background = { color: "000000" };};
let addWelcomeSlide = () => {pptx.addSlide({ masterName: "WELCOME_SLIDE_LAYOUT"})};
let addSongSlide = () => {pptx.addSlide({ masterName: "SONG_SLIDE_LAYOUT"});};

// Helper Functions
function getNextSaturday() {
    let today = new Date();
    let nextSaturday = new Date();
    nextSaturday.setDate(today.getDate() + (6 - today.getDay() + 7) % 7);
    nextSaturday = nextSaturday.toLocaleDateString('en-GB',{ day: 'numeric', month: 'long', year: 'numeric' });
    return nextSaturday;
}





















// Slide Layouts
//addDarkSlide();
addWelcomeSlide();
//addSongSlide();


// save function (for debug purposes, for now saves locally)
pptx.writeFile({ fileName: "presentation.pptx"}).then(fileName => {console.log(`created file: ${fileName}`)});