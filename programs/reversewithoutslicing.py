arr = [1,2,3,4,5,6]

start = 0
last = len(arr)-1

while start < last:
    arr[start], arr[last] = arr[last], arr[start]
    start += 1
    last -= 1

print(arr)
