arr = [2, 5, 7, 9, 12, 15]
target = 9

low = 0
high = len(arr) - 1

while low <= high:
    mid = (low + high) // 2
    
    if arr[mid] == target:
        print("Element found at index", mid)
        break
    
    elif arr[mid] < target:
        low = mid + 1
    
    else:
        high = mid - 1

else:
    print("Element not found")