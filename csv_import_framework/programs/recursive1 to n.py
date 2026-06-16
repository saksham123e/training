def oneton(n):
    if n == 0:
        return
    oneton(n-1)
    print(n)

n = int(input("enter your number"))
print(oneton(n))