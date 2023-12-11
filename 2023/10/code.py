# f = open('test.txt', 'r')
# f = open('test2.txt', 'r')
f = open('input.txt', 'r')

lines = f.readlines()
f.close()

# Part 1
north = '|LJS'
east = '-LFS'
south = '|7FS'
west = '-J7S'

def northCheck(row, col):
    return lines[row][col] in north and 0 <= row - 1 < len(lines) and 0 <= col < len(lines[0]) and lines[row - 1][col] in south
def eastCheck(row, col):
    return lines[row][col] in east and 0 <= row < len(lines) and 0 <= col + 1 < len(lines[0]) and lines[row][col + 1] in west
def southCheck(row, col):
    return lines[row][col] in south and 0 <= row + 1 < len(lines) and 0 <= col < len(lines[0]) and lines[row + 1][col] in north
def westCheck(row, col):
    return lines[row][col] in west and 0 <= row < len(lines) and 0 <= col - 1 < len(lines[0]) and lines[row][col - 1] in east

def getConnectedPipes(pipe):
    (row, col) = pipe
    if lines[row][col] == '.':
        return []
    connected = []
    if northCheck(row, col):
        connected.append((row - 1, col))
    if eastCheck(row, col):
        connected.append((row, col + 1))        
    if southCheck(row, col):
        connected.append((row + 1, col))
    if westCheck(row, col):
        connected.append((row, col - 1))
    return connected

pipes = []
for row in range(len(lines) - 1):
    for col in range(len(lines[0]) - 1):
        if lines[row][col] == 'S':
            if northCheck(row, col):
                pipes.append([(row, col),(row - 1, col)])
            if eastCheck(row, col):
                pipes.append([(row, col),(row, col + 1)])
            if southCheck(row, col):
                pipes.append([(row, col),(row + 1, col)])
            if westCheck(row, col):
                pipes.append([(row, col),(row, col - 1)])
            break

print(pipes)
loop = None
# i = 0
while loop == None:
    for pipe in pipes:
        # print(f'pipe {pipe}')
        connected = getConnectedPipes(pipe[-1])
        # print(f'connected {connected}')
        for c in connected:
            # print(f'c {c} {pipe[-2]} {c == pipe[-2]}')
            if c == pipe[-2]:
                continue
            if c not in pipe:
                # print('not in pipe and not where we just came from')
                pipe.append(c)
                break
            elif c == pipe[0]:
                # print('loop found')
                loop = pipe
                break
    # i += 1
print(loop)
print(len(loop))
print(len(loop) / 2)