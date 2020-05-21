import tensorflow as tf
from tensorflow import keras
import tensorflow_text as text

from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

import numpy as np
import pandas as pd
import csv, json 

from sklearn.feature_extraction.text import CountVectorizer


#reconstruct the model 
my_model = keras.models.load_model('1589836470.h5')

#open the text file 
with open ('text.txt', 'r') as infile:
    text_analysis = [infile.read()] 

print(text_analysis) 

#Use scikit learn to create the ngrams 
vectorizer = CountVectorizer(analyzer='word', ngram_range=(3, 3))
X = vectorizer.fit_transform(text_analysis)
ngrams = vectorizer.get_feature_names()
print(ngrams)
print(X.toarray())

#Tokenize the dataset, including padding and OOV
vocab_size = 1000
embedding_dim = 16
max_length = 100
trunc_type='post'
padding_type='post'
oov_tok = "<OOV>"

tokenizer = Tokenizer(num_words = vocab_size, oov_token=oov_tok)
tokenizer.fit_on_texts(ngrams)
word_index = tokenizer.word_index

sample_sequences = tokenizer.texts_to_sequences(ngrams)
print(sample_sequences)
sample_ngram = pad_sequences(sample_sequences, padding=padding_type, maxlen=max_length, truncating=trunc_type)           

print('\nHOT OFF THE PRESS! HERE ARE SOME NEWLY MINTED, ABSOLUTELY GENUINE REVIEWS!\n')              

classes = my_model.predict(sample_ngram)

#creates an empty array for the data
data = []
#loops through the ngrams and creates a score for the sentiment of each 
for x in range(len(ngrams)):
    data.append(ngrams[x])
    data.append(classes[x])
    print(data)

# front end read - closer to 1 - positive
#closer to O - negative
#.4-.6 neutral 

#write the classes + anaylsis for ngrams in csv or text to send to front end
with open ('ngram.csv', mode='w') as csv_file:
    ngram_writer = csv.writer(csv_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    ngram_writer.writerow(data)


#writes the ngrams to the text file
with open ('ngram.txt', 'w') as outfile:
    outfile.write(str(data))



    # for x in range(len(ngrams)):  
    #     ngram_writer.writerow([ngrams[x]])
    #     ngram_writer.writerow(classes[x])




