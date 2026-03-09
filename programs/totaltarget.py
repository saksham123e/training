arr = [1,2,2,2,3,4]
target = 2

low = 0
high = len(arr) - 1
first = -1

while low <= high:
    mid = (low + high) // 2
    
    if arr[mid] == target:
        first = mid
        high = mid - 1
    elif arr[mid] < target:
        low = mid + 1
    else:
        high = mid - 1

low = 0
high = len(arr) - 1
last = -1

while low <= high:
    mid = (low + high) // 2
    
    if arr[mid] == target:
        last = mid
        low = mid + 1
    elif arr[mid] < target:
        low = mid + 1
    else:
        high = mid - 1


count = last - first + 1
print(count)