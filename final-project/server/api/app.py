# flask use to get input from the react 
# analyze return both polarity / subjectivity score and ngrams 

from flask import Flask, request, jsonify 
from flask import Blueprint
import json
# import twitter 

app = Flask(__name__)

#defining a route 
@app.route('/text', methods = ['GET','POST'])
#route handler function 
def anaylze_text (): 
    text_data = request.get_json()
    # response = fl.function(anaylze_text(text_data))
    print(text_data)

    # write data to a file in the same directory as the jup notebook
    # read the data back in the notebook 
    # re - write the file 
    with open ('text.txt', 'w') as outfile:
        json.dump(text_data, outfile)
    return text_data
    # make an analysis.py file in the same directory in the flask project 
    
      
# app.run(debug = True) 

# api = twitter.Api(consumer_key=[consumer key],
#                   consumer_secret=[consumer secret],
#                   access_token_key=[access token],
#                   access_token_secret=[access token secret])

#defining the twitter route 
# @app.route('/twitter', methods = ['GET', 'POST'])
#route handler function
# def get_tweets():