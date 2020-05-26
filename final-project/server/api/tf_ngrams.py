import tensorflow as tf
from tensorflow import keras
import tensorflow_text as text

from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

import numpy as np
import pandas as pd
import csv, json 

from sklearn.feature_extraction.text import CountVectorizer

def run_ngrams():
    #reconstruct the model 
    my_model = keras.models.load_model('1589836470.h5')

    #open the text file 
    with open ('text.txt', 'r') as infile:
        text_analysis = [infile.read()] 

    #Use scikit learn to create the ngrams 
    vectorizer = CountVectorizer(analyzer='word', ngram_range=(3, 3))
    X = vectorizer.fit_transform(text_analysis)
    ngrams = vectorizer.get_feature_names()
    print(ngrams, 'ngrams')
    print(X.toarray(), 'x to array')

    vectorizer2 = CountVectorizer(analyzer='word')
    X2 = vectorizer2.fit_transform(text_analysis)
    words = vectorizer2.get_feature_names()
    print(words, 'words')
    print(X2.toarray(), 'x to array')

    #Tokenize the dataset, including padding and OOV
    vocab_size = 1500
    embedding_dim = 16
    max_length = 100
    trunc_type='post'
    padding_type='post'
    oov_tok = "<OOV>"

    tokenizer = Tokenizer(num_words = vocab_size, oov_token=oov_tok)
    tokenizer.fit_on_texts(ngrams)
    tokenizer.fit_on_texts(text_analysis)

    # Examine the word index
    word_index = tokenizer.word_index
    print(word_index, 'word index')

    ngrams_sequences = tokenizer.texts_to_sequences(ngrams)
    sentence_sequences = tokenizer.texts_to_sequences(words)
    print(sentence_sequences, 'sentence - sequences')
    print(ngrams_sequences, 'ngram - sequences')

    sequenced_ngrams = pad_sequences(ngrams_sequences, padding=padding_type, maxlen=max_length, truncating=trunc_type)                    
    sequenced_sentence = pad_sequences(sentence_sequences, padding=padding_type, maxlen=max_length, truncating=trunc_type) 
  

    #transform sentence to words
    # print(sequenced_sentence, 'sentence - sequenced and padded')   
    # for x in len(sequenced_sentence):
    #     print(sentence_sequences[x], 'prints each word?')


    # print(sequenced_ngrams, 'ngrams sequenced and padded')

    classes = my_model.predict(sequenced_ngrams)
    predicted_words = my_model.predict(sequenced_sentence)
    print (predicted_words)

    #write the classes + anaylsis for ngrams in csv or text to send to front end
    with open ('ngram.csv', mode='w', newline='') as csv_file:
        fieldnames = ['ngram', 'score']
        ngram_writer = csv.DictWriter(csv_file, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL, fieldnames=fieldnames)
        ngram_writer.writeheader()

        for x in range(len(ngrams)):
        
            ngram_writer.writerow({'ngram': ngrams[x], 'score': float(classes[x])})

        
    with open ('sentence.csv', mode='w', newline='') as csv_file:
        fieldnames = ['word', 'score']
        writer = csv.DictWriter(csv_file, delimiter=',', quotechar='|', quoting=csv.QUOTE_MINIMAL, fieldnames=fieldnames)
        writer.writeheader()

        for x in range(len(words)):

            writer.writerow({'word': words[x], 'score': float(predicted_words[x])})


if __name__ == "__main__":
   run_ngrams()



            


