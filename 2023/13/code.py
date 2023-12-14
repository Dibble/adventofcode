# f = open('test.txt', 'r')
f = open('input.txt', 'r')

lines = f.readlines()
f.close()

# Part 1
patterns = []
while '\n' in lines:
    patterns.append([l.strip('\n') for l in lines[:lines.index('\n')]])
    lines = lines[lines.index('\n') + 1:]
patterns.append([l.strip('\n') for l in lines])

# print(patterns)

horizontals = []
verticals = []
for pattern in patterns:
    # print('\n'.join(pattern))
    # horizontal reflection
    for i in range(1, len(pattern) - 1):
        # print(f'checking {i}, {pattern[0]} {pattern[i]} {pattern[-1]}')
        if pattern[0].strip('\n') == pattern[i].strip('\n'):
            # first row has a reflection
            # print(f'potential horizontal reflection between {0} and {i}, {(i + 1) / 2}')
            # print(pattern[0])
            # print(pattern[i])
            # print(f'will test {1} to {i - 1}')
            if [pattern[j].strip('\n') == pattern[i - j].strip('\n') for j in range(1, i - 1)].count(False) == 0:
                # print(f'horizontal reflection between {0} and {i}')
                horizontals.append((i + 1) / 2)
                break
        elif pattern[i].strip('\n') == pattern[-1].strip('\n'):
            # last row has a reflection
            # print(f'potential horizontal reflection between {i} and {len(pattern) - 1}, {(len(pattern) - i) / 2}')
            # print(pattern[i])
            # print(pattern[-1])
            # print(f'will test {i + 1} to {len(pattern) - 2}')
            if [pattern[j].strip('\n') == pattern[len(pattern) - 1 - (j - i)].strip('\n') for j in range(i + 1, len(pattern) - 2)].count(False) == 0:
                # print(f'horizontal reflection between {i} and {len(pattern) - 1}')
                horizontals.append((len(pattern) - i) / 2)
                break
    
    # vertical reflection
    rotated = [''.join([pattern[row][col] for row in range(len(pattern))]) for col in range(len(pattern[0].strip('\n')))]
    # print('\n'.join(rotated))
    for i in range(1, len(rotated) - 1):
        # print(f'checking {i}, {rotated[0]} {rotated[i]} {rotated[-1]}')
        if rotated[0].strip('\n') == rotated[i].strip('\n'):
            # first row has a reflection
            # print(f'potential vertical reflection between {0} and {i}, {(i + 1) / 2}')
            # print(rotated[0])
            # print(rotated[i])
            # print(f'will test {1} to {i - 1}')
            if [rotated[j].strip('\n') == rotated[i - j].strip('\n') for j in range(1, i - 1)].count(False) == 0:
                # print(f'vertical reflection between {0} and {i}')
                verticals.append((i + 1) / 2)
                break
        elif rotated[i].strip('\n') == rotated[-1].strip('\n'):
            # last row has a reflection
            # print(f'potential vertical reflection between {i} and {len(rotated) - 1}, {(len(rotated) - i) / 2}')
            # print(rotated[i])
            # print(rotated[-1])
            # print(f'will test {i + 1} to {len(rotated) - 2}')
            if [rotated[j].strip('\n') == rotated[len(rotated) - 1 - (j - i)].strip('\n') for j in range(i + 1, len(rotated) - 2)].count(False) == 0:
                # print(f'vertical reflection between {i} and {len(rotated) - 1}')
                verticals.append((len(rotated) - i) / 2)
                break

# account for zero-index
horizontals = [int(x) + 1 for x in horizontals]
verticals = [int(x) + 1 for x in verticals]

print(horizontals)
print(verticals)
print(sum(verticals) + 100 * sum(horizontals))