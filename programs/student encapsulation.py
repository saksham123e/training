class Student:

    def __init__(self, marks):
        self.__marks = marks   # private variable

    def get_marks(self):
        print("Marks:", self.__marks)


s1 = Student(90)
s1.get_marks()