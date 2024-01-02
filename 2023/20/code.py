f = open('test.txt', 'r')
# f = open('test2.txt', 'r')
# f = open('input.txt', 'r')

lines = f.readlines()
f.close()

# Part 1
modules = { 'button': { 'type': 'broadcaster', 'inputs': [], 'outputs': ['broadcaster']}}
for line in lines:
    line = line.strip()
    input, output = line.split(' -> ')
    
    outputs = [o.strip() for o in output.split(', ')]
    if input == 'broadcaster':
        type = 'broadcaster'
        name = 'broadcaster'
    else:
        type = input[0]
        name = input[1:].strip()

    if name not in modules:
        modules[name] = { 'type': type, 'inputs': [], 'outputs': outputs }
    else:
        modules[name]['outputs'] = outputs
        modules[name]['type'] = type
    
    match modules[name]['type']:
        case '%':
            modules[name]['state'] = False
        case '&':
            modules[name]['state'] = [False for _ in modules[name]['inputs']]

    for o in outputs:
        if o not in modules:
            modules[o] = { 'inputs': [], 'outputs': [] }
        modules[o]['inputs'].append(name)

# print(modules)
lows = 0
highs = 0
presses = 0
pulses = []
initialState = [m['state'] for m in modules.values() if 'state' in m]

while True:
    if len(pulses) == 0:
        presses += 1
        pulses.append(('button', 'broadcaster', False))
    
    # process pulse[0]
    pulse = pulses.pop(0)
    print(pulse)
    sender, receiver, high = pulse
    module = modules[receiver]
    match module['type']:
        case 'broadcaster':
            for o in module['outputs']:
                pulses.append((receiver, o, high))
            if high:
                highs += len(module['outputs'])
            else:
                lows += len(module['outputs'])
        case '%':
            if not high:
                module['state'] = not module['state']
                pulses.append((receiver, module['outputs'][0], module['state']))
                if high:
                    highs += len(module['outputs'])
                else:
                    lows += len(module['outputs'])
        case '&':
            module['state'][module['inputs'].index(sender)] = high
            pulses.append((receiver, module['outputs'][0], all(module['state'])))
            if all(module['state']):
                lows += len(module['outputs'])
            else:
                highs += len(module['outputs'])

    # if modules state == initial state, break
    newState = [m['state'] for m in modules.values() if 'state' in m]
    print(newState)
    if newState == initialState and len(pulses) == 0:
        break

print(f'presses: {presses}, lows: {lows}, highs: {highs}')
totalLow = (1000 / presses) * lows
totalHigh = (1000 / presses) * highs
print(f'totalLow: {totalLow}, totalHigh: {totalHigh}, total: {totalLow * totalHigh}')