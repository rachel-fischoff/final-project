from flask import Flask, request, jsonify
from flask_cors import CORS
import json, csv, re
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
        json.dump(text_data['text'], outfile)
    return text_data


#defining the get route for each word and each of their score 
@app.route('/words', methods = ['GET'])

#route handler function 
def return_words ():

    #run the model to return trigrams, bigrams and unigrams with sentiment score
    run_ngrams()

    # #use pandas to read the csv
    # df = pd.read_csv('words.csv')
    # dict = df.to_dict(orient='list')
    # print(dict)
    # return jsonify(dict)
    
     #open the text file 
    with open ('text.txt', 'r') as infile:
        text_analysis = [infile.read()]
    #I need to arrange the words csv in the same order as the word sentence. 
    # [create 2 arrays with indexes? I'm not sure the best way to do this]???
    print(text_analysis, text_analysis[0], 'txt analysis + text analysis [0]')
    #read warning?
    ordered_list = re.sub("[^\w]", " ",  text_analysis[0].lower()).split()
    print(ordered_list, 'ordered_list')
    #right now the wordList is the original text broke into an array with each word as in index []
    #maybe i should map it out ?? in the correct order?
    #sorting lists by index? 
    
    
    #use pandas to read the csv
    df = pd.read_csv('words.csv')
    scored_list = df.values.tolist()
    print(scored_list, 'list')

        # printing original list 
    print ("The original list is : " + str(scored_list)) 
    
    # printing sort order list 
    print ("The sort order list is : " + str(ordered_list)) 
    
    # using list comprehension 
    # to sort according to other list  
    res = [tuple for x in ordered_list for tuple in scored_list if tuple[0] == x] 
    
    # printing result 
    print ("The sorted list is : " + str(res)) 

    return jsonify(res)
    


# #defining the get route each word in the correct order and their score 
# @app.route('/sorted_words', methods = ['GET'])

# #route handler function 
# def return_sorted_words ():

    




#defining the get route for the ngrams and each of their score 
@app.route('/ngrams', methods = ['GET'])

#route handler function 
def return_ngrams ():
    #use pandas to read the csv
    df = pd.read_csv('ngram.csv')
    dict = df.to_dict(orient='list')
    print(dict)
    return jsonify(dict)
    


if __name__ == '__main__':
    app.run(debug = True, port=5000) 



# TO DO add the twitter api component 
# api = twitter.Api(consumer_key=[consumer key],
#                   consumer_secret=[consumer secret],
#                   access_token_key=[access token],
#                   access_token_secret=[access token secret])

#defining the twitter route 
# @app.route('/twitter', methods = ['GET', 'POST'])
#route handler function
# def get_tweets():