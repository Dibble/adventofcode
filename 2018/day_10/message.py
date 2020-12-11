import re
import matplotlib.pyplot as plt
import time

regex = "^position=<\s?(-?[0-9]+), \s?(-?[0-9]+)> velocity=<\s?(-?[0-9]+), \s?(-?[0-9]+)>"
coordinates = []

for line in open("day_10/input.txt", "r"):
    # for line in open("day_10/example.txt", "r"):
    match = re.match(regex, line)

    positionX, positionY, velocityX, velocityY = match.groups()
    # print(positionX, positionY, velocityX, velocityY)

    coordinates.append({
        "position": {"x": int(positionX), "y": int(positionY)},
        "velocity": {"x": int(velocityX), "y": int(velocityY)}
    })

# print(coordinates)


def showCoordinates():
    x = []
    y = []

    for coord in range(len(coordinates)):
        x.append(coordinates[coord]["position"]["x"])
        y.append(coordinates[coord]["position"]["y"]*-1)

    plt.scatter(x, y, marker=",", linewidths=1)
    plt.show()


# plot = showCoordinates()
# plt.show()
# print(plotCoordinates())
# showCoordinates()


def updateCoordinates():
    for i in range(len(coordinates)):
        coord = coordinates[i]

        coord["position"]["x"] += coord["velocity"]["x"]
        coord["position"]["y"] += coord["velocity"]["y"]


iteration = 0
try:
    while True:
        if iteration >= 10831:
            print(iteration)
            showCoordinates()
        updateCoordinates()
        # time.sleep(1)
        iteration += 1
except KeyboardInterrupt:
    print("finish")
