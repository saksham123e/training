class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


def delete_head(head):

    if head is None:
        return None

    head = head.next

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

head = delete_head(head)

print_ll(head)