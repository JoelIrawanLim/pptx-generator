let pptx = new PptxGenJS();

// global variables
let nextSaturday = getNextSaturday();

// Uses a web API to fetch the data.yml file by its URL.
async function loadSongs(url) {
   try {
      const response = await fetch(url);
      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const fileContent = await response.text();
      const data = jsyaml.load(fileContent);
      console.log("YAML file loaded.")
      return data;
   } catch (error) {
      console.error('Error fetching or parsing the YAML file:', error);
      return null;
   }
};

function searchSongByTitle(searchTitle, songsData) {
  let songs = [];
  for (const key in songsData) {
    if (Object.prototype.hasOwnProperty.call(songsData, key)) {
      const song = songsData[key];
      if (song.title && song.title.toLowerCase() === searchTitle.toLowerCase()) {
        songs.push(song);
      }
    }
  }
  return songs.length > 0 ? songs : null;
}

function searchSongByAuthor(searchTitle, songsData) {
  let songs = [];
   for (const key in songsData) {
      if (Object.prototype.hasOwnProperty.call(songsData, key)) {
         const song = songsData[key];
         for (let i = 0; i < song.author.length; i++) {
            if (song.author[i] && song.author[i].toLowerCase() === searchTitle.toLowerCase()) {
              songs.push(song);
            } 
          }
        }
     }
  return songs.length > 0 ? songs : null;
};

function searchSongByKRI(searchTitle, songsData) {
   let songs = [];
   for (const key in songsData) {
   if (Object.prototype.hasOwnProperty.call(songsData, key)) {
     const song = songsData[key];
     if (parseInt(song.kri_number) && parseInt(song.kri_number) === parseInt(searchTitle)) {
        songs.push(song);
      }
    }
  }
  return songs.length > 0 ? songs: null;
};

function searchByTitle(searchTerm) {
   loadSongs("https://raw.githubusercontent.com/JoelIrawanLim/pptx-generator/refs/heads/main/app/data/data.yml")
      .then(songsData => {
      if (songsData) {
         const foundSong = searchSongByTitle(searchTerm, songsData);
            if (foundSong) {
              console.log(foundSong);
              const number_of_songs = foundSong.length;
              displayOnScreen(foundSong,number_of_songs);
            } else {
            console.log("Song not found.");
            alert("Song not found.");
         }
      }
   });
};

function searchByAuthor(searchTerm) {
   loadSongs("https://raw.githubusercontent.com/JoelIrawanLim/pptx-generator/refs/heads/main/app/data/data.yml")
   .then(songsData => {
      if (songsData) {
         const foundSong = searchSongByAuthor(searchTerm, songsData);
         if (foundSong) {
           console.log(foundSong);
          const number_of_songs = foundSong.length;
          displayOnScreen(foundSong,number_of_songs);
         } else {
            console.log("Song not found.");
            alert("Song not found.");
         }
      }
   })
}

function searchByKRI(searchTerm) {
  loadSongs("https://raw.githubusercontent.com/JoelIrawanLim/pptx-generator/refs/heads/main/app/data/data.yml")
    .then(songsData => {
      if (songsData) {
        const foundSong = searchSongByKRI(searchTerm, songsData);
        if (foundSong) {
          console.log(foundSong);
          const number_of_songs = foundSong.length;
          displayOnScreen(foundSong,number_of_songs);
        } else {
          console.log("Song not found.");
          alert("Song not found.");
        }
      }
    })
}
    
// DOM section (change if you wanna change which buttons trigger search function)
const searchBar = document.getElementById("search-bar");
const searchTitleButton = document.getElementById("search-title-button");
const searchAuthorButton = document.getElementById("search-author-button");
const searchKRIButton = document.getElementById("search-kri-button");

// Button Event Listeners
searchTitleButton.addEventListener("click", () => {
   const searchTerm = searchBar.value;
   searchByTitle(searchTerm);
});

searchAuthorButton.addEventListener("click", () => {
   const searchTerm = searchBar.value;
   searchByAuthor(searchTerm);
});

searchKRIButton.addEventListener("click", () => {
   const searchTerm = searchBar.value;
   searchByKRI(searchTerm);
})

