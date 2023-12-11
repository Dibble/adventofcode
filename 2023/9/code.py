# f = open('test.txt', 'r')
f = open('input.txt', 'r')

lines = f.readlines()

predictions = []

# Part 1
# for line in lines:
#     sequence = [int(n) for n in line.split()]
#     sequences = [sequence]

#     while True:
#         nextSequence = sequences[-1]
#         diffs = []
#         for i in range(len(nextSequence) - 1):
#             diffs.append(nextSequence[i + 1] - nextSequence[i])
#         sequences.append(diffs)
#         if len(set(diffs)) == 1:
#             break
    
#     i = len(sequences) - 1
#     while i >= 0:
#         print(sequences[i])
#         if (i == 0):
#             print(f'prediction: {sequences[0][-1]}')
#             predictions.append(sequences[0][-1])
#         else:
#             print(f'adding {sequences[i][-1]} to {sequences[i-1][-1]}')
#             sequences[i-1].append(sequences[i-1][-1] + sequences[i][-1])
#         i -= 1

# print(predictions)
# print(sum(predictions)) 

# Part 2
for line in lines:
    sequence = [int(n) for n in line.split()]
    sequences = [sequence]

    while True:
        nextSequence = sequences[-1]
        diffs = []
        for i in range(len(nextSequence) - 1):
            diffs.append(nextSequence[i + 1] - nextSequence[i])
        sequences.append(diffs)
        if len(set(diffs)) == 1:
            break
    
    i = len(sequences) - 1
    while i >= 0:
        print(sequences[i])
        if (i == 0):
            print(f'prediction: {sequences[0][0]}')
            predictions.append(sequences[0][0])
        else:
            print(f'subtracting {sequences[i][0]} from {sequences[i-1][0]} = {sequences[i-1][0] - sequences[i][0]}')
            sequences[i-1].insert(0, sequences[i-1][0] - sequences[i][0])
        i -= 1

print(predictions)
print(sum(predictions)) 