# Google Collab Tutorial
This is the tutorial for Google collab ui 

The very first line **MUST** be run every time it is reloaded. The Google Collab ui won't work when not activated. 

## Search Function.

Search function requires two inputs. This function checks whether a song is inside the song-list. This function can search for title, author, or kri number of the song.

To search for title, put the song name in search line and use the title mode.

To search for author, put the author name in search line and use author mode.

To search for kri number, put the kri number in search line and use kri_number mode

If a song is not inside the song list, you can ask the generator function below to generator empty slides in the proper format so that you can manually add the proper lyrics.

## Generator Function
pptx-generator function requires at least three values. An optional fourth value is also accepted.

pptx-generator first 3 values is to the id of the songs. The program will generate a songs in the order of left to right. This id of the song can be found using the pptx-generator-search  Example: pptx-generator kri1 kri68 kri5 will generate the songs with the first song being the one with the id kri1, second being the song wirh the id of kri68 and the third being the one with the id kri5. In order to generate an empty slide using the proper template and formatting (If the song is not in the song list) all you have to do is instead of using a number, write empty instead of a song id. Example: pptx-generator kri1 empty kri5 will generate the songs with the first song being the one with the id kri1, second being an empty slide with the proper formatting and template and the third being the one with the id kri5. The program accepts the id being in uppercased letters. Example: KRI1, and as a shortform. k is the shortform for kri. Example: k1 is the same as kri1

The optional 4th value is the name of the output slide. pptx-generator kri1 kri68 kri5 output will generate a slide in the current working directory with the name output.pptx. If this value is not given, the default value of presentation.pptx will be used. The program allows for you to include the .pptx extention at the end of the file. For example, pptx-generator kri1 kri68 kri5 output and pptx-generator kri1 kri68 kri5 output.pptx is the same.ptx-generator command requires at least three values. An optional fourth value is also accepted.

