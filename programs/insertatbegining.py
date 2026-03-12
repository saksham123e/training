class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

def insert_at_head(head, data):
    new_node = Node(data)
    new_node.next = head
    head = new_node
    return head

def print_ll(head):
    current = head
    while current:
        print(current.data, end=" -> ")
        current = current.next
    print("None")

node1 = Node(10)
node2 = Node(20)
node3 = Node(30)

node1.next = node2
node2.next = node3
head = node1


head = insert_at_head(head, 5)

print_ll(head)