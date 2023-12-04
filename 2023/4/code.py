# f = open('test.txt', 'r')
f = open('input.txt', 'r')

# part 1
# sum = 0

# for line in f.readlines():
#     [card, numbers] = line.split(':')
#     [winningNumbers, myNumbers] = numbers.split('|')
#     winningNumbers = winningNumbers.strip().split(' ')
#     myNumbers = myNumbers.strip().split(' ')
#     # print(card, winningNumbers, myNumbers)

#     # check if my numbers are in the winning numbers
#     score = 0
#     for number in myNumbers:
#         if number == '':
#             continue
#         if number in winningNumbers:
#             score = 1 if score == 0 else score * 2
#     print(card, score)
#     sum += score

# print(sum)

# part 2
cards = []
for line in f.readlines():
    [card, numbers] = line.split(':')
    [winningNumbers, myNumbers] = numbers.split('|')
    winningNumbers = winningNumbers.strip().split(' ')
    myNumbers = myNumbers.strip().split(' ')
    # filter out empty strings
    winningNumbers = list(filter(lambda a: a != '', winningNumbers))
    myNumbers = list(filter(lambda a: a != '', myNumbers))

    wins = 0
    for number in myNumbers:
        if number == '':
            continue
        if number in winningNumbers:
            wins += 1

    cards.append(wins)

print(cards)

playedCards = []
for i in range(len(cards)):
    playedCards.append(i)

cardIndex = 0
while cardIndex < len(playedCards):
    cardToPlay = playedCards[cardIndex]
    # print(cardToPlay)
    wins = cards[cardToPlay]
    # print(wins)
    if wins > 0:
        for j in range(cardToPlay + 1, cardToPlay + wins + 1):
            playedCards.append(j)
    cardIndex += 1

# print(playedCards)
print(len(playedCards))