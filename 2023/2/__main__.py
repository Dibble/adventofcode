# f = open('test.txt', 'r')
f = open('input.txt', 'r')

# part 1
# maxRed = 12
# maxGreen = 13
# maxBlue = 14

# idSum = 0

# for line in f.readlines(): 
#     line = line.strip()
#     [gameId, games] = line.split(':')
#     gameNum = int(gameId.split(' ')[1])
#     games = games.split(';')

#     possible = True
    
#     for game in games:
#         dice = game.split(',')
#         for d in dice:
#             # print(d)
#             [count, colour] = d.strip().split(' ')
#             match colour:
#                 case "red":
#                     if int(count) > maxRed:
#                         print(gameId, d)
#                         possible = False
#                         break
#                 case "green":
#                     if int(count) > maxGreen:
#                         print(gameId, d)
#                         possible = False
#                         break
#                 case "blue":
#                     if int(count) > maxBlue:
#                         print(gameId, d)
#                         possible = False
#                         break
    
#     if possible:
#         idSum += gameNum

# print(idSum)

# part 2
totalPower = 0

for line in f.readlines(): 
    line = line.strip()
    [gameId, games] = line.split(':')
    gameNum = int(gameId.split(' ')[1])
    games = games.split(';')

    minRed = 0
    minGreen = 0
    minBlue = 0
    
    for game in games:
        dice = game.split(',')
        for d in dice:
            # print(d)
            [count, colour] = d.strip().split(' ')
            match colour:
                case "red":
                    if int(count) > minRed or minRed == 0:
                        print(gameId, d)
                        minRed = int(count)
                case "green":
                    if int(count) > minGreen or minGreen == 0:
                        print(gameId, d)
                        minGreen = int(count)
                case "blue":
                    if int(count) > minBlue or minBlue == 0:
                        print(gameId, d)
                        minBlue = int(count)
        print(gameId, minRed, minGreen, minBlue)

    power = minRed * minGreen * minBlue
    print(gameId, power)
    totalPower += power

print(totalPower)
