from pptx import Presentation
from datetime import datetime
import os

prs = Presentation("./presentations/Remaja_template.pptx")
song_1_title = "Garry Alone"
song_1_author = "Garry"

song_2_title = "Garry Alone"
song_2_author = "Garpy"

song_3_title = "Garry Alone"
song_3_author = "Garly"


def add_welcome_slide():
    print("Welcome Slide")
    slide = prs.slides.add_slide(prs.slide_layouts[0])
    title = slide.shapes.title
    for shape in slide.placeholders:
     print('%d %s' % (shape.placeholder_format.idx, shape.name))
    date_text = slide.placeholders[10]
    church_name = slide.placeholders[11]
    title.text = "Welcome too Remaja"
    date_text.text = datetime.today().strftime('%d %B %Y')
    church_name.text = "Reformed Evangelical Church Singapore"

def add_first_song_title_slide():
    print("First Slide")
    slide = prs.slides.add_slide(prs.slide_layouts[1])
    title = slide.shapes.title
    for shape in slide.placeholders:
     print('%d %s' % (shape.placeholder_format.idx, shape.name))
    title.text = song_1_title
    number_text = slide.placeholders[10]
    author_text = slide.placeholders[11]
    author_text.text = song_1_author
    number_text.text = "1"

def add_second_song_title_slide():
    print("Second Slide")
    slide = prs.slides.add_slide(prs.slide_layouts[2])
    title = slide.shapes.title
    for shape in slide.placeholders:
     print('%d %s' % (shape.placeholder_format.idx, shape.name))
    title.text = song_2_title
    number_text = slide.placeholders[10]
    author_text = slide.placeholders[11]
    author_text.text = song_2_author
    number_text.text = "2"

def add_third_song_title_slide():
    print("Third Slide")
    slide = prs.slides.add_slide(prs.slide_layouts[3])
    title = slide.shapes.title
    for shape in slide.placeholders:
     print('%d %s' % (shape.placeholder_format.idx, shape.name))
    title.text = song_3_title
    number_text = slide.placeholders[10]
    author_text = slide.placeholders[11]
    author_text.text = song_3_author
    number_text.text = "3"
    
def add_first_song_lyrics_slide():
    print("First Lyric Slide")
    slide = prs.slides.add_slide(prs.slide_layouts[4])
    title = slide.shapes.title
    for shape in slide.placeholders:
     print('%d %s' % (shape.placeholder_format.idx, shape.name))
    title.text = song_1_title
    author_text = slide.placeholders[11]
    number_text = slide.placeholders[13]
    lyrics_text = slide.placeholders[12].text_frame
    author_text.text = song_1_author
    number_text.text = "1"
    lyrics_text.text = "One"
    p = lyrics_text.add_paragraph()
    p.text = 'Use _TextFrame.text for first bullet' 

    

add_welcome_slide()
add_first_song_title_slide()
add_second_song_title_slide()
add_third_song_title_slide()
add_first_song_lyrics_slide()


prs.save('./presentations/test4.pptx')
