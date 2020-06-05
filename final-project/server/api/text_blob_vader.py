import nltk
nltk.download('vader_lexicon')
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from sklearn.feature_extraction.text import CountVectorizer
import csv
import pandas as pd

def run_vader():
    vader = SentimentIntensityAnalyzer ()

    #open the text file 
    with open ('text.txt', 'r') as infile:
        text_analysis = [infile.read()]

    print(vader.polarity_scores(text_analysis[0]))

    #Use scikit learn to create the ngrams 
    vectorizer = CountVectorizer(analyzer='word', ngram_range=(1, 3), token_pattern=r'\b\w+\b', min_df=1)
    X = vectorizer.fit_transform(text_analysis)
    ngrams = vectorizer.get_feature_names()
    print(ngrams, 'ngrams')


    # ngrams_vader = []
    # for ngram in ngrams: 
    #     score = vader.polarity_scores(ngram)
    #     ngrams_vader.append({'ngram': ngram, 'score':score})
    #     print(ngrams_vader, 'array')
    #     return ngrams_vader

    # df['scores'] = df['ngram'].apply(lambda ngram: vader.polarity_scores(ngram))
    # df['compound']  = df['scores'].apply(lambda score_dict: score_dict['compound'])
    # df['comp_score'] = df['compound'].apply(lambda c: 'pos' if c >=0 else 'neg')
    # df = df.to_dict(orient='list')
        
    
    #write the classes + anaylsis for ngrams in csv or text to send to front end
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
    

if __name__ == "__main__":
   run_vader()

       
    

