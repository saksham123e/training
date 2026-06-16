arr = [1,2,3,4,5,6,7,8]


for i in range(len(arr) - 1):
    if arr[i] > arr[i+1]:
        print("Not Sorted", arr)
        break
else:
    print("Sorted", arr)