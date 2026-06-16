def ntoone(n):
    if n == 0:
        return
    print(n)
    ntoone(n-1)

n = int(input("Enter your number: "))
ntoone(n)