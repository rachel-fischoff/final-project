import tensorflow as tf
import tensorflow_text as text

from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

import numpy as np
import pandas as pd
import time
import csv

path = tf.keras.utils.get_file('reviews.csv', 
                               'https://drive.google.com/uc?id=13ySLC_ue6Umt9RJYSeM2t-V0kCv-4C-P')
print (path)

# Read the csv file
dataset = pd.read_csv(path)


sentences = dataset['text'].tolist()
labels = dataset['sentiment'].tolist()

# Separate out the sentences and labels into training and test sets
training_size = int(len(sentences) * 0.8)

training_sentences = sentences[0:training_size]
testing_sentences = sentences[training_size:]
training_labels = labels[0:training_size]
testing_labels = labels[training_size:]

# Make labels into numpy arrays for use with the network later
training_labels_final = np.array(training_labels)
testing_labels_final = np.array(testing_labels)

#Tokenize the dataset
#Tokenize the dataset, including padding and OOV

vocab_size = 1000
embedding_dim = 16
max_length = 100
trunc_type='post'
padding_type='post'
oov_tok = "<OOV>"

tokenizer = Tokenizer(num_words = vocab_size, oov_token=oov_tok)
tokenizer.fit_on_texts(training_sentences)
word_index = tokenizer.word_index
sequences = tokenizer.texts_to_sequences(training_sentences)
padded = pad_sequences(sequences,maxlen=max_length, padding=padding_type, 
                       truncating=trunc_type)

testing_sequences = tokenizer.texts_to_sequences(testing_sentences)
testing_padded = pad_sequences(testing_sequences,maxlen=max_length, 
                               padding=padding_type, truncating=trunc_type)

#Review a sequence 
reverse_word_index = dict([(value, key) for (key, value) in word_index.items()])

def decode_review(text):
    return ' '.join([reverse_word_index.get(i, '?') for i in text])

print(decode_review(padded[1]))
print(training_sentences[1])

# Build a basic sentiment network
# Note the embedding layer is first, 
# and the output is only 1 node as it is either 0 or 1 (negative or positive)
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(vocab_size, embedding_dim, input_length=max_length),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(6, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])
model.compile(loss='binary_crossentropy',optimizer='adam',metrics=['accuracy'])
model.summary()

num_epochs = 10
model.fit(padded, training_labels_final, epochs=num_epochs, validation_data=(testing_padded, testing_labels_final))


# #save as keras .h5 model 
t = time.time()

export_path_keras = "./{}.h5".format(int(t))
print(export_path_keras)

model.save(export_path_keras)


# # Use the model to predict a review  

# #open the text file 
# with open ('text.txt', 'r') as infile:
#     text_analysis = [infile.read()] 

# print(text_analysis) 

# tokenizer1 = text.WhitespaceTokenizer()
# tokens = tokenizer1.tokenize([text_analysis])

# # Ngrams, in this case bi-gram (n = 2)
# trigrams = text.ngrams(tokens, 3, reduction_type=text.Reduction.STRING_JOIN)
# ngrams_to_analyze = (trigrams.to_list())
# #prints ragged tensor 
# print(trigrams)
# #prints list 
# print(ngrams_to_analyze)

# #writes the ngrams to the text file
# with open ('ngram.txt', 'w') as outfile:
#     file_data = outfile.write(str(ngrams_to_analyze))
#     #prints 112 
#     print (file_data)

# #open the text file 
# with open ('ngram.txt', 'r') as infile:
#     ngram_analysis = infile.read()
#     print(ngram_analysis)
  

# #Tokenize the dataset
# #Tokenize the dataset, including padding and OOV
# vocab_size = 1000
# embedding_dim = 16
# max_length = 100
# trunc_type='post'
# padding_type='post'
# oov_tok = "<OOV>"

# tokenizer = Tokenizer(num_words = vocab_size, oov_token=oov_tok)
# tokenizer.fit_on_texts(ngram_analysis)
# word_index = tokenizer.word_index

# sample_sequences = tokenizer.texts_to_sequences(ngram_analysis)
# print(sample_sequences)
# fakes_padded = pad_sequences(sample_sequences, padding=padding_type, maxlen=max_length, truncating=trunc_type)           

# print('\nHOT OFF THE PRESS! HERE ARE SOME NEWLY MINTED, ABSOLUTELY GENUINE REVIEWS!\n')              

# classes = model.predict(fakes_padded)

# # The closer the class is to 1, the more positive the review is deemed to be
# for x in range(len(ngram_analysis)):  
#   print(ngram_analysis[x])
#   print(classes[x])
#   print('\n')

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
    

# tf.compat.v1.enable_eager_execution() 
# strings = tf.strings.ngrams([ngram_analysis], 3).numpy()
# print(strings)
