class Car:

    def __init__(self, brand, color):
        self.brand = brand
        self.color = color

    def start(self):
        print(self.brand, "car started")

    def stop(self):
        print(self.brand, "car stopped")


c1 = Car("BMW", "Black")

c1.start()
c1.stop()