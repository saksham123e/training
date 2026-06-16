class BankAccount:

    def __init__(self, balance):
        self.balance = balance

    def deposit(self, amount):
        self.balance = self.balance + amount

    def show_balance(self):
        print("Balance is", self.balance)


acc1 = BankAccount(1000)

acc1.deposit(500)
acc1.show_balance()