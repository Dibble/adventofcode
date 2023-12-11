# f = open('test.txt', 'r')
# f = open('test2.txt', 'r')
f = open('input.txt', 'r')

lines = f.readlines()
f.close()

instructions = lines[0].strip()

nodeStr = lines[2:]
nodes = {}

for node in nodeStr:
    node = node.replace('(','').replace(')','')
    node = node.split('=')
    parent = node[0].strip()
    left = node[1].split(',')[0].strip()
    right = node[1].split(',')[1].strip()

    nodes[parent] = {
        'L': left,
        'R': right
    }

currentNode = 'AAA'
steps = 0

while currentNode != 'ZZZ':
    instruction = instructions[steps % len(instructions)]
    currentNode = nodes[currentNode][instruction]
    steps += 1
    print(currentNode, steps, instruction)

print(steps)