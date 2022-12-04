use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

fn main() {
  let mut answer = 0;

  if let Ok(lines) = read_lines("./input.txt") {
    for line in lines {
      if let Ok(ip) = line {
        let pairs = ip.split(',').collect::<Vec<&str>>();
        let elf1 = pairs[0].split('-').collect::<Vec<&str>>();
        let elf2 = pairs[1].split('-').collect::<Vec<&str>>();

        // println!("{:?} {:?}", elf1, elf2);
        let elf1_start = elf1[0].parse::<i32>().unwrap();
        let elf1_end = elf1[1].parse::<i32>().unwrap();
        let elf2_start = elf2[0].parse::<i32>().unwrap();
        let elf2_end = elf2[1].parse::<i32>().unwrap();

        if (elf2_start <= elf1_end && elf2_end >= elf1_start) || (elf1_start <= elf2_end && elf1_end >= elf2_start) {
          answer += 1;
          println!("{:?} {:?}", elf1, elf2);
        }
      }
    }
  }

  println!("{}", answer);
}

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
  let file = File::open(filename)?;
  Ok(io::BufReader::new(file).lines())
}