data = {
    1:"test song 1",
    2:"test song 2",
    3:"test song 3",

}
def int_search(song):
    print(str(song) + ".", data[song])

def str_search(song):
    result_list = []
    for i in data:
        if song in data[i][:len(song)]:
            result_list.append(data[i])
        else:
            pass
    for j,nums in enumerate(result_list):
        print(str(j+1) + ".", str(nums))

if __name__ == "__main__":
    pass
