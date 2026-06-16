arr = [1,2,4,5,7,8,9]

target = 111

low = 0
high = len(arr)-1

while low <= high:
    mid = (low + high) // 2

    if arr[mid] == target:
        print("answer available on index:->", mid)
        break

    elif arr[mid] < target:
        low = mid + 1

    else:
        high = mid - 1

else:
    print(-1)