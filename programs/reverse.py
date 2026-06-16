n = int(input("enter your number"))
digit = 0
num = 0
while n != 0:
    num = n%10
    digit = num 
    n = n // 10
    print(digit,end="") 
print()