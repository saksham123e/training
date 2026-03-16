class node:
    def __init__(self,data):
        self.data = data
        self.next = None

node1 = node(10)
node2 = node(20)
node3 = node(30)

node1.next = node2
node2.next = node3

head = node1

head = head.next

current = head

while current:
    print(current.data, end=" → ")
    current = current.next

print("None")
