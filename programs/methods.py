class Student:

    def __init__(self, name):
        self.name = name

    def show(self):
        print("student name is", self.name)

s1=Student("saksham")
s1.show()