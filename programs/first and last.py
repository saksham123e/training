num = int(input("Enter a number: "))

last_digit = num % 10

while num >= 10:
    num = num // 10

first_digit = num

print("First Digit:", first_digit)
print("Last Digit:", last_digit)