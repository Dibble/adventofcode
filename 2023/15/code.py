# f = open('test.txt', 'r')
f = open('input.txt', 'r')

input = f.readline().strip()
f.close()

def hash(input):
  current = 0
  for i in input:
    current += ord(i)
    current *= 17
    current %= 256
    # print(i, ord(i), current)
  return current

# print(hash('HASH'))

# part 1
# steps = input.split(',')
# hashes = []
# for step in steps:
#   hashes.append(hash(step))

# print(hashes)
# print(sum(hashes))

# part 2
steps = input.split(',')
boxes = {} # { box number: [lens (label, focal length)] }

for step in steps:
  [label, focal] = step.split('=') if '=' in step else step.split('-')
  box = hash(label)
  if box not in boxes:
    boxes[box] = []
  
  if '=' in step:
    exists = False
    for l in range(len(boxes[box])):
      if boxes[box][l][0] == label:
        boxes[box][l] = (label, int(focal))
        exists = True
        break
    if not exists:
      boxes[box].append((label, int(focal)))
  elif '-' in step:
    boxes[box] = [lens for lens in boxes[box] if lens[0] != label]

print(boxes)

sum = 0
for box in boxes:
  for l in range(len(boxes[box])):
    sum += (box + 1) * (l + 1) * boxes[box][l][1]

print(sum)