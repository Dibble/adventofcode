# f = open('test.txt', 'r')
f = open('input.txt', 'r')

lines = f.readlines()
# Part 1
# times = list(map(int, lines[0].split()[1:]))
# distances = list(map(int, lines[1].split()[1:]))

# Part 2
times = [int(''.join(lines[0].split()[1:]))]
distances = [int(''.join(lines[1].split()[1:]))]

# print(times)
# print(distances)
totalAcc = 1

for i in range(len(times)):
    minAcc = None
    maxAcc = None
    # calculate minimum and maximum acceleration to beat the distance
    # distance = acceleration * (time - acceleration)
    acc = 1
    while minAcc == None:
        if acc * (times[i] - acc) > distances[i]:
            minAcc = acc
        acc += 1
    acc = times[i] - 1
    while maxAcc == None:
        if acc * (times[i] - acc) > distances[i]:
            maxAcc = acc
        acc -= 1
    # print(minAcc, maxAcc)
    totalAcc *= (maxAcc - minAcc + 1)

print(totalAcc)