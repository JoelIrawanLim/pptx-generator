from datetime import datetime, timedelta
from pptx import Presentation
import os
import yaml


# variable initialization
def searchvariables(search_query, search_option):
   global searchquery, searchoption
   searchquery = search_query
   searchoption = search_option


def songvariables(song_1, song_2, song_3, presentation_title):
   global song1, song2, song3, presentationtitle
   song1 = song_1
   song2 = song_2
   song3 = song_3
   presentationtitle = presentation_title


# main app
# Gets the date of the next wednesday.
def get_next_weekday(startdate, weekday):
   """
    @startdate: given date, in format '2013-05-25'
    @weekday: week day as a integer, between 0 (Monday) to 6 (Sunday)
    """
   d = datetime.strptime(startdate, '%d %B %Y')
   t = timedelta((7 + weekday - d.weekday()) % 7)
   return (d + t).strftime('%d %B %Y')


def initialize():
   global data
   global prs
   # Gets the path of the script. As the script might be downloaded in different locations.
   script_path = os.path.abspath(__file__)
   script_dir = os.path.split(script_path)[0]
   # Comines the path where the script is locaed with the relative position of the yaml file
   with open(os.path.join(script_dir, "data/data.yml"), 'r') as file:
      data = yaml.safe_load(file)
   # Combines the path of where the script is located with the relative location of where the template Presentation is.
   pptx_path = os.path.join(script_dir, "data/Remaja_template.pptx")
   prs = Presentation(pptx_path)


def id_to_song():
   global song_1
   global song_2
   global song_3
   song_1 = data[song1]
   song_2 = data[song2]
   song_3 = data[song3]


def generate_verse_number(verse_num):
   if isinstance(verse_num, int):
      return str(verse_num)
   elif isinstance(verse_num, str):
      return verse_num
   else:
      return 0


# Adds a black blank slide.
def add_black_slide():
   prs.slides.add_slide(prs.slide_layouts[7])


# Adds the first silde which says "Welcome to Remaja"
def add_welcome_slide():
   slide = prs.slides.add_slide(prs.slide_layouts[0])
   title = slide.shapes.title
   date_text = slide.placeholders[10]
   church_name = slide.placeholders[11]
   title.text = "Welcome to Remaja"
   date_text.text = get_next_weekday(datetime.today().strftime('%d %B %Y'), 5)
   church_name.text = "Reformed Evangelical Church Singapore"
   add_black_slide()


def author_find(key):
   text = data[key]['author'][0]
   for i in range(1, len(data[key]['author'])):
      text = f"{text}, {data[key]['author'][i]}"
   return text


# Adds the title slide for the first song, with the proper template and color
def add_first_song_title_slide():
   slide = prs.slides.add_slide(prs.slide_layouts[1])
   title = slide.shapes.title
   title.text = song_1['title']
   number_text = slide.placeholders[10]
   author_text = slide.placeholders[11]
   author_text.text = author_find(song1)
   number_text.text = "1"


# Adds the title slide for the second song, with the proper template and color
def add_second_song_title_slide():
   slide = prs.slides.add_slide(prs.slide_layouts[2])
   title = slide.shapes.title
   title.text = song_2['title']
   number_text = slide.placeholders[10]
   author_text = slide.placeholders[11]
   author_text.text = author_find(song2)
   number_text.text = "2"


# Adds the title slide for the third song, with the proper template and color
def add_third_song_title_slide():
   slide = prs.slides.add_slide(prs.slide_layouts[3])
   title = slide.shapes.title
   title.text = song_3['title']
   number_text = slide.placeholders[10]
   author_text = slide.placeholders[11]
   author_text.text = author_find(song3)
   number_text.text = "3"


# Adds the lyric slides for the first song, with the proper template and color
# Inputs is verse number, which is an array of the numbers written at the bottom of the slides.
def add_first_song_lyrics_slide(verse_number):
   slide = prs.slides.add_slide(prs.slide_layouts[4])
   title = slide.shapes.title
   title.text = song_1['title']
   author_text = slide.placeholders[11]
   number_text = slide.placeholders[13]
   lyrics_text = slide.placeholders[12].text_frame
   author_text.text = author_find(song1)
   if (verse_number + 1 > len(song_1['lyrics'])):
      # Fix this afterward
      print("An Error Occured.")
      return 0
   lyrics_text.text = song_1['lyrics'][verse_number][0]
   number_text.text = generate_verse_number(
       song_1['verse_number'][verse_number])
   for i in range(1, len(song_1['lyrics'][verse_number])):
      p = lyrics_text.add_paragraph()
      p.text = song_1['lyrics'][verse_number][i]


