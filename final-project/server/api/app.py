# flask use to get input from the react 
# analyze return both polarity / subjectivity score and ngrams 

from flask import Flask, request, jsonify, Response, Request 
from flask import Blueprint
import json
# import twitter 

app = Flask(__name__)

#defining a route 
@app.route('/text', methods = ['POST'])
#route handler function 
def anaylze_text (): 
    text_data = request.get_json()

    print(text_data)

    #writes data to text file for sentiment analysis and NLP
    with open ('text.txt', 'w') as outfile:
        json.dump(text_data, outfile)
    return text_data


#defining the route
@app.route('/text', methods = ['GET'])

#route handler function 
def return_sentiment ():
    
  with open ('text.txt', 'r') as infile:
    ngram_data = infile.read()
    print (infile.read())
    return jsonify(ngram_data)


      
# app.run(debug = True) 

# api = twitter.Api(consumer_key=[consumer key],
#                   consumer_secret=[consumer secret],
#                   access_token_key=[access token],
#                   access_token_secret=[access token secret])

#defining the twitter route 
# @app.route('/twitter', methods = ['GET', 'POST'])
#route handler function
# def get_tweets():