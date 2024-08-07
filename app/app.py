from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        # Get data from form
        search_query = request.form['searchquery']
        input2 = request.form['input2']
        input3 = request.form['input3']
        input4 = request.form['input4']
        input5 = request.form['input5']

        # Save or print for now
        print(f"Input 1: {search_query}")
        print(f"Input 2: {input2}")
        print(f"Input 3: {input3}")
        print(f"Input 4: {input4}")
        print(f"Input 5: {input5}")

        return render_template('index.html')
    else:
        return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)