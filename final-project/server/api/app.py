# flask use to get input from the react 
# analyze return both polarity / subjectivity score and ngrams 

from flask import Flask, request, jsonify 
from flask import Blueprint
# import twitter 

app = Flask(__name__)

#defining a route 
@app.route('/text', methods = ['GET','POST'])
#route handler function 
def anaylze_text (): 
    text_data = request.get_json()
    # response = fl.function(anaylze_text(text_data))
    print(text_data)
    return text_data
      
# app.run(debug = True) 

# api = twitter.Api(consumer_key=[consumer key],
#                   consumer_secret=[consumer secret],
#                   access_token_key=[access token],
#                   access_token_secret=[access token secret])

#defining the twitter route 
# @app.route('/twitter', methods = ['GET', 'POST'])
#route handler function
# def get_tweets():