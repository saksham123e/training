class BankAccount:

    def __init__(self, balance):
        self.__balance = balance

    def show_balance(self):
        print("Balance:", self.__balance)


b1 = BankAccount(5000)

b1.show_balance()   