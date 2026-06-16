arr = [1,3,5,6]
target = 4

left = 0
right = len(arr) - 1

while left <= right:
    mid = (left + right) // 2

    if arr[mid] == target:
        print(mid)
        break

    elif arr[mid] < target:
        left = mid + 1

    else:
        right = mid - 1

else:
    print(left)