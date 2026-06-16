def sod(n):
    if(n == 0):
        return 0
    return (n % 10) + sod(n // 10)

n = int(input("enter your number"))

print(sod(n))