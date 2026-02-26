n = int(input("enter your number"))
temp = n
power = len(str(n))
sum = 0
while temp > 0:
    digit = temp % 10
    sum = sum + digit ** power
    temp = temp // 10

if sum == n:
    print("n is armstrong:", n)

else:
    print("n is not armstrong:", n)