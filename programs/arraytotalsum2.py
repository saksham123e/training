arr = []
n = int(input("enter your number"))

for i in range(n):
    num = int(input("enter your number"))
    arr.append(num)

print(arr)

sum = 0

for num in arr:
    sum=sum+num

print("total sum is:", sum)
