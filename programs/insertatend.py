class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


def insert_at_end(head, data):

    new_node = Node(data)

    if head is None:
        return new_node

    current = head

 
    while current.next is not None:
        current = current.next

    current.next = new_node

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


head = insert_at_end(head, 40)

print_ll(head)