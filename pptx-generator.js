const PptxGenJS = require("pptxgenjs");

let pptx = new PptxGenJS();

// global variables
let nextSaturday = getNextSaturday();
const colors = ["548135","2E75B6","C55A11"];
// for now
let colorsChoice = colors[0];

// Define layout templates
pptx.defineSlideMaster({
    title: "SONG_SLIDE_TITLE_LAYOUT",
    background: {color: "FFFFFF"},
    objects: [
       {placeholder: {
            options: {name: "song_author", type:"body", x: 0, y:3, w: 10, h: 1, align: "center", fontSize: 18, color: "A9A9A9", autofit:true, FontFace:"Arial"},
            text: "Song Author Here"
         }},
       {placeholder: {
            options: {name: "song_title", type:"body", x: 0, y:2.25, w: 10, h: 1, align: "center", fontSize: 40, color: colorsChoice, autofit:true, FontFace:"Arial"},
            text: "Song Title Here"
         }},
       {placeholder: {
          options: {name: "song_number", type:"body", x: 0, y:0, w: 10, h: 5.625, align: "center", fontSize: 300, color: colorsChoice, FontFace:"Lato", transparency: 80},
          text: "1"
       }}
    ],
});

pptx.defineSlideMaster({
   title: "WELCOME_SLIDE_LAYOUT",
   background: {path: "assets/welcome_slide.jpeg"},
   objects: [
      {text: { text: nextSaturday, options: {x: 0.5, y: 1.6, w: 3, h:1, fontSize: 28, autofit: true, color: "F5F6F7", FontFace:"Lato"}}},
      {text: { text:"Welcome to Remaja", options: {x: 0.5, y: 1.25, w:10, h: 3, fontSize: 60, color: "FFFFFF", FontFace:"Lato", bold:true}}},
      {text: {text:"Reformed Evangelical Church Singapore", options:{x: 0, y: 4.75, w:10, h:1, fontSize: 18, color: "6B7A90", align: "center"}}}
   ],
});

pptx.defineSlideMaster({
   title: "SONG_SLIDE_LAYOUT",
   background: {color: "FFFFFF"},
   objects: [
      {placeholder: {
         options: {name: "song_title", type:"body", x: 0, y: 0.25, w: 10, h: 1, align: "center", fontSize: 40, color: colorsChoice, autofit:true, FontFace:"Arial"},
         text: "Song Title Here"
      }},
      {placeholder: {
         options: {name: "song_author", type:"body", x: 0, y: 1, w: 10, h: 0.5, align: "center", fontSize: 18, color: "A9A9A9", autofit:true, FontFace:"Arial"},
         text: "Song Author Here"
      }},
      {placeholder: {
         options: {name: "song_lyrics", type:"body", x: 0.5, y: 1.5, w: 9.5, h: 3.5, fontSize: 24, color: "000000", autofit:true, FontFace:"Arial"},
         text: "Song Lyrics Here"
   
      {placeholder: {
         options: {name: "song_number", type:"body", x: 0, y: 4.7, w: 10, h: 1, align: "center", fontSize: 28, color: colorsChoice, autofit:true, FontFace:"Arial"},
         text: "Song Number Here"
      }},
   ]
})

// Slide initializers

let addDarkSlide = () => {let slide = pptx.addSlide();slide.background = { color: "000000" };};
let addWelcomeSlide = () => {pptx.addSlide({ masterName: "WELCOME_SLIDE_LAYOUT"});};

let addSongTitleSlide = () => {
   let slide = pptx.addSlide({ masterName: "SONG_SLIDE_TITLE_LAYOUT"});
   slide.addText("1", {placeholder: "song_number"});
   slide.addText("How Great Thou Art", {placeholder: "song_title"});
   slide.addText("Carl Rob", {placeholder: "song_author"});
};

let addSongSlide = () => {
   let slide = pptx.addSlide({ masterName: "SONG_SLIDE_LAYOUT"});
   slide.addText("How Great Thou Art", {placeholder: "song_title"});
   slide.addText("Carl Rob", {placeholder: "song_author"});
   slide.addText(`O Lord my God, when I in awesome wonder\nConsider all the worlds Thy hands have made\nI see the stars, I hear the rolling thunder,\nThy power throughout the universe displayed.`, {placeholder: "song_lyrics"});
   slide.addText("1", {placeholder:"song_number"});
};

// Helper Functions
function getNextSaturday() {
    let today = new Date();
    let nextSaturday = new Date();
    nextSaturday.setDate(today.getDate() + (6 - today.getDay() + 7) % 7);
    nextSaturday = nextSaturday.toLocaleDateString('en-GB',{ day: 'numeric', month: 'long', year: 'numeric' });
    return nextSaturday;
}

// Initialize all slides to be made
function generateSlides() {
   // addDarkSlide();
   // addWelcomeSlide();
   // addSongTitleSlide();
   addSongSlide();
}

generateSlides();
// save function (for debug purposes, for now saves locally)
pptx.writeFile({ fileName: "presentation.pptx"}).then(fileName => {console.log(`created file: ${fileName}`)});