claimed = []
overlaps = 0

for line in open("input.txt", "r"):
    line = line.strip()

    if line == "" or line == None:
        continue

    id, rest = line.split("@", 1)
    corner, size = rest.split(":", 1)

    left, top = corner.strip().split(",", 1)
    width, height = size.strip().split("x", 1)

    for x in range(int(width)):
        if claimed[int(left)] == None:
            claimed[int(left)] = []
        for y in range(int(height)):
            try:
                claimed[int(left) + x][int(top) + y] += 1
            except KeyError:
                claimed[int(left) + x][int(top) + y] = 1
                overlaps += 1

print(overlaps)
