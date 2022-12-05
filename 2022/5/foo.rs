use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

fn main() {
  let mut stacks = Vec::new();
  let mut parsed_lines = Vec::new();

  if let Ok(lines) = read_lines("./input.txt") {
    for line in lines {
      if let Ok(ip) = line {
        parsed_lines.push(ip);
      }
    }
  }

  let mut crate_positions = Vec::new();
  // let crates = &parsed_lines[..3];
  // let moves = &parsed_lines[5..];
  // for i in '1'..'4' {
    // crate_positions.push(parsed_lines[3].find(i).unwrap());
  // }

  let crates = &parsed_lines[..8];
  let moves = &parsed_lines[10..];
  for i in '1'..':' {
    crate_positions.push(parsed_lines[8].find(i).unwrap());
  }

  for position in crate_positions {
    let mut stack = Vec::new();
    for line in crates {
      if line.len() > position {
        let crate_id = line.chars().nth(position).unwrap();
        if crate_id != ' ' {
          stack.insert(0, crate_id);
        }
      }
    }
    stacks.push(stack);
  }

  for line in moves {
    let parts = line.split(' ').collect::<Vec<&str>>();
    let number = parts[1].parse::<i32>().unwrap();
    let from = parts[3].parse::<usize>().unwrap() - 1;
    let to = parts[5].parse::<usize>().unwrap() - 1;

    let mut crate_move = Vec::new();
    for _ in 0..number {
      let next_crate = stacks.get_mut(from).unwrap().pop().unwrap();
      crate_move.insert(0, next_crate);
    }
    stacks.get_mut(to).unwrap().append(&mut crate_move);
  }

  for i in 0..stacks.len() {
    println!("{}", stacks.get(i).unwrap().last().unwrap());
  }
}

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
  let file = File::open(filename)?;
  Ok(io::BufReader::new(file).lines())
}