# pptx-generator
Helps automatically generate slides
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

`pptx-generator` 