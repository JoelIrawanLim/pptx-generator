def searchvariables(search_query,search_option):
   global searchquery,searchoption
   searchquery = search_query
   searchoption = search_option
   outer_func_test()
   
def outer_func_test():
   print(searchquery,searchoption)
   
def songvariables(song_1,song_2,song_3,presentation_title):
   global song1,song2,song3,presentationtitle
   song1 = song_1
   song2 = song_2
   song3 = song_3
   presentationtitle = presentation_title
   outer_func_test_2()
def outer_func_test_2():
   print(song1,song2,song3,presentationtitle)
   
if __name__ == "__main__":
   pass