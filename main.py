data = []
song_number = 8


song_number -= 1
with open('KRI.txt','r') as file:
   content = file.read()
   for block in content.split("==="):
      data.append(block)
temp = data[song_number].split("\n")
for index in temp:
   if index == '':
      temp.remove(index)

# Initalize
kri_number = None
title = None
title_original = None
authors_musics = [None]
authors_lyrics = [None]
authors_full = [None]
ref_song = False
ref_index = None
highest_rep = 0
dual_language = False
for word in temp:
   # kri_number == type(string)
   if 'code' in word:
      kri_number = word[5:]

   # title == type(string)
   if 'title' in word:
      if 'original' in word:
         pass
      else:
         title = word[6:]
   # title_original == type(string)
   if 'title_original' in word:
      title_original = word[15:]
   # authors_lyrics == type(list)
   authors_lyrics = []
   authors = ''
   for word in temp:
      if 'authors_lyric' in word:
         authors_lyric = word[14:]
         if ';' in authors_lyric:
            for index in authors_lyric:
               if index == ';':
                  authors_lyrics.append(authors.strip())
                  authors = ''
               else:
                  authors += index
            authors_lyrics.append(authors.strip())  
         else:
            authors_lyrics.append(authors_lyric.strip())
           
   # authors_musics == type(list)   
   authors_musics = []
   authors = ''
   for word in temp:
      if 'authors_music' in word:
         authors_music = word[14:]
         if ';' in authors_music:
            for index in authors_music:
               if index == ';':
                  authors_musics.append(authors.strip())
                  authors = ''
               else:
                  authors += index
            authors_musics.append(authors.strip())
         else:
            authors_lyrics.append(authors_music.strip())
if authors_lyrics is not None and authors_lyrics != ['']:
   authors_full = authors_lyrics
   if authors_musics is not None and authors_musics != ['']:
      authors_full+= authors_musics

distributor_list = []
first_language = []
second_language = []
count = 0
counter = 1
title_temp = data[song_number].split("*")
for index in title_temp:
   if index == '':
      title_temp.remove(index)
for index in range(1,len(title_temp)):
   if title_temp[index].split("\n")[0] == "ref":
      ref_song = True   
      ref_index = index
   else:
      if '1' in title_temp[index].split("\n"):
         count += 1
      if count > 1:
         dual_language = True
   if str(counter) in title_temp[index].split("\n"):
      print(title_temp[1].split("\n")[1])
      # lele if u r reading this make it somehow append to 2 different lists, first_language and second_language
      
"""
# for index in range(1,len(title_temp)):
#     print(title_temp[index].replace("<u>", "").replace("</u>", "").split("\n")[1:-2])
# print(ref_song)
# print(ref_index)
# print(highest_rep)
# print(dual_language)
print(f"'kri{kri_number}':")
if not dual_language:
   print(f'  title: "{title}"')
else: 
   print(f'  title: "{title_original}"')
if ref_song: 
   temp_2 = []
   for index in range(1,highest_rep+1):
      temp_2.append(index)
      temp_2.append("ref")
   print(f'  verse_number: {temp_2}')
else: 
   temp_2 = []
   for index in range(1,highest_rep):
      temp_2.append(index)
   print(f'  verse_number: {temp_2}')
   
# print(title_original)
# print(authors_lyrics)
# print(authors_musics)
print(f'  author: {authors_full}')
print(f'  kri_number: {kri_number}')


def refrain():
    print(f'  - - "{title_temp[ref_index].splitlines()[1]}"')
    for i in range(1, len(title_temp[ref_index].splitlines())-1):
        print(f'    - "{title_temp[ref_index].splitlines()[i]}"')
def title_without_ref_shortened(index):
   temp_2 = title_temp[index].replace("<u>", "").replace("</u>", "")
   return temp_2.split("\n")[1:-1]
   
if ref_song:
   if not dual_language:
      title_temp_without_ref = title_temp.copy()
      del title_temp_without_ref[ref_index]
      for i in range(1, len(title_temp_without_ref)):
         print(f'  - - "{title_without_ref_shortened(i)[0]}"')
         if i == len(title_temp_without_ref)-1:
            for j in range(1, len(title_without_ref_shortened(i)[1:-2])):
               print(f'    - "{title_without_ref_shortened(i)[j]}"')
         else:
            for j in range(1, len(title_without_ref_shortened(i)[1:])):
               print(f'    - "{title_without_ref_shortened(i)[j]}"')
         refrain()
   else:
      title_temp_without_ref = title_temp.copy()
      del title_temp_without_ref[ref_index]
      for i in range(1, len(title_temp_without_ref)):
         print(f'  - - "{title_without_ref_shortened(i)[0]}"')
         if i == len(title_temp_without_ref)-1:
            for j in range(1, len(title_without_ref_shortened(i)[1:-2])):
               print(f'    - "{title_without_ref_shortened(i)[j]}"')
         else:
            for j in range(1, len(title_without_ref_shortened(i)[1:])):
               print(f'    - "{title_without_ref_shortened(i)[j]}"')
         refrain()

elif not ref_song:
   if not dual_language:
      def title_without_ref_shortened(index):
         temp_2 = title_temp[index].replace("<u>", "").replace("</u>", "")
         return temp_2.split("\n")[1:-1]
      for i in range(1, len(title_temp)):
         print(f'  - - "{title_without_ref_shortened(i)[0]}"')
         if i == len(title_temp)-1:
            for j in range(1, len(title_without_ref_shortened(i)[1:-2])):
               print(f'    - "{title_without_ref_shortened(i)[j]}"')
         else:
            for j in range(1, len(title_without_ref_shortened(i)[1:])):
               print(f'    - "{title_without_ref_shortened(i)[j]}"')
else:
   pass

#   title: "Di Bukit Golgota"
  # author: ["George Bennard"]
  # verse_number: [1, "ref", 2, "ref", 3, "ref", 4, "ref"]
  # kri_number: none
  # lyrics: 
"""