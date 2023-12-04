# f = open('test.txt', 'r')
f = open('input.txt', 'r')

numbers = [] # [row, colStart, colEnd, number]
symbols = [] # [row, col, symbol]
row = 0
for line in f.readlines():
    col = 0
    currentNumber = []

    for char in line:
        if char.isdigit():
            # print(char)
            currentNumber.append(char)
        elif char == '.' or char == '\n':
            if len(currentNumber) > 0:
                numbers.append([row, col-len(currentNumber), col-1, int(''.join(currentNumber))])
                currentNumber = []
        else:
            symbols.append([row, col, char])
            if len(currentNumber) > 0:
                numbers.append([row, col-len(currentNumber), col-1, int(''.join(currentNumber))])
                currentNumber = []
        
        col += 1
    
    if len(currentNumber) > 0:
        numbers.append([row, col-len(currentNumber), col-1, int(''.join(currentNumber))])
        currentNumber = []
    
    row += 1

# print(numbers)
# print(symbols)

# part 1
# sum = 0
# for number in numbers:
#     [row, colStart, colEnd, value] = number
#     for symbol in symbols:
#         [rowSymbol, colSymbol, sym] = symbol
#         if abs(rowSymbol - row) <= 1 and colSymbol >= colStart - 1 and colSymbol <= colEnd + 1:
#             # print(value, sym, abs(rowSymbol - row), colSymbol, colStart - 1, colSymbol, colEnd + 1)
#             print(value, sym)
#             sum += value
#             break

# print(sum)

# part 2
sum = 0
for symbol in symbols:
    [rowSymbol, colSymbol, sym] = symbol
    if sym == '*':
        adjacentNumbers = []
        for number in numbers:
            [row, colStart, colEnd, value] = number
            if abs(rowSymbol - row) <= 1 and colSymbol >= colStart - 1 and colSymbol <= colEnd + 1:
                adjacentNumbers.append(value)
        if len(adjacentNumbers) == 2:
            ratio = adjacentNumbers[0] * adjacentNumbers[1]
            print(sym, ratio)
            sum += ratio

print(sum)
    