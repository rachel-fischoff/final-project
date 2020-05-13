from nltk.corpus import twitter_samples
from nltk.tag import pos_tag
from nltk.stem.wordnet import WordNetLemmatizer
import re, string, random 
from nltk.corpus import stopwords
from nltk import FreqDist, classify, NaiveBayesClassifier
from nltk.tokenize import word_tokenize
from nltk.util import ngrams, bigrams, trigrams
import json
import pickle


# import pymongo
# import pandas as pd
# from pymongo import MongoClient
# import pprint


# client = MongoClient()
# db = client.twitter
# collection = db.tweets
# data = pd.DataFrame(list(collection.find()))


#recongizes these phrase and decides if it's positive/negative 
#trigram 
#classifier that does pos/neg output and pass in the ngrams and get a pos/neg
#find some data source and train the model to get an answer 
#pull from twitter 


#train the model 
#classify the model 
#machine learning part of it 
#take a tweet
#score it and negative on the ngrams 
#look at the tweet , favorite + retweet count 
#each ngram positive / negative 


#tokenizing the data 
positive_tweets = twitter_samples.strings('positive_tweets.json')
negative_tweets = twitter_samples.strings('negative_tweets.json')
text = twitter_samples.strings('tweets.20150430-223406.json')
tweet_tokens = twitter_samples.tokenized('positive_tweets.json')[0]
# if __name__ == "__main__":

#lemmentizing the data [a form of normalizing]
def lemmatize_sentence(tokens):
    lemmatizer = WordNetLemmatizer()
    lemmatized_sentence = []
    for word, tag in pos_tag(tokens):
        if tag.startswith('NN'):
            pos = 'n'
        elif tag.startswith('VB'):
            pos = 'v'
        else:
            pos = 'a'
        lemmatized_sentence.append(lemmatizer.lemmatize(word, pos))
    return lemmatized_sentence

# print(lemmatize_sentence(tweet_tokens[0]))

#removing the noise [hyperlinks, twitter@ replies and puncatation/special characters]
def remove_noise(tweet_tokens, stop_words = ()):

    cleaned_tokens = []

    for token, tag in pos_tag(tweet_tokens):
        token = re.sub('http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+#]|[!*\(\),]|'\
                       '(?:%[0-9a-fA-F][0-9a-fA-F]))+','', token)
        token = re.sub("(@[A-Za-z0-9_]+)","", token)

        if tag.startswith("NN"):
            pos = 'n'
        elif tag.startswith('VB'):
            pos = 'v'
        else:
            pos = 'a'

        lemmatizer = WordNetLemmatizer()
        token = lemmatizer.lemmatize(token, pos)

        if len(token) > 0 and token not in string.punctuation and token.lower() not in stop_words:
            cleaned_tokens.append(token.lower())
    return cleaned_tokens

# print(pos_tag(tweet_tokens[0]))

stop_words = stopwords.words('english')

# print(remove_noise(tweet_tokens[0], stop_words))

positive_tweet_tokens = twitter_samples.tokenized('positive_tweets.json')
negative_tweet_tokens = twitter_samples.tokenized('negative_tweets.json')

positive_cleaned_tokens_list = []
negative_cleaned_tokens_list = []

for tokens in positive_tweet_tokens:
    positive_cleaned_tokens_list.append(remove_noise(tokens, stop_words))

for tokens in negative_tweet_tokens:
    negative_cleaned_tokens_list.append(remove_noise(tokens, stop_words))

# print(positive_tweet_tokens[500])
# print(positive_cleaned_tokens_list[500])

#determining word density 
def get_all_words(cleaned_tokens_list):
    for tokens in cleaned_tokens_list:
        for token in tokens:
            yield token

all_pos_words = get_all_words(positive_cleaned_tokens_list)

#converting tokens to a dictionary
def get_tweets_for_model(cleaned_tokens_list):
    for tweet_tokens in cleaned_tokens_list:
        yield dict([token, True] for token in tweet_tokens)

positive_tokens_for_model = get_tweets_for_model(positive_cleaned_tokens_list)
negative_tokens_for_model = get_tweets_for_model(negative_cleaned_tokens_list)

#Splitting the Dataset for Training and Testing the Model [NaiveBayesClassifier class]
#adds positive or negative label to each tweet 
positive_dataset = [(tweet_dict, "Positive")
                     for tweet_dict in positive_tokens_for_model]

negative_dataset = [(tweet_dict, "Negative")
                     for tweet_dict in negative_tokens_for_model]

dataset = positive_dataset + negative_dataset

#to avoid bias
random.shuffle(dataset)
#70 for training the model and 30 for testing 
train_data = dataset[:7000]
test_data = dataset[7000:]

#use the NaiveBayesClassifier to build a model 
classifier = NaiveBayesClassifier.train(train_data)

# print("Accuracy is:", classify.accuracy(classifier, test_data))

# print(classifier.show_most_informative_features(10))

#how the model performs on random tweets

# custom_tweet = "I ordered just once from TerribleCo, they screwed up, never used the app again."

with open ('text.txt', 'r') as infile:
    text_data = infile.read()
    print (infile.read())

print(text_data)



custom_tweet = text_data
print(custom_tweet)


custom_tokens = remove_noise(word_tokenize(custom_tweet))

unigrams = custom_tweet.split()
print (unigrams) 
bi = bigrams(unigrams)
print(list(bi))
tri = trigrams(unigrams)
trilist = (list(tri))
print(trilist)

sentiment = classifier.classify(dict([token, True] for token in custom_tokens))
print(sentiment)


#writes the ngrams to the text file
with open ('text.txt', 'w') as outfile:
    outfile.write(str(trilist))
    outfile.write(str(sentiment))



#train the model on people's reaction
#n grams on the tweet -- look for the same n grams as negative or postitive - otherwise it's neutral 
#certain parts of the phrases on are more positive or negative 
# train the model on people's reactions -- likes, favorites, retweets, comments 
# if you can find data dump of group of tweets from the past - with likes - comments -- 
# retweets -- threshhold of a ratio 20% of the likes v comments -- hypothesis -- negative reaction 
# work with any corpus of tweets of do that 
# HERO - results of my machine learning 
### fallback plan - screenshot - back up plan - use textblob - use a sentiment analysis library 
#END OF DAY! can i make a machine learning work - train a model based on pos/neg/neutral 
# n grams of word any corpus - break it any ngrams #nytimes #guardian 



