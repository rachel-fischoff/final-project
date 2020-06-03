import tensorflow as tf
from tensorflow import keras
import tensorflow_text as text

from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

import numpy as np
import pandas as pd
import csv, json, re 

from sklearn.feature_extraction.text import CountVectorizer

def run_ngrams():
    #reconstruct the model 
    my_model = keras.models.load_model('1590602466.h5')

    #open the text file 
    with open ('text.txt', 'r') as infile:
        text_analysis = [infile.read()]
    

    #Use scikit learn to create the ngrams 
    vectorizer = CountVectorizer(analyzer='word', ngram_range=(1, 3), token_pattern=r'\b\w+\b', min_df=1)
    X = vectorizer.fit_transform(text_analysis)
    ngrams = vectorizer.get_feature_names()
    print(ngrams, 'ngrams')
    print(X.toarray(), 'x to array')

    #Tokenize the dataset, including padding and OOV
    vocab_size = 1500
    embedding_dim = 16
    max_length = 100
    trunc_type='post'
    padding_type='post'
    oov_tok = "<OOV>"

    tokenizer = Tokenizer(num_words = vocab_size, oov_token=oov_tok)
    tokenizer.fit_on_texts(ngrams)

    # Examine the word index
    word_index = tokenizer.word_index
    print(word_index, 'word index')

    ngrams_sequences = tokenizer.texts_to_sequences(ngrams)
    print(ngrams_sequences, 'ngram - sequences')

    sequenced_ngrams = pad_sequences(ngrams_sequences, padding=padding_type, maxlen=max_length, truncating=trunc_type)                    
   
    classes = my_model.predict(sequenced_ngrams)


    #write the classes + anaylsis for ngrams in csv or text to send to front end
    with open ('ngram.csv', mode='w', newline='') as csv_file:
        fieldnames = ['ngram', 'score']
        ngram_writer = csv.DictWriter(csv_file, delimiter=',', fieldnames=fieldnames)
        ngram_writer.writeheader()

        for x in range(len(ngrams)):
        
            ngram_writer.writerow({'ngram': ngrams[x], 'score': float(classes[x])})

    #returns a csv that is alphabetized  

    #adds total word column to the csv
    df = pd.read_csv('ngram.csv')
    df['totalwords'] = [len(x.split()) for x in df['ngram'].tolist()]
    #sorts values by total words 
    df = df.sort_values(by=['totalwords'])
    #writes the sorted column to the ngram.csv
    df = df.to_csv(r'ngram.csv', index = False, header=True)

    #create a new csv with the singular words and scores only - 
    df = pd.read_csv('ngram.csv')
    df = df.loc[df['totalwords'] == 1]
    df = df.to_csv(r'words.csv', index = False, header=True)

    # #I need to arrange the words csv in the same order as the word sentence. 
    # # [create 2 arrays with indexes? I'm not sure the best way to do this]???
    # print(text_analysis, text_analysis[0], 'txt analysis + text analysis [0]')
    # #read warning?
    # ordered_list = re.sub("[^\w]", " ",  text_analysis[0].lower()).split()
    # print(ordered_list, 'ordered_list')
    # #right now the wordList is the original text broke into an array with each word as in index []
    # #maybe i should map it out ?? in the correct order?
    # #sorting lists by index? 
    
    
    # #use pandas to read the csv
    # df = pd.read_csv('words.csv')
    # scored_list = df.values.tolist()
    # print(scored_list, 'list')



    #     # printing original list 
    # print ("The original list is : " + str(scored_list)) 
    
    # # printing sort order list 
    # print ("The sort order list is : " + str(ordered_list)) 
    
    # # using list comprehension 
    # # to sort according to other list  
    # res = [tuple for x in ordered_list for tuple in scored_list if tuple[0] == x] 
    
    # # printing result 
    # print ("The sorted list is : " + str(res)) 

    #     # Python code to demonstrate 
    # # to sort according to other list 
    # # using sort() + lambda + index() 



    # # printing original list 
    # print ("The original list is : " + str(scored_list)) 

    # # printing sort order list 
    # print ("The sort order list is : " + str(ordered_list)) 

    # # using sort() + lambda + index() 
    # # to sort according to other list 
    # # test_list.sort(key = lambda(i, j): sort_order.index(i)) # works in python 2 
    # scored_list.sort(key = lambda i: ordered_list.index(i[0])) # works in python 3 

    # # printing result 
    # print ("The sorted list is : " + str(scored_list)) 



    

    
if __name__ == "__main__":
   run_ngrams()



            


