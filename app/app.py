from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
   return render_template('index.html')

@app.route('/pptx-search', methods=['GET','POST'])
def search_function():
   if request.method == 'POST':
      search_query = request.form.get('searchquery')
      # Insert code here, etc what you want to do with the variable
      print(search_query)
      return render_template('index.html', message="Search submitted")
   else:
      return render_template('index.html')
@app.route('/generator-function', methods=['POST'])
def generator_function():
   if request.method == 'POST':
      song1 = request.form.get('song1')
      song2 = request.form.get('song2')
      song3 = request.form.get('song3')
      presentationtitle = request.form.get('pptxtitle')
      print(song1)
      print(song2)
      print(song3)
      print(presentationtitle)
      return render_template('index.html', message="Other form submitted")
   else:
      return render_template('index.html')
if __name__ == "__main__":
   app.run(debug=True)