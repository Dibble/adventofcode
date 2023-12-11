# f = open('test.txt', 'r')
f = open('input.txt', 'r')

lines = f.readlines()
f.close()

# row = y, col = x

galaxies = []
for row in range(len(lines)):
    for col in range(len(lines[row].strip())):
        if lines[row][col] == '#':
            galaxies.append((row, col))

# print(galaxies)

# expand universe
expandingRows = [i for i in range(len(lines)) if '#' not in lines[i]]
expandingColumns = [i for i in range(len(lines[0].strip())) if '#' not in [lines[j][i] for j in range(len(lines))]]
print(expandingRows)
print(expandingColumns)

pairs = {}
dist = 0
for g in range(len(galaxies) - 1):
    otherGalaxies = galaxies[g+1:]
    for o in range(len(otherGalaxies)):
        if str(galaxies[g]) in pairs.keys():
            pairs[str(galaxies[g])].append(otherGalaxies[o])
        else:
            pairs[str(galaxies[g])] = [otherGalaxies[o]]
        d = abs(galaxies[g][0] - otherGalaxies[o][0]) + abs(galaxies[g][1] - otherGalaxies[o][1])
        # print(f'{galaxies[g]} and {otherGalaxies[o]}: {d}')
        # d += [galaxies[g][0] < r < otherGalaxies[o][0] or otherGalaxies[o][0] < r < galaxies[g][0] for r in expandingRows].count(True) # part 1
        d += [galaxies[g][0] < r < otherGalaxies[o][0] or otherGalaxies[o][0] < r < galaxies[g][0] for r in expandingRows].count(True) * (1000000 - 1) # part 2
        # print(f'rows: {d}')
        # d += [galaxies[g][1] < c < otherGalaxies[o][1] or otherGalaxies[o][1] < c < galaxies[g][1] for c in expandingColumns].count(True) # part 1
        d += [galaxies[g][1] < c < otherGalaxies[o][1] or otherGalaxies[o][1] < c < galaxies[g][1] for c in expandingColumns].count(True) * (1000000 - 1) # part 2
        # print(f'cols: {d}')
        dist += d

# print(pairs)
print(dist)