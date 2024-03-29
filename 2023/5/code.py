f = open('test.txt', 'r')
# f = open('input.txt', 'r')

seeds = []
maps = [] # [source, destination, [rules]], rules = [destination start, source start, range]

currentMap = []

for line in f.readlines():
    line = line.strip()
    if line == '': continue

    match line.split(' '):
        case ['seeds:', *seedStrs]:
            # part 1
            # seeds = [int(s) for s in seedStrs]
            # part 2
            seedIndex = -1
            while len(seedStrs) > 0:
                # print(f'seedStrs: {seedStrs}')
                seedIndex = seedStrs.pop(0)
                seedRange = seedStrs.pop(0)
                seeds.append((int(seedIndex), int(seedRange)))
        case [*rule, 'map:']:
            if currentMap != []:
                maps.append(currentMap)
            ruleDef = rule[0].split('-')
            currentMap = [ruleDef[0], ruleDef[2], []]
        case _:
            [destinationStart, sourceStart, range] = list(map(int, line.split(' ')))
            currentMap[2].append([destinationStart, sourceStart, range])

if currentMap != []:
    maps.append(currentMap)

# part 1
# print(f'seeds: {len(seeds)}')
# print(f'maps: {len(maps)}')

# finalSeeds = []
# for seed in seeds:
#     print(f'seed: {seed}')
#     for map in maps:
#         for rule in map[2]:
#             [destinationStart, sourceStart, range] = rule
#             if sourceStart <= seed < sourceStart + range:
#                 # print(f'{seed} matched {map[0]}->{map[1]}, rule {rule}')
#                 seed = (seed - sourceStart) + destinationStart
#                 # print(f'new seed: {seed}')
#                 break
#     print(f'final seed: {seed}')
#     finalSeeds.append(seed)

# print(min(finalSeeds))

# part 2
# find lowest possible result value
# travel backwards through maps
# iterate over ranges

# for each map rule, identify overlapping ranges and transform into multiple ranges
# keep lowest value after processing each range
print(seeds)
for seed in seeds:
    print(f'seed: {seed}')
    transformedRanges = [seed]
    for map in maps:
        print(f'map: {map}')
        mappedRanges = []
        r = 0
        while r < len(map[2]):
            print(f'rule: {map[2][r]}')
            [destinationStart, sourceStart, range] = map[2][r]
            for transformedRange in transformedRanges:
                print(f'transformedRange: {transformedRange}')
                if sourceStart <= transformedRange[0] < sourceStart + range:
                    print('seed range overlaps rule range')
                    overlapRange = min(destinationStart + range, transformedRange[0] + transformedRange[1])
                    mappedRanges.append((destinationStart, overlapRange - destinationStart))
                    # before mapped range
                    if transformedRange[0] < sourceStart:
                        print('before mapped range')
                        mappedRanges.append((transformedRange[0], sourceStart - transformedRange[0]))
                    # after mapped range
                    if destinationStart + overlapRange < transformedRange[0] + transformedRange[1]:
                        print('after mapped range')
                        mappedRanges.append((destinationStart + overlapRange, transformedRange[0] + transformedRange[1] - destinationStart - overlapRange))
            r += 1
        transformedRanges = mappedRanges
    print(f'seed: {seed}, transformedRanges: {transformedRanges}')
                

# each seed range (79, 14)
for seed in seeds:
# each map transform to new set of ranges
    newRanges = []
    for map in maps:
        mappedRanges = []
# find overlapping rules
        for rule in map[2]:
            [destinationStart, sourceStart, range] = rule
            if sourceStart <= seed[0] < sourceStart + range:
                
# for each overlapping rule, produce new ranges
# repeat until no more maps/rules
# find lowest value in ranges