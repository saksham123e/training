arr = [1,3,20,4,1,0]

low = 0
high = len(arr) - 1

while low < high:
    mid = (low + high) // 2

    if arr[mid] < arr[mid + 1]:
        low = mid + 1
    else:
        high = mid

print(arr[low])