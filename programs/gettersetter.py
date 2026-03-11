class Employee:

    def __init__(self):
        self.__salary = 0

    def set_salary(self, amount):
        self.__salary = amount

    def get_salary(self):
        return self.__salary


e1 = Employee()

e1.set_salary(50000)
print(e1.get_salary())