# Adds the lyric slides for the second song, with the proper template and color
# Inputs is verse number, which is an array of the numbers written at the bottom of the slides.
def add_second_song_lyrics_slide(verse_number):
   slide = prs.slides.add_slide(prs.slide_layouts[5])
   title = slide.shapes.title
   title.text = song_2['title']
   author_text = slide.placeholders[11]
   number_text = slide.placeholders[13]
   lyrics_text = slide.placeholders[12].text_frame
   author_text.text = author_find(song2)
   number_text.text = generate_verse_number(
       song_2['verse_number'][verse_number])
   if (verse_number + 1 > len(song_2['lyrics'])):
      # Fix this afterward
      print("An Error Occured.")
      return 0
   lyrics_text.text = song_2['lyrics'][verse_number][0]
   for i in range(1, len(song_2['lyrics'][verse_number])):
      p = lyrics_text.add_paragraph()
      p.text = song_2['lyrics'][verse_number][i]


# Adds the lyric slides for the third song, with the proper template and color
# Inputs is verse number, which is an array of the numbers written at the bottom of the slides.
def add_third_song_lyrics_slide(verse_number):
   slide = prs.slides.add_slide(prs.slide_layouts[6])
   title = slide.shapes.title
   title.text = song_3['title']
   author_text = slide.placeholders[11]
   number_text = slide.placeholders[13]
   lyrics_text = slide.placeholders[12].text_frame
   author_text.text = author_find(song3)
   number_text.text = generate_verse_number(
       song_3['verse_number'][verse_number])
   if (verse_number + 1 > len(song_3['lyrics'])):
      # Fix this afterward
      print("An Error Occured.")
      return 0
   lyrics_text.text = song_3['lyrics'][verse_number][0]
   for i in range(1, len(song_3['lyrics'][verse_number])):
      p = lyrics_text.add_paragraph()
      p.text = song_3['lyrics'][verse_number][i]


# Add multiple slides in the announcement time.
# Includes the slide which says announcements,
#  A blank white slide for placing images of the announcement,
# The birthday song,
# And the "See you next week!" Slide
# No inputs
def add_announcements():
   prs.slides.add_slide(prs.slide_layouts[8])
   prs.slides.add_slide(prs.slide_layouts[9])
   birthday = prs.slides.add_slide(prs.slide_layouts[10])
   birthday.shapes.title.text = "Birthday Song"
   birthday_lyrics = birthday.placeholders[10].text_frame
   birthday_lyrics_paragraph = birthday_lyrics.paragraphs[0]
   birthday_lyrics_paragraph.text = "Selamat ulang tahun,"
   birthday_lyrics_paragraph = birthday_lyrics.add_paragraph()
   birthday_lyrics_paragraph.text = "Kami ucapkan padamu."
   birthday_lyrics_paragraph = birthday_lyrics.add_paragraph()
   birthday_lyrics_paragraph.text = "Selamat hari jadi,"
   birthday_lyrics_paragraph = birthday_lyrics.add_paragraph()
   birthday_lyrics_paragraph.text = "Tuhan Yesus memberkati."
   birthday_lyrics_paragraph = birthday_lyrics.add_paragraph()
   birthday_lyrics_paragraph = birthday_lyrics.add_paragraph()
   birthday_lyrics_paragraph.text = "Kami s'lalu berdoa"
   birthday_lyrics_paragraph = birthday_lyrics.add_paragraph()
   birthday_lyrics_paragraph.text = "Agar kau tetap setia"
   birthday_lyrics_paragraph = birthday_lyrics.add_paragraph()
   birthday_lyrics_paragraph.text = "Pada Yesus Kristus, Tuhan dan Raja kita, oh."
   birthday_lyrics_paragraph = birthday_lyrics.add_paragraph()
   birthday_lyrics_paragraph.text = "Kami mengucap syukur"
   birthday_lyrics_paragraph = birthday_lyrics.add_paragraph()
   birthday_lyrics_paragraph.text = "Tuhan t'lah pimpin langkahmu"
   birthday_lyrics_paragraph = birthday_lyrics.add_paragraph()
   birthday_lyrics_paragraph.text = "Padamu [insert name], selamat ulang tahun!"
   birthday_lyrics_paragraph = birthday_lyrics.add_paragraph()
   prs.slides.add_slide(prs.slide_layouts[11])


def generate_first_song():
   add_first_song_title_slide()
   for i in range(0, len(song_1['verse_number'])):
      add_first_song_lyrics_slide(i)
   add_black_slide()


