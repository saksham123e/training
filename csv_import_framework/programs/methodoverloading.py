class Math:

    def add(self, a, b=0, c=0):
        print(a + b + c)


m = Math()

m.add(5)        # 1 number
m.add(5, 10)    # 2 numbers
m.add(5, 10, 15) # 3 numbers