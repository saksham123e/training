number = [2,3,4,5,7,8,9,10,14,15,16]
largest = number[0]
slargest = number[0]
for num in number:
    if num > largest:
        slargest = largest
        largest = num
    elif num< largest and num> slargest:
        slargest = num
    
print("second largest", slargest)