def removeOuterParentheses(s):
    res = ""
    stack = []
    for char in s:
        if char == '(':
            if len(stack) > 0:
                res += char
            stack.append(char)
        else: 
            stack.pop()
            if len(stack) > 0:
                res += char
    return res

print(removeOuterParentheses("(()())(())"))