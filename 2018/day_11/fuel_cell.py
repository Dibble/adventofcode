powerLevels = []
serialNumber = 7857


def calculatePower(x, y, serial):
    rackID = x + 10
    power = rackID * y
    power += serial
    power *= rackID
    power = power % 1000
    power = int(power / 100)
    return power - 5


def getSquarePower(x, y, size):
    power = 0
    for i in range(size):
        for j in range(size):
            power += powerLevels[x + i][y + j]

    return power


for x in range(300):
    for y in range(300):
        # print(x, y, len(powerLevels))
        try:
            powerLevels[x]
        except IndexError:
            powerLevels.insert(x, [])

        # print(x, y, len(powerLevels))
        powerLevels[x].insert(y, calculatePower(x + 1, y + 1, serialNumber))


highX = None
highY = None
highSize = 0
highValue = 0
for squareSize in range(1, 301):
    highestSquareX = None
    highestSquareY = None
    highestSquareValue = 0
    for x in range(301 - squareSize):
        # try:
        #     sqaurePower[x]
        # except IndexError:
        #     sqaurePower.insert(x, [])
        for y in range(301 - squareSize):
            # print(x, y)
            # try:
            #     sqaurePower[x][y]
            # except IndexError:
            #     sqaurePower[x].insert(y, [])

            # for i in range(min(300 - x, 300 - y)):
            #     print(x, y, i)
            #     squareValue = getSquarePower(x, y, i)
                # sqaurePower[x][y].insert(i, squareValue)

                # print(squareValue, highestSquareValue)
            squareValue = getSquarePower(x, y, squareSize)
            if squareValue > highestSquareValue:
                highestSquareX = x
                highestSquareY = y
                highestSquareValue = squareValue

    if highestSquareValue > highValue:
        highX = highestSquareX
        highY = highestSquareY
        highSize = squareSize
        highValue = highestSquareValue
        print(highX + 1, highY + 1, highSize, highValue)

print(highX + 1, highY + 1, highSize, highValue)

# print(highestSquareX + 1, highestSquareY + 1,
# highestSquareSize, highestSquareValue)


# print(powerLevels)
# print(calculatePower(3, 5, 8))
# print(calculatePower(122, 79, 57))
# print(calculatePower(217, 196, 39))
# print(calculatePower(101, 153, 71))
