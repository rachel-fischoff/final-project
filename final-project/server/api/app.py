from flask import Flask, request, jsonify
from flask_cors import CORS
import json, csv
import pandas as pd 
from api.tf_ngrams import run_ngrams

# import twitter [to be added for when i implement the twitter functions]

app = Flask(__name__)
CORS(app)

#defining the post route for the text submitted by the user 
@app.route('/text', methods = ['POST'])

#route handler function 
def anaylze_text (): 
    text_data = request.get_json()

    print(text_data)

    #writes data to text file for Natural Language Processing and sentiment analysis
    with open ('text.txt', 'w') as outfile:
        json.dump(text_data, outfile)
    return text_data


#defining the get route for the ngrams and each of their score 
@app.route('/ngrams', methods = ['GET'])

#route handler function 
def return_ngrams ():

    run_ngrams()
    #use pandas to read the csv
    df = pd.read_csv('ngram.csv')
    dict1 = df.to_dict(orient='list')
    print(dict1)
    # df2 = pd.read_csv('sentence.csv')
    # dict2 = df2.to_dict(orient='list')
    # print(dict2)
    return jsonify(dict1)
    


if __name__ == '__main__':
    app.run(debug = True, port=5000) 

# api = twitter.Api(consumer_key=[consumer key],
#                   consumer_secret=[consumer secret],
#                   access_token_key=[access token],
#                   access_token_secret=[access token secret])

#defining the twitter route 
# @app.route('/twitter', methods = ['GET', 'POST'])
#route handler function
# def get_tweets():