d = {"a": 1, "b": 2, "c": 3}

print(d.get("a"))
print(d.get("z"))



print(d.keys()) 



for k in d.keys():
    print(k)



print(d.values())  



print(d.items())  


for k, v in d.items():
    print(k, v)




d.update({"d":4, "a":10})
print(d)




d.update({"d":4, "a":10})
print(d)




d.pop("a")
print(d)




d.clear()
print(d) 




d2 = d.copy()