# f = open('test.txt', 'r')
f = open('input.txt', 'r')

mirrors = f.readlines()
f.close()

edges = [(0, col, 'D') for col in range(len(mirrors[0].strip()))]
edges += [(len(mirrors) - 1, col, 'U') for col in range(len(mirrors[0].strip()))]
edges += [(row, 0, 'R') for row in range(len(mirrors))]
edges += [(row, len(mirrors[0].strip()) - 1, 'L') for row in range(len(mirrors))]
# print(edges)

max = 0
for edge in edges:
    energised = [['' for col in mirrors[row].strip()] for row in range(len(mirrors))]
    beams = [edge]

    while len(beams) > 0:
        beam = beams[0]
        # print(beam)
        # if beam outside grid then exit beam loop
        if beam[0] < 0 or beam[0] >= len(energised) or beam[1] < 0 or beam[1] >= len(energised[beam[0]]):
            # print('beam outside grid')
            beams.pop(0)
            continue

        # if grid already energised then exit beam loop
        if beam[2] in energised[beam[0]][beam[1]]:
            # print('grid already energised')
            beams.pop(0)
            continue

        # energise current grid
        energised[beam[0]][beam[1]] += beam[2]

        # print(mirrors[beam[0]][beam[1]])
        # move beam
        match mirrors[beam[0]][beam[1]]:
            case '.':
                match beam[2]:
                    case 'R':
                        beams[0] = (beam[0], beam[1] + 1, beam[2])
                    case 'L':
                        beams[0] = (beam[0], beam[1] - 1, beam[2])
                    case 'U':
                        beams[0] = (beam[0] - 1, beam[1], beam[2])
                    case 'D':
                        beams[0] = (beam[0] + 1, beam[1], beam[2])
            case '/':
                match beam[2]:
                    case 'R':
                        beams[0] = (beam[0] - 1, beam[1], 'U')
                    case 'L':
                        beams[0] = (beam[0] + 1, beam[1], 'D')
                    case 'U':
                        beams[0] = (beam[0], beam[1] + 1, 'R')
                    case 'D':
                        beams[0] = (beam[0], beam[1] - 1, 'L')
            case '\\':
                match beam[2]:
                    case 'R':
                        beams[0] = (beam[0] + 1, beam[1], 'D')
                    case 'L':
                        beams[0] = (beam[0] - 1, beam[1], 'U')
                    case 'U':
                        beams[0] = (beam[0], beam[1] - 1, 'L')
                    case 'D':
                        beams[0] = (beam[0], beam[1] + 1, 'R')
            case '-':
                match beam[2]:
                    case 'R':
                        beams[0] = (beam[0], beam[1] + 1, beam[2])
                    case 'L':
                        beams[0] = (beam[0], beam[1] - 1, beam[2])
                    case 'U':
                        beams[0] = (beam[0], beam[1] - 1, 'L')
                        beams.append((beam[0], beam[1] + 1, 'R'))
                    case 'D':
                        beams[0] = (beam[0], beam[1] - 1, 'L')
                        beams.append((beam[0], beam[1] + 1, 'R'))
            case '|':
                match beam[2]:
                    case 'R':
                        beams[0] = (beam[0] + 1, beam[1], 'D')
                        beams.append((beam[0] - 1, beam[1], 'U'))
                    case 'L':
                        beams[0] = (beam[0] + 1, beam[1], 'D')
                        beams.append((beam[0] - 1, beam[1], 'U'))
                    case 'U':
                        beams[0] = (beam[0] - 1, beam[1], beam[2])
                    case 'D':
                        beams[0] = (beam[0] + 1, beam[1], beam[2])
        # print(beams)

    # print('\n'.join([','.join(row) for row in energised]))
    energy = len([col for row in energised for col in row if col != ''])
    print(energy)
    if energy > max:
        max = energy
print(f'max {max}')