function displayOnScreen(foundSong,number_of_songs) {
  const cardContainer = document.getElementById("card-container");
  const cards = cardContainer.querySelectorAll(".card");
  cards.forEach(card => {
    cardContainer.removeChild(card);
  })
  for (let i = 0; i < number_of_songs; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    const h4 = document.createElement("h4");
    h4.innerHTML = foundSong[i].title;
    const h5 = document.createElement("h5");
    h5.innerHTML = foundSong[i].author.toString().split(",").join("<br>");
    const h6 = document.createElement("h6");
    h6.innerHTML = `KRI ${foundSong[i].kri_number}`;
    const dragContainer = document.createElement("div");
    dragContainer.classList.add("drag-container");
    for (let i = 0; i < 4; i++) {
      const circle = document.createElement("div");
      circle.classList.add("circle");
      dragContainer.appendChild(circle);
    }
    card.appendChild(h4);
    card.appendChild(h5);
    card.appendChild(h6);
    card.appendChild(dragContainer);
    cardContainer.appendChild(card);
  }
}



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

let addSongTitleSlide = (title, author, number, colorsChoice) => {
  let slide = pptx.addSlide({ masterName: "SONG_SLIDE_TITLE_LAYOUT" });
  slide.addText(number, { placeholder: "song_number", color: colorsChoice });
  slide.addText(title, { placeholder: "song_title", color: colorsChoice });
  if (Array.isArray(author)) {
    slide.addText(author.join(", "), { placeholder: "song_author" });
  } else {
    slide.addText(author, { placeholder: "song_author" });
  }
};

let addSongSlide = (title,author,verse_number,lyrics,colorsChoice) => {
let slide = pptx.addSlide({ masterName: "SONG_SLIDE_LAYOUT"});
slide.addText(title, {placeholder: "song_title", color: colorsChoice});
if (Array.isArray(author)) {
  slide.addText(author.join(", "), { placeholder: "song_author" });
} else {
  slide.addText(author, { placeholder: "song_author" });
}
slide.addText(lyrics, {placeholder: "song_lyrics"});
slide.addText(verse_number, {placeholder:"verse_number", color: colorsChoice});
};

let offeringSongSlide = (title,author,verse_number,lyrics,colorsChoice) => {
let slide = pptx.addSlide({ masterName: "OFFERING_SONG_SLIDE_LAYOUT"});
slide.addText(title, {placeholder: "song_title", color: colorsChoice})
if (Array.isArray(author)) {
  slide.addText(author.join(", "), { placeholder: "song_author" });
} else {
  slide.addText(author, { placeholder: "song_author" });
}
slide.addText(lyrics, {placeholder: "song_lyrics"});
slide.addText(verse_number, {placeholder:"verse_number", color: colorsChoice});
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

function generateSlides() {
  const song1 = document.getElementById("song-1").value; 
  const song2 = document.getElementById("song-2").value; 
  const song3 = document.getElementById("song-3").value;
  loadSongs("https://raw.githubusercontent.com/JoelIrawanLim/pptx-generator/refs/heads/main/app/data/data.yml").then (songsData => { if (songsData) { const firstSong = songsData[song1]; const secondSong = songsData[song2]; const thirdSong = songsData[song3]; } });
  addDarkSlide();
  addWelcomeSlide();
  addDarkSlide();
  addSongTitleSlide(title=firstSong.title,author=firstSong.author,number=1,colorsChoice="C55A11");
  const firstSongLength = firstSong.verse_number.length;
  for (let i = 0; i < firstSongLength; i++) {
    addSongSlide(title=firstSong.title,author=firstSong.author,verse_number=firstSong.verse_number[i],lyrics=firstSong.lyrics[i], colorsChoice="C55A11");
  }
  addSongTitleSlide(title = secondSong.title, author = secondSong.author, number = 2, colorsChoice = "2E75B6");
  const secondSongLength = secondSong.verse_number.length;
  for (let i = 0; i < secondSongLength; i++) {
    addSongSlide(title = secondSong.title, author = secondSong.author, verse_number = secondSong.verse_number[i], lyrics = secondSong.lyrics[i], colorsChoice = "C55A11");
  }
  addDarkSlide();
  addSongTitleSlide(title = thirdSong.title, author = thirdSong.author, number = 3, colorsChoice = "548135");
  const thirdSongLength = thirdSong.verse_number.length;
  for (let i = 0; i < thirdSongLength; i++) {
    addSongSlide(title = thirdSong.title, author = thirdSong.author, verse_number = thirdSong.verse_number[i], lyrics = thirdSong.lyrics[i], colorsChoice = "548135");
  }
  addDarkSlide();
  announcementsSlide();
  addDarkSlide();
  birthdaySlide();
  lastSlide();
  pptx.writeFile({ fileName: "presentation.pptx"}).then(fileName => {console.log(`created file: ${fileName}`)});
}
  