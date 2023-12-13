# f = open('test.txt', 'r')
f = open('input.txt', 'r')

lines = f.readlines()
f.close()

# Part 1
sum = 0
for line in lines:
    [springs, groupStr] = [x.strip() for x in line.split(' ')]
    permutations = []
    for i in range(len(springs)):
        # print(f'spring {springs[i]}')
        if springs[i] == '?':
            if len(permutations) == 0:
                permutations = ['.', '#']
            else:
                for p in range(len(permutations)):
                    permutations[p] += '.'
                    permutations.append(permutations[p][:-1] + '#')
        else:
            if len(permutations) == 0:
                permutations = [springs[i]]
            else:
                for p in range(len(permutations)):
                    permutations[p] += springs[i]
    
    # print(permutations)
    for p in permutations:
        damagedSprings = [g for g in p.split('.') if g != '']
        groups = [int(g) for g in groupStr.split(',')]
        if len(damagedSprings) == len(groups):
            if [groups[i] == len(damagedSprings[i]) for i in range(len(groups))].count(False) == 0:
                sum += 1

print(sum)