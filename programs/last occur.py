arr = [1,2,4,4,4,5,6,8,9]
target = 4

low = 0
high = len(arr) - 1
result = -1

while low <= high:
    mid =  (low + high) // 2

    if arr[mid] == target:
        result = mid
        low = mid + 1
    
    elif arr[mid] < target:
        low = mid + 1

    else:
        high = mid - 1

print(result)