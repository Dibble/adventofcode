# read file
# f = open('test.txt', 'r')
f = open('input.txt', 'r')

lines = f.readlines()
f.close()

# build path/loop
path = [(0,0)]
for line in lines:
    direction, distance, colour = line.strip().split(' ')
    for i in range(int(distance)):
        match direction:
            case 'R':
                path.append((path[-1][0], path[-1][1] + 1))
            case 'L':
                path.append((path[-1][0], path[-1][1] - 1))
            case 'U':
                path.append((path[-1][0] - 1, path[-1][1]))
            case 'D':
                path.append((path[-1][0] + 1, path[-1][1]))
# print(path)

# explore all reachable spots from every edge space not in the loop
maxRow = 0
maxCol = 0
minRow = 0
minCol = 0
for p in path:
    maxRow = max(maxRow, p[0])
    maxCol = max(maxCol, p[1])
    minRow = min(minRow, p[0])
    minCol = min(minCol, p[1])

edges = []
for r in range(minRow, maxRow + 1):
    edges.append((r, minCol))
    edges.append((r, maxCol))
for c in range(minCol, maxCol + 1):
    edges.append((minRow, c))
    edges.append((maxRow, c))
# print(edges)

explored = []
for edge in edges:
    if edge not in path and edge not in explored:
        explored.append(edge)
# print(explored)
        
prevLength = 0
while len(explored) != prevLength:
    toExplore = explored[prevLength:]
    prevLength = len(explored)
    for p in toExplore:
        for n in [(p[0] + 1, p[1]), (p[0] - 1, p[1]), (p[0], p[1] + 1), (p[0], p[1] - 1)]:
            if n[0] >= minRow and n[0] <= maxRow and n[1] >= minCol and n[1] <= maxCol and n not in path and n not in explored:
                explored.append(n)
# print(explored)

# count reachable spots
rows = maxRow - minRow + 1
cols = maxCol - minCol + 1
print(f'{rows} * {cols} = {(rows) * (cols)} - {len(explored)} = {(rows) * (cols) - len(explored)}')
    
# for r in range(minRow, maxRow + 1):
#     row = ''
#     for c in range(minCol, maxCol + 1):
#         row += '.' if (r, c) not in path else '#'
#     print(row)