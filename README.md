# pptx-generator
Helps automatically generate slides
## Zero-setup method
You can use google collab to run an easy to use version of this script. 

Go to: [collab link](https://colab.research.google.com/drive/1lYKa7aeWkkQcBxrcUAk-ytR3sFIZ-Xew?usp=sharing)

Click the run button for first command at the very top. Do this everytime you open the link. 
Google will tell you that it is not authored by Google, click run anyway. 

You can now input you searches inside the ui and click the run button

## Dependencies
Requires Python 3.7 and higher.
Requires Pip, which is usually preinstalled with python.
Requires python-pptx, pyyaml, setuptools.
Requires git installed for one-liner to work. 

## Installation Guide
Make sure python is installed. You can get it from the python website. [Download Python | Python.org](https://www.python.org/downloads/)

After installing it, make sure both pip and python is downloaded. 
In order to use this, you need to access your terminal. 
Doing this is dependent on your operating system. 
### Accessing terminal on Windows
If you are on windows, go to you need to open the start menu. 
Next, search in the search bar for `cmd`
Next open up command prompt
### Accessing terminal on macOS
If you are on mac, open up spotlight search, which can be done by clicking the magnifying glass icon and the top right of the screen. 
Now spotlight search is opened, search for terminal and open it. 
### Checking if python and pip is installed properly. 
Make sure you are in the terminal and type and run both `python3 --version` and `pip --version`. If `python3 --version` does not work, try `python --version`

If these show version numbers, you have successfully installed pip and python. 

### Installing git
If you have not installed git, do so using this guide: [Git - Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

If you have git installed already, running `git` should give an output of the proper usage of git. 

### Actually installing
Once you have made sure all the above is installed, do this one liner below:
```bash 
python3 -m pip install git+https://github.com/JoelIrawanLim/pptx-generator.git
```
if you are on Windows, the above command might not work. If so, use this command:
```bash
python -m pip install git+https://github.com/JoelIrawanLim/pptx-generator.git
```
 
Now you should be able to use our program.

## Usage Guide
There are two commands that is part of the program.
The program runs entirely inside the terminal. If you don't know how to access the terminal, see the above section. 

The two commands are `pptx-generator` and `pptx-generator-search`
### pptx-generator-search command usage
`pptx-generator-search` requires two values. This command searches whether a song is inside the song-list. This command can search for title, author, or kri number of the song. 

To search for title, put the song name in double quotes (") and type `-t` at the end. For example, `pptx-generator-search "Grace Alone" -t`

To search for author, put the author name in double quotes (") and type `-a` at the end. For example, `pptx-generator-search "Scott Wesley Brown" -a`

To search for kri number, put the kri number and type `-k` at the end. For example `pptx-generator-search 1 -k`

If a song is not inside the song list, you can ask pptx-generator to generator empty slides in the proper format so that you can manually add the proper lyrics

### pptx-generator command usage
`pptx-generator` command requires at least three values. An optional fourth value is also accepted. 

`pptx-generator` first 3 values is to the id of the songs. The program will generate a songs in the order of left to right. This id of the song can be found using the `pptx-generator-search ` 
Example: `pptx-generator kri1 kri68 kri5` will generate the songs with the first song being the one with the id kri1, second being the song wirh the id of kri68 and the third being the one with the id kri5. 
The program accepts the id being in uppercased letters. Example: KRI1, and as a shortform. k is the shortform for kri. Example: k1 is the same as kri1

The optional 4th value is the name of the output slide. `pptx-generator kri1 kri68 kri5 output` will generate a slide in the current working directory with the name output.pptx. If this value is not given, the default value of presentation.pptx will be used. The program allows for you to include the .pptx extention at the end of the file. For example, `pptx-generator kri1 kri68 kri5 output` and `pptx-generator kri1 kri68 kri5 output.pptx` is the same. 