def generate_second_song():
   add_second_song_title_slide()
   for i in range(0, len(song_2['verse_number'])):
      add_second_song_lyrics_slide(i)
   add_black_slide()


def generate_third_song():
   add_third_song_title_slide()
   for i in range(0, len(song_3['verse_number'])):
      add_third_song_lyrics_slide(i)
   add_black_slide()


def text_formater(text):
   text = text.lower().replace("_", "").replace("-", "")
   return text


# Checks if the song id is a valid song id inside the song-list
def song_id():
   global song_1
   global song_2
   global song_3
   global Fail
   song_1 = text_formater(song_1)
   song_2 = text_formater(song_2)
   song_3 = text_formater(song_3)
   Fail = 0
   if data.get(song_1):
      Fail += 1
   else:
      print(f"{song_1} is not a valid song id")
   if data.get(song_2):
      Fail += 1
   else:
      print(f"{song_2} is not a valid song id")
   if data.get(song_3):
      Fail += 1
   else:
      print(f"{song_3} is not a valid song id")
   if Fail != 3:
      pass
      # Handle


def main():
   global output_presentation
   initialize()
   song_id()
   id_to_song()
   add_welcome_slide()
   generate_first_song()
   generate_second_song()
   generate_third_song()
   add_announcements()
   if presentationtitle.endswith(('.pptx')):
      output_presentation = presentationtitle
   else:
      output_presentation = presentationtitle + ".pptx"
   prs.save(output_presentation)
   id_to_song()
   add_welcome_slide()
   generate_first_song()
   generate_second_song()
   generate_third_song()
   add_announcements()
   prs.save(output_presentation)
   # Handle


def search():
   global output_presentation
   initialize()
   found = 0
   if searchoption == "-a":
      addresses = []
      for key in data:
         for index_of_all_authors in range(0, len(data[key]['author'])):
            for index_of_all_words_of_authors in range(
                0, len(data[key]['author'][index_of_all_authors].split(" "))):
               for index_of_all_userinput_words in range(
                   0, len(searchquery.split(" "))):
                  if searchquery.split(
                      " "
                  )[index_of_all_userinput_words].lower(
                  ).replace(" ", "").replace("?", "").replace("!", "").replace(
                      ".",
                      "") == data[key]['author'][index_of_all_authors].split(
                          " ")[index_of_all_words_of_authors].lower().replace(
                              " ",
                              "").replace("?",
                                          "").replace("!",
                                                      "").replace(".", ""):
                     already_done = False
                     for done_addresses in range(0, len(addresses)):
                        if addresses[done_addresses] == key:
                           already_done = True
                     if not already_done:
                        print(
                            f"PPTX-Adress: {key}, Title: {data[key]['title']}, Author: {data[key]['author']}"
                        )
                        found = 1
                        addresses.append(key)

      if found != 1:
         print(f"There is no author named {searchquery} in our song list.")
      else:
         pass
         # Handle Output
   elif searchoption == "-t":
      for key in data:
         if searchquery.lower().replace(" ", "").replace("?", "").replace(
             "!",
             "").replace(".", "").replace(",", "").replace(";", "").replace(
                 ":",
                 "").replace("'", "") == data[key]['title'].lower().replace(
                     " ", "").replace("?", "").replace("!", "").replace(
                         ".", "").replace(",", "").replace(";", "").replace(
                             ":", "").replace("'", ""):
            print(
                f"PPTX-Adress: {key}, Title: {data[key]['title']}, Author: {data[key]['author']}"
            )
            found = 1
         if found != 1:
            print(f"There is no song named {searchquery} in our song list.")
         else:
            pass
            # Handle Output
   elif searchoption == "-k":
      if searchquery.isdigit():
         for key in data:
            if int(searchquery) == data[key]['kri_number']:
               print(
                   f"PPTX-Adress: {key}, Title: {data[key]['title']}, Author: {data[key]['author']}"
               )
               found = 1
               if found != 1:
                  print(f"There is no {searchquery} in our song list.")
            else:
               pass
               # Handle Output
         else:
            print("That is not a valid KRI number")


def debug():
   global song_1
   global song_2
   global song_3
   global output_presentation
   initialize()
   add_welcome_slide()
   for number in data:
      if number != "empty":
         song_1 = data[number]
         song_2 = data[number]
         song_3 = data[number]
         generate_first_song()
         generate_second_song()
         generate_third_song()
   add_announcements()
   prs.save(output_presentation)
   print(f"Done! Saved {output_presentation}")


if __name__ == "__main__":
   pass
