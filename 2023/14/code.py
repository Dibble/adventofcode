f = open('test.txt', 'r')
# f = open('input.txt', 'r')

lines = f.readlines()
f.close()

# Part 1
tiltedPlatform = [lines[0]]
for row in range(1, len(lines)):
    newline = ''
    for col in range(len(lines[row])):
        # print(f'{row}, {col}: {lines[row][col]}')
        if lines[row][col] == 'O':
            # roll north
            north = [tiltedPlatform[i][col] for i in reversed(range(row))]
            blocker = min(north.index('#') if '#' in north else len(north), north.index('O') if 'O' in north else len(north))
            # print(f'North: {north}, blocker: {blocker}')
            if blocker == 0:
                newline += 'O'
            else:
                # print(f'tilted {row - blocker}: {tiltedPlatform[row - blocker]}')
                newline += '.'
                modifiedrow = [i for i in tiltedPlatform[row - blocker]]
                modifiedrow[col] = 'O'
                tiltedPlatform[row - blocker] = ''.join(modifiedrow)
                # print(f'tilted {row - blocker}: {tiltedPlatform[row - blocker]}')
        else:
            newline += lines[row][col]
    tiltedPlatform.append(newline)

# print(''.join(tiltedPlatform))
    
sum = 0
for row in range(len(tiltedPlatform)):
    for col in range(len(tiltedPlatform[row])):
        if tiltedPlatform[row][col] == 'O':
            sum += len(tiltedPlatform) - row
    # print(f'after {row}: {sum}')

print(sum)