class node:
    def __init__(self,data):
        self.data = data
        self.next = None

node1 = node(10)
node2 = node(20)
node3 = node(30)

node1.next = node2
node2.next = node3
node3.next = node2   

head = node1

slow = head
fast = head

while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
    
    if slow == fast:
        print("Cycle detected")
        break
else:
    print("No cycle")