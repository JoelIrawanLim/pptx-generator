from pptx import Presentation
from datetime import datetime
import os

class song:
   def __init__(self, title, author, verse_number, lyrics):
      self.title = title
      self.author = author
      self.verse_number = verse_number
      self.lyrics = lyrics

script_path = os.path.abspath(__file__)
script_dir = os.path.split(script_path)[0]
prs = Presentation(os.path.join(script_dir, "presentations/Remaja_template.pptx"))
output_presentation = './presentations/test4.pptx'

song_1 = song("How Great Thou Art", "Carl Bobert", [1, "ref", 2, "ref"], 
    [["O Lord my God, when I in awesome wonder", "Consider all the worlds Thy hands have made,", "I see the stars, I hear the rolling thunder,", "Thy power throughout the universe displayed."],
    ["Then sings my soul, my Saviour God to Thee", "How great Thou art! How great Thou art!", "Then sings my soul, my Saviour God to Thee", "How great Thou art! How great Thou art!"], 
    ["And when I think of God, His Son not sparing", "Sent Him to die, I scarce can take it in,", "That on the cross my burden gladly bearing,"],
    [""]
    ])

song_2 = song("Garry Alone", "Garqy", [1, 2, 3], 
    [["hi", "hello"],
    ["bye"],
    [""]
    ])

song_3 = song("Garry Alone", "Garjy", [1, 2], 
    [["hi", "hello"],
    ["bye"]
    ])

def generate_verse_number(verse_num): 
   if isinstance(verse_num, int):
      return str(verse_num)
   elif isinstance(verse_num, str):
      return verse_num
   else: 
      return 0
def add_welcome_slide():
    print("Welcome Slide")
    slide = prs.slides.add_slide(prs.slide_layouts[0])
    title = slide.shapes.title
    for shape in slide.placeholders:
     print('%d %s' % (shape.placeholder_format.idx, shape.name))
    date_text = slide.placeholders[10]
    church_name = slide.placeholders[11]
    title.text = "Welcome to Remaja"
    date_text.text = datetime.today().strftime('%d %B %Y')
    church_name.text = "Reformed Evangelical Church Singapore"

def add_first_song_title_slide():
    print("First Slide")
    slide = prs.slides.add_slide(prs.slide_layouts[1])
    title = slide.shapes.title
    for shape in slide.placeholders:
     print('%d %s' % (shape.placeholder_format.idx, shape.name))
    title.text = song_1.title
    number_text = slide.placeholders[10]
    author_text = slide.placeholders[11]
    author_text.text = song_1.author
    number_text.text = "1"

def add_second_song_title_slide():
    print("Second Slide")
    slide = prs.slides.add_slide(prs.slide_layouts[2])
    title = slide.shapes.title
    for shape in slide.placeholders:
     print('%d %s' % (shape.placeholder_format.idx, shape.name))
    title.text = song_2.title
    number_text = slide.placeholders[10]
    author_text = slide.placeholders[11]
    author_text.text = song_2.author
    number_text.text = "2"

def add_third_song_title_slide():
    print("Third Slide")
    slide = prs.slides.add_slide(prs.slide_layouts[3])
    title = slide.shapes.title
    for shape in slide.placeholders:
     print('%d %s' % (shape.placeholder_format.idx, shape.name))
    title.text = song_3.title
    number_text = slide.placeholders[10]
    author_text = slide.placeholders[11]
    author_text.text = song_3.author
    number_text.text = "3"
    
def add_first_song_lyrics_slide(verse_number):
    print("First Lyric Slide")
    slide = prs.slides.add_slide(prs.slide_layouts[4])
    title = slide.shapes.title
    for shape in slide.placeholders:
     print('%d %s' % (shape.placeholder_format.idx, shape.name))
    title.text = song_1.title
    author_text = slide.placeholders[11]
    number_text = slide.placeholders[13]
    lyrics_text = slide.placeholders[12].text_frame
    author_text.text = song_1.author
    lyrics_text.text = song_1.lyrics[verse_number][0]
    number_text.text = generate_verse_number(song_1.verse_number[verse_number])
    for i in range(1, len(song_1.lyrics[verse_number])):
        p = lyrics_text.add_paragraph()
        p.text = song_1.lyrics[verse_number][i]

def add_second_song_lyrics_slide(verse_number):
    print("First Lyric Slide")
    slide = prs.slides.add_slide(prs.slide_layouts[5])
    title = slide.shapes.title
    for shape in slide.placeholders:
     print('%d %s' % (shape.placeholder_format.idx, shape.name))
    title.text = song_2.title
    author_text = slide.placeholders[11]
    number_text = slide.placeholders[13]
    lyrics_text = slide.placeholders[12].text_frame
    author_text.text = song_2.author
    number_text.text = generate_verse_number(song_2.verse_number[verse_number])
    lyrics_text.text = song_2.lyrics[verse_number][0]
    for i in range(1, len(song_2.lyrics[verse_number])):
        p = lyrics_text.add_paragraph()
        p.text = song_2.lyrics[verse_number][i]

def add_third_song_lyrics_slide(verse_number):
    print("First Lyric Slide")
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    title = slide.shapes.title
    for shape in slide.placeholders:
     print('%d %s' % (shape.placeholder_format.idx, shape.name))
    title.text = song_3.title
    author_text = slide.placeholders[11]
    number_text = slide.placeholders[13]
    lyrics_text = slide.placeholders[12].text_frame
    author_text.text = song_3.author
    number_text.text = generate_verse_number(song_3.verse_number[verse_number])
    lyrics_text.text = song_3.lyrics[verse_number][0]
    for i in range(1, len(song_3.lyrics[verse_number])):
        p = lyrics_text.add_paragraph()
        p.text = song_3.lyrics[verse_number][i]    

def add_black_slide():
   slide = prs.slides.add_slide(prs.slide_layouts[7])

def add_announcements():
    prs.slides.add_slide(prs.slide_layouts[8])
    prs.slides.add_slide(prs.slide_layouts[9])
    birthday = prs.slides.add_slide(prs.slide_layouts[10])
    birthday.shapes.title.text = "Birthday Song"
    prs.slides.add_slide(prs.slide_layouts[11])

def generate_first_song():
    add_first_song_title_slide()
    for i in range(0, len(song_1.verse_number)):
        add_first_song_lyrics_slide(i)
    add_black_slide()

def generate_second_song():
    add_second_song_title_slide()
    for i in range(0, len(song_2.verse_number)):
        add_second_song_lyrics_slide(i)
    add_black_slide()

def generate_third_song():
    add_third_song_title_slide()
    for i in range(0, len(song_3.verse_number)):
        add_third_song_lyrics_slide(i)
    add_black_slide()

add_welcome_slide()
generate_first_song()
generate_second_song()
generate_third_song() 
add_announcements() 

prs.save(output_presentation)
