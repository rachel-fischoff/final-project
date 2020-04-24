# flask use to get input from the react 
# analyze return both polarity / subjectivity score and ngrams 

from flask import Flask, request, jsonify 

app = Flask(__name__)

#defining a route 
@app.route('/text', methods = ['GET','POST'])
#route handler function 
def anaylze_text (): 
    text_data = request.get_json()
    return 'Done', 200
      
app.run(debug = True) 