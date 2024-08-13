from flask import Flask, render_template, request
import pptx_generator_ui

app = Flask(__name__)

@app.route('/')
def home():
   return render_template('index.html')

@app.route('/pptx-search', methods=['GET','POST'])
def search_function():
   global search_query,search_option
   if request.method == 'POST':
      search_query = request.form.get('searchquery')
      search_option = request.form.get('searchoption')
      pptx_generator_ui.searchvariables(search_query,search_option)
      return render_template('index.html')
   else:
      return render_template('index.html')
@app.route('/generator-function', methods=['GET','POST'])
def generator_function():
   global song_1,song_2,song_3
   if request.method == 'POST':
      song_1 = request.form.get('song1')
      song_2 = request.form.get('song2')
      song_3 = request.form.get('song3')
      presentation_title = request.form.get('pptxtitle')
      if presentation_title == "":
         presentation_title = 'presentation'
      pptx_generator_ui.songvariables(song_1,song_2,song_3,presentation_title)
      return render_template('index.html')
   else:
      return render_template('index.html')
if __name__ == "__main__":
   app.run(debug=True)

