import json

data = ''
#json returned from request
with open('path/to/myfile.txt') as outfile:
    json.dump(data, outfile)


# data= myJsonREturnedFromRequest
# with open('path/to/myfile.txt', 'w') as outfile:
# (indent) json.dump(data, outfile)

# import json
# # then in your notebook
# with open('path/to/myfile.txt', 'w') as infile:
# (indent) data = json.load(infile)

# for item in data['whatever-key']:
# (indent) print("key= " , item['value'])

#function that cleared out the data from the file before you wrote it. 
#connect to a databased for later use 
#data = [] or data = ''
#data = data  - write it to a file 
