const PptxGenJS = require("pptxgenjs");

let pptx = new PptxGenJS();

// global variables
let nextSaturday = getNextSaturday();
const colors = ["548135","2E75B6","C55A11"];
let colorsChoice = colors[0];
let songTitle = "How Great Thou Art";
let songAuthor = "Carl Rob";
let songNumber = 1; // Note: songNumber and kri_number are NOT the same!! can only be 1,2, or 3
let verseNumber = 1;
let songLyrics = `O Lord my God, when I in awesome wonder\nConsider all the worlds Thy hands have made\nI see the stars, I hear the rolling thunder,\nThy power throughout the universe displayed.`;



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
      }},
      {placeholder: {
         options: {name: "verse_number", type:"body", x: 0, y: 4.7, w: 10, h: 1, align: "center", fontSize: 28, color: colorsChoice, autofit:true, FontFace:"Arial"},
         text: "Verse Number Here"
      }},
   ]
})

pptx.defineSlideMaster({
   title: "OFFERING_SONG_SLIDE_LAYOUT",
   background: {path: "assets/offering_slide.jpeg"},
   objects: [
      {placeholder: {
         options: {name: "song_title", type:"body", x: 0, y: 0.25, w: 10, h: 1, align: "center", fontSize: 40, color: colorsChoice, autofit:true, FontFace:"Arial"},
         text: "Song Title Here"
      }},
      {placeholder: {
         options: {name: "song_author", type:"body", x: 4, y: 1, w: 6, h: 0.5, fontSize: 16, color: "A9A9A9", autofit:true, FontFace:"Arial"},
         text: "Song Author Here"
      }},
      {placeholder: {
         options: {name: "song_lyrics", type:"body", x: 4, y: 1.5, w: 6, h: 3.5, fontSize: 18, color: "000000", autofit:true, FontFace:"Arial"},
         text: "Song Lyrics Here"
      }},
      {placeholder: {
         options: {name: "verse_number", type:"body", x: 0, y: 4.7, w: 10, h: 1, align: "center", fontSize: 28, color: colorsChoice, autofit:true, FontFace:"Arial"},
         text: "Verse Number Here"
      }},
   ]
});

// Slide initializers

let addDarkSlide = () => {let slide = pptx.addSlide();slide.background = { color: "000000" };};
let addWelcomeSlide = () => {pptx.addSlide({ masterName: "WELCOME_SLIDE_LAYOUT"});};

let addSongTitleSlide = () => {
   let slide = pptx.addSlide({ masterName: "SONG_SLIDE_TITLE_LAYOUT"});
   slide.addText(songNumber, {placeholder: "song_number"});
   slide.addText(songTitle, {placeholder: "song_title"});
   slide.addText(songAuthor, {placeholder: "song_author"});
};

let addSongSlide = () => {
   let slide = pptx.addSlide({ masterName: "SONG_SLIDE_LAYOUT"});
   slide.addText(songTitle, {placeholder: "song_title"});
   slide.addText(songAuthor, {placeholder: "song_author"});
   slide.addText(songLyrics, {placeholder: "song_lyrics"});
   slide.addText(verseNumber, {placeholder:"verse_number"});
};

let offeringSongSlide = () => {
   let slide = pptx.addSlide({ masterName: "OFFERING_SONG_SLIDE_LAYOUT"});
   slide.addText(songTitle, {placeholder: "song_title"})
   slide.addText(songAuthor,{placeholder: "song_author"});
   slide.addText(songLyrics, {placeholder: "song_lyrics"});
   slide.addText(verseNumber, {placeholder:"verse_number"});
};

let announcementsSlide = () => {
   let slide = pptx.addSlide();
   slide.background = { color: "333333" }; 
   slide.addText("Announcements", {x: 0, y: 2.3125, w: 10, h: 1, FontFace:"Lato", align:"center", color: "FBE4D4", fontSize: 40});
};

let birthdaySlide = () => {
   let slide = pptx.addSlide();
   slide.background = { color: "927A9D" };
   slide.addText("Birthday Song", {x: 0, y: 0.1, w: 10, h: 1, align: "center", fontSize: 40, color: "4C1E54", transparency: 20, autofit: true, FontFace:"Lato"});
   slide.addText(`Selamat ulang tahun,\nKami ucapkan padamu.\nSelamat hari jadi,\nTuhan Yesus memberkati.\n\nKami s'lalu berdoa\nAgar kau tetap setia\nPada Yesus Kristus, Tuhan dan Raja kita, oh.\nKami mengucap syukur\nTuhan t'lah pimpin langkahmu\nPadamu [insert name], selamat ulang tahun!`, {x:0, y: 0.8, w: 10, h: 4.625, align: "center", fontSize: 22, color: "000000"});
};

let lastSlide = () => {
   let slide = pptx.addSlide();
   slide.addText("See you next week!", {x: 1, y: 2.3125, w: 6, h: 1, FontFace:"Lato", color: "000000", fontSize: 50});
   slide.addImage({ path: "assets/waving_hand.png", x: 7, y: 1.9375, w: 1.75, h: 1.75});
   slide.addText("Reformed Evangelical Church Singapore", {x: 0, y:4.75, w:10, h:1, fontSize: 18, color: "6B7A90", align: "center"});
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
   // addSongSlide();
   // offeringSongSlide();
   // announcementsSlide();
   // birthdaySlide();
   lastSlide();
   
}

generateSlides();
// save function (for debug purposes, for now saves locally)
pptx.writeFile({ fileName: "presentation.pptx"}).then(fileName => {console.log(`created file: ${fileName}`)});