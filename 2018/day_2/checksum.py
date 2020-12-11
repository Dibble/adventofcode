twos = 0
threes = 0

for line in open("input.txt", "r"):
    line = line.strip()

    if line == "" or line == None:
        continue

    letters = {}

    for character in line:
        try:
            letters[character] += 1
        except KeyError:
            letters[character] = 1

    two = False
    three = False

    for character, freq in letters.items():
        if freq == 2:
            two = True
        elif freq == 3:
            three = True

    if two:
        twos += 1
    if three:
        threes += 1

print(twos)
print(threes)
print(int(twos) * int(threes))
