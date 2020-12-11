frequency = 0
frequencies = {"0": 1}

processing = True

while processing:
    for line in open("input.txt", "r"):
        line = line.strip()

        if line == "" or line == None:
            continue

        frequency += int(line)

        try:
            if frequencies[str(frequency)] == 1:
                print(frequency)
                processing = False
                break
        except KeyError:
            frequencies[str(frequency)] = 1

# print(frequencies)
print(len(frequencies.keys()))
