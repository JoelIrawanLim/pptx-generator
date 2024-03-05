import database

song = input("Enter KRI song name/number: ")
song_is_int = True
try:
    song = int(song)
except ValueError:
    song_is_int = False
if song_is_int == True:
    search_result = database.int_search(song)
elif song_is_int == False:
    search_result = database.str_search(song)

