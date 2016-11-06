from os import listdir
from os.path import isfile, join
onlyfiles = [f for f in listdir(".") if isfile(join(".", f))];

json = open('products.json', 'w');
json.write('{\n');
json.write('\t"_comment": "Product infomation for Margues",\n');
json.write('\t"products": [\n');
for f in onlyfiles:
	if (f[-4:] == ".png" or f[-4:] == ".png"):
		json.write('\t\t{\n');
		json.write('\t\t\t"name": "'+ f[:-4] +'",\n');
		json.write('\t\t\t"img": "products/Men/'+ f +'",\n');
		json.write('\t\t\t"description": "Sample description",\n');
		json.write('\t\t\t"price": "$1000",\n');
		json.write('\t\t\t"specialPrice": "$200"\n');
		json.write('\t\t},\n');
json.write('\t]\n');
json.write('}\n');
