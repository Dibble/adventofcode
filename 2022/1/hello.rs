use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;
use std::cmp;

fn main() {
  let mut max_calories = [0, 0, 0];
  let mut elf_calories = 0;

  if let Ok(lines) = read_lines("./input.txt") {
    for line in lines {
      if let Ok(ip) = line {
        if ip.trim().is_empty() {
          max_calories.sort();
          println!("before new elf [{}, {}, {}]", max_calories[0], max_calories[1], max_calories[2]);
          max_calories[0] = cmp::max(max_calories[0], elf_calories);
          elf_calories = 0;
          println!("new elf [{}, {}, {}]", max_calories[0], max_calories[1], max_calories[2]);
        } else {
          elf_calories += ip.parse::<i32>().unwrap();
          println!("calories {}", elf_calories);
        }
      }
    }
  }

  max_calories.sort();
  println!("before new elf [{}, {}, {}]", max_calories[0], max_calories[1], max_calories[2]);
  max_calories[0] = cmp::max(max_calories[0], elf_calories);
  println!("new elf [{}, {}, {}]", max_calories[0], max_calories[1], max_calories[2]);

  println!("{}", max_calories[0] + max_calories[1] + max_calories[2]);
}

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
  let file = File::open(filename)?;
  Ok(io::BufReader::new(file).lines())
}