def greatest():
    num1 = int(input("enter your number1:"))
    num2 = int(input("enter your number2:"))
    num3 = int(input("enter your number3:"))
    
    if num1 > num2 and num1 >num3:
        return num1
    elif num2 > num1 and num2 >num3:
        return num2
    elif num3 > num1 and num3 > num2:
        return num3
    
print(greatest())