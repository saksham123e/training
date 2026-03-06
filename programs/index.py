arr = [2, 5, 7, 9, 12, 15]
target = 12

left = 0
right = len(arr) - 1

while left <= right:
    mid = (left + right) // 2

    if arr[mid] == target:
        print("Index =", mid)
        break
    elif arr[mid] < target:
        left = mid + 1
    else:
        right = mid - 1