from flask import Flask, request, jsonify
from flask_cors import CORS
import json, csv, re
import pandas as pd
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import sklearn
from sklearn.feature_extraction.text import CountVectorizer
from api.vader import run_vader
import tweepy
# import config
import api.credentials as credential


# import twitter [to be added for when i implement the twitter functions]

app = Flask(__name__)
CORS(app)
vader = SentimentIntensityAnalyzer()

# defining the post route for the text submitted by the user
@app.route('/home/pos', methods=['GET'])
# route handler function
def get_pos_examples():
    # use pandas to read the csv
    df = pd.read_csv('sample_text_1.csv')
    df['scores'] = df['ngrams'].apply(lambda
    ngrams: vader.polarity_scores(ngrams))
    df = df.to_dict(orient='list')
    return jsonify(df)


# defining the post route for the text submitted by the user 
@app.route('/home/neg', methods = ['GET'])

#route handler function 
def get_neg_examples (): 

    new_words={
        'thugs': -3.4,
        'hoodlums': -3.4,
        'looters': -3.4,
        'arsonists': -2.9,
        'kindest': 3.0
    }
    vader.lexicon.update(new_words)


   #use pandas to read the csv
    df = pd.read_csv('sample_text_2.csv')
    df['scores'] = df['ngrams'].apply(lambda ngrams: vader.polarity_scores(ngrams))
    df = df.to_dict(orient='list')
    return jsonify(df)
    

#defining the get route for each word and each of their score 
@app.route('/home/pos/words', methods = ['GET'])

#route handler function 
def return_pos_words ():
    #adds total word column to the csv
    df = pd.read_csv('words_sample_1.csv')

    #open the text file 
    with open ('sample_text_1.txt', 'r') as infile:
        text_analysis = [infile.read()]

        print(text_analysis, text_analysis[0], 'txt analysis + text analysis [0]')
        #read warning 
        ordered_list = re.sub(r"[^\w]", " ",  text_analysis[0].lower()).split()
        print(ordered_list, 'ordered_list')

        #use pandas to read the csv
        df = pd.read_csv('words_sample_1.csv')
        df['scores'] = df['ngrams'].apply(lambda ngrams: vader.polarity_scores(ngrams))

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

#defining the get route for each word and each of their score 
@app.route('/home/neg/words', methods = ['GET'])
#route handler function 
def return_neg_words ():
    #adds total word column to the csv
    df = pd.read_csv('words_sample_2.csv')

    new_words = {
        'thugs': -3.4,
        'hoodlums': -3.4,
        'looters': -3.4,
        'arsonists': -2.9,
        'kindest': 3.0
    }
    vader.lexicon.update(new_words)


    #open the text file 
    with open ('sample_text_2.txt', 'r') as infile:
        text_analysis = [infile.read()]

        print(text_analysis, text_analysis[0], 'txt analysis + text analysis [0]')
        #read warning 
        ordered_list = re.sub(r"[^\w]", " ",  text_analysis[0].lower()).split()
        print(ordered_list, 'ordered_list')

        #use pandas to read the csv
        df = pd.read_csv('words_sample_2.csv')
        df['scores'] = df['ngrams'].apply(lambda ngrams: vader.polarity_scores(ngrams))

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
        

    
#defining the post route for the text submitted by the user 
@app.route('/text', methods = ['POST'])

#route handler function 
def anaylze_text (): 
    text_data = request.get_json()

    #writes data to text file sentiment analysis
    with open ('text.txt', 'w') as outfile:
        json.dump(text_data['text'], outfile)
        return text_data

    print(text_data, 'text data from post request')

#defining the get route for each word and each of their score 
@app.route('/words', methods = ['GET'])

#route handler function 
def return_words ():
        #open the text file 
        with open ('text.txt', 'r') as infile:
            text_analysis = [infile.read()]
            print(text_analysis[0], 'text  - in the return words fnc')

        vectorizer = CountVectorizer(analyzer='word', ngram_range=(1, 4), token_pattern=r'\b\w+\b', min_df=1, stop_words=None)
        X = vectorizer.fit_transform(text_analysis)
        ngrams = vectorizer.get_feature_names()
        print(X.toarray(), 'x to array')
    
        #write ngrams to csv
        with open ('ngram_vader.csv', mode='w', newline='') as csv_file:
            fieldnames = ['ngrams']
            ngram_writer = csv.DictWriter(csv_file, delimiter=',', fieldnames=fieldnames)
            ngram_writer.writeheader()

            for ngram in ngrams:
            
                ngram_writer.writerow({'ngrams': ngram})  

        #adds total word column to the csv
        df = pd.read_csv('ngram_vader.csv')
        df['total_words'] = [len(x.split()) for x in df['ngrams'].tolist()]
        #sorts values by total words 
        df = df.sort_values(by=['total_words'])
        #writes the sorted column to the ngram.csv
        df = df.to_csv(r'ngram_vader.csv', index = False, header=True)

        #create a new csv with the singular words and scores only - 
        df = pd.read_csv('ngram_vader.csv')
        df = df.loc[df['total_words'] == 1]
        df = df.to_csv(r'words.csv', index = False, header=True)

        #order the list
        ordered_list = re.sub(r"[^\w]", " ",  text_analysis[0].lower()).split()
        # print(ordered_list, 'ordered_list')

        #use pandas to read the csv
        df = pd.read_csv('words.csv')
        df['scores'] = df['ngrams'].apply(lambda ngrams: vader.polarity_scores(ngrams))

        scored_list = df.values.tolist()
        # print(scored_list, 'list')

        # # printing original list 
        # print ("The original list is : " + str(scored_list)) 
                    
        # # printing sort order list 
        # print ("The sort order list is : " + str(ordered_list)) 
                    
        # using list comprehension 
        # to sort according to other list  
        res = [tuple for x in ordered_list for tuple in scored_list if tuple[0] == x] 
                    
        # printing result 
        print ("The sorted list is : " + str(res)) 

        return jsonify(res)
                


#defining the get route for the ngrams and each of their score 
@app.route('/ngrams', methods = ['GET'])

#route handler function 
def return_ngrams ():
    #use pandas to read the csv
    df = pd.read_csv('ngram_vader.csv', engine='python')
    # # I need to remove those double quotes 
    df['scores'] = df['ngrams'].apply(lambda ngrams: vader.polarity_scores(ngrams))
    # # df['score'] = df['score'].str.strip('"')
    df = df.to_dict(orient='list')
    print(df)
    return jsonify(df)
    


@app.route('/twitter', methods = ['GET', 'POST'])
#route handling
def return_tweets():
    query = request.get_json()
    # Authenticate to Twitter
    auth = tweepy.AppAuthHandler(credential.api_key, credential.api_secret)
    api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)
    tweets = tweepy.Cursor(api.search, lang='en', q=query).items(10)
    t = []

    for tweet in tweets:
        t.append({'text': tweet.text,'profile_pic': tweet.user.profile_image_url,'user_screen_name': tweet.user.screen_name,'created_at': tweet.created_at})    
    
    return jsonify({'tweets': t})
        
 

if __name__ == '__main__':
    app.run(debug = True, port=5000) 
