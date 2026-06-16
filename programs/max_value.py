class node:
    def __init__(self,data):
        self.data = data
        self.next = None

node1 = node(5)
node2 = node(25)
node3 = node(15)
node4 = node(40)
node5 = node(10)

node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node5

head = node1

current = head
max_val = head.data

while current:
    if current.data > max_val:
        max_val = current.data
    current = current.next

print(max_val)