data = []
song_number = 34
with open('KRI.txt','r') as file:
   content = file.read()
   for block in content.split("==="):
      data.append(block)
temp = data[song_number].split("\n")
for index in temp:
   if index == '':
      temp.remove(index)
