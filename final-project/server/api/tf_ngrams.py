import tensorflow as tf
from tensorflow import keras
import tensorflow_text as text


from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

import numpy as np
import pandas as pd

import nltk
from nltk.tokenize import word_tokenize
from nltk.util import ngrams

from sklearn.feature_extraction.text import CountVectorizer


#reconstruct the model 
my_model = keras.models.load_model('1589836470.h5')

# Use the model to predict sentiment for ngrams  

#open the text file 
with open ('text.txt', 'r') as infile:
    text_analysis = [infile.read()] 

print(text_analysis) 

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

print(ngrams)
print(classes)

# The closer the class is to 1, the more positive the review is deemed to be
for x in range(len(ngrams)):  
  print(ngrams[x])
  print(classes[x])
  print('\n')



# tokenizer1 = text.WhitespaceTokenizer()
# tokens = tokenizer1.tokenize([text_analysis])

# # Ngrams, in this case tri-gram (n = 3)
# trigrams = text.ngrams(tokens, 3, axis=-1, reduction_type=text.Reduction.STRING_JOIN, string_separator=' ')
# #prints a ragged tensor
# print(trigrams)

# ngrams_together = (trigrams.to_list())
# #prints 
# print(ngrams_together)

# ngrams_separated = list(map(lambda x: x, ngrams_together))
# print(ngrams_separated)


# #writes the ngrams to the text file
# with open ('ngram.txt', 'w') as outfile:
#     file_data = outfile.write(str(ngrams_to_analyze))
#     #prints 112 
#     print (file_data)

# #open the text file 
# with open ('ngram.txt', 'r') as infile:
#     ngram_analysis = infile.read()
    
#     print(ngram_analysis)
  
# #todo separate the ngrams 


# ngram = 'Rachel is worried'

# #Tokenize the dataset
# #Tokenize the dataset, including padding and OOV
# vocab_size = 1000
# embedding_dim = 16
# max_length = 100
# trunc_type='post'
# padding_type='post'
# oov_tok = "<OOV>"

# tokenizer = Tokenizer(num_words = vocab_size, oov_token=oov_tok)
# tokenizer.fit_on_texts(ngram)
# word_index = tokenizer.word_index

# sample_sequences = tokenizer.texts_to_sequences(ngram)
# print(sample_sequences)
# sample_ngram = pad_sequences(sample_sequences, padding=padding_type, maxlen=max_length, truncating=trunc_type)           

# print('\nHOT OFF THE PRESS! HERE ARE SOME NEWLY MINTED, ABSOLUTELY GENUINE REVIEWS!\n')              

# classes = my_model.predict(sample_ngram)


# print(ngram)
# print(classes)
# # # The closer the class is to 1, the more positive the review is deemed to be
# # for x in range(len(ngram)):  
# #   print(ngram[x])
# #   print(classes[x])
# #   print('\n')

# #map the function? remove punctionation? other ways to process?

# #write to csv file with columns ?? ngram_anaylsis on 1 & classes on 2. 
# # front end read - closer to 1 - positive
# #closer to O - negative
# #.4-.6 neutral 

# #write the classes + anaylsis for ngrams in csv or text to send to front end
# # with open ('ngram.csv', mode='w') as csv_file:
# #     ngram_writer = csv.writer(csv_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

# #     for x in range(len(ngram_analysis)):  
# #         ngram_writer.writerow([ngram_analysis[x]])
# #         ngram_writer.writerow(classes[x])
    


