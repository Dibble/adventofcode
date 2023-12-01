def findWordNumber(text):
    numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    reverseText = text[::-1]
    firstNumber = None
    lastNumber = None
    for i in range(len(numbers)):
        index = text.find(numbers[i])
        lastIndex = reverseText.find(numbers[i][::-1])
        if index != -1:
            if firstNumber == None:
                firstNumber = [index, str(i+1)]
            elif firstNumber[0] > index:
                firstNumber = [index, str(i+1)]
            
            if lastNumber == None:
                lastNumber = [lastIndex, str(i+1)]
            elif lastNumber[0] > lastIndex:
                lastNumber = [lastIndex, str(i+1)]
    
    # correct lastNumberIndex
    print(text, lastNumber)
    correctLastNumber = [len(text) - lastNumber[0] - len(numbers[int(lastNumber[1])-1]), lastNumber[1]] if lastNumber != None else None
    
    return [firstNumber, correctLastNumber]


# f = open('test.txt', 'r')
f = open('input.txt', 'r')

# part 1
# sum = 0
# # read file line by line
# for line in f.readlines():
#     l = line.strip()
#     first = None
#     last = None
#     print(l)
#     # find first digit of l
#     for i in range(len(l)):
#         if l[i].isdigit():
#             print(l[i])
#             first = l[i]
#             break
#     # find last digit of l
#     for i in range(len(l)-1, -1, -1):
#         if l[i].isdigit():
#             print(l[i])
#             last = l[i]
#             break
#     combined = first + last
#     print(combined)
#     sum += int(combined)

# print(sum)

#part 2
sum = 0
# read file line by line
for line in f.readlines():
    l = line.strip()
    firstIndex = None
    lastIndex = None
    # print(l)
    # find first digit of l
    for i in range(len(l)):
        if l[i].isdigit():
            # print(l[i])
            firstIndex = i
            break
    # find last digit of l
    for i in range(len(l)-1, -1, -1):
        if l[i].isdigit():
            # print(l[i])
            lastIndex = i
            break
    
    [firstText, lastText] = findWordNumber(l)
    
    if firstText != None:
        if firstIndex != None:
            first = firstText[1] if int(firstText[0]) < firstIndex else l[firstIndex]
        else:
            first = firstText[1]
    else:
        first = l[firstIndex]

    if lastText != None:
        if lastIndex != None:
            last = lastText[1] if int(lastText[0]) > lastIndex else l[lastIndex]
        else:
            last = lastText[1]
    else:
        last = l[lastIndex]

    combined = first + last
    toAdd = int(combined)
    # print(toAdd) if toAdd > 99 else None
    print(l, combined)
    sum += toAdd

print(sum)

# close file
f.close()
