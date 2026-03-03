arr = [1,2,4,5,6,7,8,9,15,14,23,24]

smallest = arr[0]

for i in arr:
    if i < smallest:
        smallest = i

print("smallest element is:", smallest)