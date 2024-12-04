from flask import Flask, render_template, request, send_file, jsonify, send_from_directory
import os
import json
import pptx_generator_ui

# Flask configuration
app = Flask(
    __name__,
    static_folder='static',  # Root folder for static files
    template_folder='templates'  # Folder for HTML templates
)

def get_hashed_asset(manifest_file, asset_name):
    """
    Read the Vite manifest file to get the hashed file name for the given asset.
    """
    try:
        print(f"Reading manifest file: {manifest_file}")
        with open(manifest_file, 'r') as f:
            manifest = json.load(f)
        print(f"Manifest content: {manifest}")
        return manifest[asset_name]["file"]
    except KeyError:
        print(f"Key {asset_name} not found in manifest.")
        return None
    except Exception as e:
        print(f"Error loading manifest: {e}")
        return None

@app.route('/')
def home():
    # Locate the manifest.json file inside the `.vite` directory
    project_root = os.path.dirname(os.path.abspath(__file__))
    manifest_path = os.path.join(project_root, 'static/js/build/.vite/manifest.json')

    # Key to access the main JavaScript file in your manifest.json
    entry_key = 'main.jsx'

    # Load the hashed JS file name
    js_file = get_hashed_asset(manifest_path, entry_key)
    if not js_file:
        raise Exception(f"Manifest or hashed file not found for key: {entry_key}")

    # Prepend the static path if not already included
    js_file = f"js/build/{js_file}"

    return render_template('index.html', js_file=js_file)

@app.route('/pptx-search', methods=['POST'])
def search_function():

    search_query = request.form.get('searchquery')
    search_option = request.form.get('searchoption')


    pptx_generator_ui.search(search_query, search_option)

    result = {
        'query': search_query,
        'option': search_option,
        'message': f"Search for '{search_query}' with option '{search_option}' processed successfully.",
        'key': pptx_generator_ui.searchresult_key,
        'author': pptx_generator_ui.searchresult_author,
        'title': pptx_generator_ui.searchresult_title,
        'error': pptx_generator_ui.searchresult_error,
        'invalid': pptx_generator_ui.searchresult_invalid,
    }

    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return jsonify(result)
    else:
        return render_template(
            'search.html',
            key=pptx_generator_ui.searchresult_key,
            author=pptx_generator_ui.searchresult_author,
            title=pptx_generator_ui.searchresult_title,
            error=pptx_generator_ui.searchresult_error,
            invalid=pptx_generator_ui.searchresult_invalid
        )

@app.route('/generator-function', methods=['POST'])
def generator_function():
   if request.method == 'POST':
      first_song_id = request.form.get('song1')
      second_song_id = request.form.get('song2')
      third_song_id = request.form.get('song3')
      presentation_title = request.form.get('pptxtitle')
      if presentation_title == "":
         presentation_title = "presentation"
      pptx_generator_ui.main(first_song_id, second_song_id,third_song_id, presentation_title)
      """
      @after_this_request
      def remove_file(response):
         os.remove(pptx_generator_ui.output_presentation)
         return response
      """ 
      return send_file(pptx_generator_ui.output_presentation,as_attachment=True)
   else:
      return render_template('index.html')

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 6000))
    app.run(host='0.0.0.0', port=port, debug=True)
