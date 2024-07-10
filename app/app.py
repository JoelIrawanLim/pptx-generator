from flask import Flask,render_template
import data

app = Flask(__name__)

data_from_file = data.get_data()
@app.route("/")
def main():
   return render_template("index.html", data=data_from_file)

if __name__=="__main__":
   app.run(debug=True)
   
