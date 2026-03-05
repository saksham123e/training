arr = [1,2,3,4,5]

n = len(arr)

for i in range(n):
    swapped = False
    
    for j in range(n-i-1):
        if arr[j] > arr[j+1]:
            arr[j], arr[j+1] = arr[j+1], arr[j]
            swapped = True
    
    if swapped == False:
        print("Array already sorted")
        break

print(arr)