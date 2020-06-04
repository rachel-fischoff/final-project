import nltk
nltk.download('vader_lexicon')
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from sklearn.feature_extraction.text import CountVectorizer

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

for ngram in ngrams:
    print(vader.polarity_scores(ngram))
    

