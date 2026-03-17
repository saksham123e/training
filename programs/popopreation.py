stack = [10, 20, 30]

def pop():
    if len(stack) == 0:
        return "Stack is empty"
    return stack.pop()

print(pop()) 
print(stack)