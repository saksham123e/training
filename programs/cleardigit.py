def clearDigits(s):
    stack = []
    for char in s:

        if '0' <= char <= '9':
            if stack:
                stack.pop() 
        else:
            stack.append(char) 
            
    return "".join(stack)

print(clearDigits("abc3"))
print(clearDigits("cb34"))