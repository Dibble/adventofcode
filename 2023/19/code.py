f = open('test.txt', 'r')
# f = open('input.txt', 'r')

lines = f.readlines()
f.close()

gap = lines.index('\n')
workflows = lines[:gap]
parts = lines[gap+1:]

ruleDict = {}
for workflow in workflows:
    idx = workflow.index('{')
    key = workflow[:idx]
    rules = workflow[idx+1:-2].split(',')
    ruleDict[key] = rules

print(ruleDict)
    
# Part 1
# accepted = []
# for part in parts:
#     part = part.strip()[1:-1]
#     components = [int(p.split('=')[1]) for p in part.split(',')]
#     # print(f'part {part}: {components}')

#     current = 'in'
#     while current != 'A' and current != 'R':
#         # print(f' current {current}')
#         rule = ruleDict[current]
#         r = 0
#         matched = False
#         while not matched:
#             # print(f'  rule {rule[r]}')
#             if ':' in rule[r]:
#                 test, dest = rule[r].split(':')
#                 var = ['x','m','a','s'].index(test[0])
#                 op = test[1]
#                 value = int(test[2:])
#                 # print(var, op, value)
#                 if op == '<' and components[var] < value:
#                     current = dest
#                     matched = True
#                 elif op == '>' and components[var] > value:
#                     current = dest
#                     matched = True
#             else:
#                 current = rule[r]
#                 matched = True
#             r += 1
#     if current == 'A':
#         print(f'Accepted: {components}')
#         accepted.append(sum(components))
# print(sum(accepted))

# Part 2
# find all rules that result in A
# work backwards adding all restrictions until reaching 'in'
# calculate valid ranges for each variable
# combinations = product of all valid ranges
# sum all combinations