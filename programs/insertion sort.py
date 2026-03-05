arr = [7, 3, 9, 1, 5]

n = len(arr)

for i in range(1, n):
    key = arr[i]
    j = i - 1

    while j >= 0 and arr[j] > key:
        arr[j+1] = arr[j]
        j -= 1

    arr[j+1] = key

print("Sorted array:", arr)