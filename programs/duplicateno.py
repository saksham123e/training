arr = [1,2,2,4,5,6]
narr = []
for num in arr:
    if num not in narr:
        narr.append(num)

print(narr)