stack = [10, 20, 30]

def peak():
    if len(stack) == 0:
        return "Stack is empty"
    return stack[-1]

print(peak())