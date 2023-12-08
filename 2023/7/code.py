import functools

# part 1
# cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

# def score(hand):
#     # count unique cards
#     unique = {}
#     for card in hand:
#         if card[0] in unique:
#             unique[card[0]] += 1
#         else:
#             unique[card[0]] = 1

#     match len(unique.keys()):
#         case 1:
#             return 6 # five of a kind
#         case 2:
#             if 4 in unique.values():
#                 return 5 # four of a kind
#             else:
#                 return 4 # full house
#         case 3:
#             if 3 in unique.values():
#                 return 3 # three of a kind
#             else:
#                 return 2 # two pair
#         case 4:
#             return 1 # one pair
#         case _:
#             return 0 # high card

# part 2
cards = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J']

def score(hand):
    # print(f'scoring {hand}')
    # count unique cards
    unique = {}
    for card in hand:
        # print(card)
        if card == 'J':
            continue
        if card[0] in unique:
            unique[card[0]] += 1
        else:
            unique[card[0]] = 1
    # print(hand, unique)

    match len(unique.keys()):
        case 0:
            return 6 # five of a kind, all jokers
        case 1:
            return 6 # five of a kind
        case 2:
            if 4 in unique.values() or min(unique.values()) == 1:
                # JAAAK, 3 A, 1 K
                # JJAAK, 2 A, 1 K
                # JJJAK, 1 A, 1 K
                return 5 # four of a kind
            else:
                # JAAKK, 2 A, 2 K
                return 4 # full house
        case 3:
            if 3 in unique.values() or 'J' in hand[0]:
                # JAAKQ, 2 A, 1 K, 1 Q
                # JJAKQ, 1 A, 1 K, 1 Q
                return 3 # three of a kind
            else:
                return 2 # two pair
        case 4:
            return 1 # one pair
        case 5:
            return 0 # high card

def handCompare(hand1, hand2):
    card1 = hand1[0]
    card2 = hand2[0]
    card1Score = score(card1)
    card2Score = score(card2)
    # print(f'comparing {card1}: {card1Score}, {card2}: {card2Score}')
    match '':
        case _ if card1Score > card2Score:
            # print(f'score {card1} beats {card2}')
            return 1
        case _ if card1Score < card2Score:
            # print(f'score {card1} loses {card2}')
            return -1
        case _:
            for i in range(len(card1)):
                if cards.index(card1[i]) < cards.index(card2[i]):
                    # print(f'card {card1} beats {card2}: {i}')
                    return 1
                elif cards.index(card1[i]) > cards.index(card2[i]):
                    # print(f'card {card1} loses {card2}: {i}')
                    return -1
            # cards identical
            # print(f'cards identical {card1} {card2}')
            return 0
    # if card1Score > card2Score:
    #     print(f'score {card1} beats {card2}')
    #     return 1
    # if card1Score < card2Score:
    #     print(f'score {card1} loses {card2}')
    #     return -1
    # for i in range(len(card1)):
    #     if cards.index(card1[i]) < cards.index(card2[i]):
    #         print(f'card {card1} beats {card2}: {i}')
    #         return 1
    #     elif cards.index(card1[i]) > cards.index(card2[i]):
    #         print(f'card {card1} loses {card2}: {i}')
    #         return -1
    # # cards identical
    # print(f'cards identical {card1} {card2}')
    # return 0

f = open('test2.txt', 'r')
# f = open('input.txt', 'r')

hands = list(map(lambda line: (line.split()[0], line.split()[1]), f.readlines()))

fivekind = []
fourkind = []
fullhouse = []
threekind = []
twopair = []
onepair = []
highcard = []

for h in hands:
    [hand, bid] = h
    match score(hand):
        case 6:
            fivekind.append(hand)
        case 5:
            fourkind.append(hand)
        case 4:
            fullhouse.append(hand)
        case 3:
            threekind.append(hand)
        case 2:
            twopair.append(hand)
        case 1:
            onepair.append(hand)
        case 0:
            highcard.append(hand)

print('five of a kind', fivekind)
print('four of a kind', fourkind)
print('full house', fullhouse)
print('three of a kind', threekind)
print('two pair', twopair)
print('one pair', onepair)
print('high card', highcard)

# print(hands)
# sortedHands = sorted(hands, key=functools.cmp_to_key(handCompare))
# print(list(map(lambda h: h[0], sortedHands)))

# totalWinnings = 0
# for idx, hand in enumerate(sortedHands):
#     # print(idx, hand)
#     totalWinnings += (idx + 1) * int(hand[1]) # rank * bid

# print(totalWinnings)
