arr = []

n = int(input("enter your number"))

for i in range(n):
    num = int(input("enter your number"))
    arr.append(num)
print(arr)

for i in range(n):
    for j in range(0, n-i-1):
        if arr[j] > arr[j+1]:
            arr[j], arr[j+1] = arr[j+1], arr[j]

print(arr)