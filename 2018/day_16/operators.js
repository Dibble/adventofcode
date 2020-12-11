const Addr = (registers, A, B, C) => { // 9
  let output = Array.from(registers)
  output[C] = registers[A] + registers[B]
  return output
}

const Addi = (registers, A, B, C) => { // 11
  let output = Array.from(registers)
  output[C] = registers[A] + B
  return output
}

const Mulr = (registers, A, B, C) => { // 15
  let output = Array.from(registers)
  output[C] = registers[A] * registers[B]
  return output
}

const Muli = (registers, A, B, C) => { // 7
  let output = Array.from(registers)
  output[C] = registers[A] * B
  return output
}

const Banr = (registers, A, B, C) => { // 5
  let output = Array.from(registers)
  output[C] = registers[A] & registers[B]
  return output
}

const Bani = (registers, A, B, C) => { // 1
  let output = Array.from(registers)
  output[C] = registers[A] & B
  return output
}

const Borr = (registers, A, B, C) => { // 6
  let output = Array.from(registers)
  output[C] = registers[A] | registers[B]
  return output
}

const Bori = (registers, A, B, C) => { // 3
  let output = Array.from(registers)
  output[C] = registers[A] | B
  return output
}

const Setr = (registers, A, B, C) => { // 8
  let output = Array.from(registers)
  output[C] = registers[A]
  return output
}

const Seti = (registers, A, B, C) => { // 2
  let output = Array.from(registers)
  output[C] = A
  return output
}

const Gtir = (registers, A, B, C) => { // 12
  let output = Array.from(registers)
  if (A > registers[B]) {
    output[C] = 1
  } else {
    output[C] = 0
  }
  return output
}

const Gtri = (registers, A, B, C) => { // 14
  let output = Array.from(registers)
  if (registers[A] > B) {
    output[C] = 1
  } else {
    output[C] = 0
  }
  return output
}

const Gtrr = (registers, A, B, C) => { // 13
  let output = Array.from(registers)
  if (registers[A] > registers[B]) {
    output[C] = 1
  } else {
    output[C] = 0
  }
  return output
}

const Eqir = (registers, A, B, C) => { // 4
  let output = Array.from(registers)
  if (A === registers[B]) {
    output[C] = 1
  } else {
    output[C] = 0
  }
  return output
}

const Eqri = (registers, A, B, C) => { // 0
  let output = Array.from(registers)
  if (registers[A] === B) {
    output[C] = 1
  } else {
    output[C] = 0
  }
  return output
}

const Eqrr = (registers, A, B, C) => { // 10
  let output = Array.from(registers)
  if (registers[A] === registers[B]) {
    output[C] = 1
  } else {
    output[C] = 0
  }
  return output
}

module.exports = [Addr, Addi, Mulr, Muli, Banr, Bani, Borr, Bori, Setr, Seti, Gtir, Gtri, Gtrr, Eqir, Eqri, Eqrr]