arr = [2,4,6,1,23,24,14,15]

largest = arr[0]

for i in arr:
    if i > largest:
        largest = i
    
print(largest)