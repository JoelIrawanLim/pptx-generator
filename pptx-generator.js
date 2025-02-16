const PptxGenJS = require("pptxgenjs");

let pptx = new PptxGenJS();
let slide = pptx.addSlide();

slide.addText("Hello World!", {x : 1, y: 1, fontSize: 18, color: "363636"});
pptx.writeFile("SamplePresentation.pptx");