boxIds = []

for line in open("input.txt", "r"):
    line = line.strip()

    if line == "" or line == None:
        continue

    for id in boxIds:
        different_characters = 0
        for i in range(len(id)):
            if id[i] != line[i]:
                different_characters += 1

        if different_characters == 1:
            print(line)
            print(id)

    boxIds.append(line)
