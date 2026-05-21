arr = [10, 5, 20, 8, 15]
max = 0
max2 = 0
for num in arr:
    if num > max and num > max2:
        max2 = max
        max = num
    elif num >max2 and num != max:
        max2 = num
print("The second largest number is:", max2)