number = [2,3,4,5,6,8,9,10,14,15]

largest = number[0]

for num in number:
    if num > largest:
        largest = num

print("largest element is:", largest)