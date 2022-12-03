use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;
use std::cmp;

fn main() {
  let mut score = 0;
  let mut group = 0;
  let mut group_items = Vec::new();

  if let Ok(lines) = read_lines("./input.txt") {
    for line in lines {
      if let Ok(ip) = line {
        // let compartment1 = &ip[..ip.len() / 2];
        // let compartment2 = &ip[ip.len() / 2..];
        // println!("{} {}", compartment1, compartment2);
        // let uniques = get_unique_chars(&compartment1);
        // println!("{:?}", uniques);

        // for i in 0..compartment2.len() {
        //   let c = compartment2.chars().nth(i).unwrap();
        //   if uniques.contains(&c) {
        //     let item_score = get_char_score(&c);
        //     println!("unique {} {}", &c, item_score);
        //     score += item_score;
        //     break;
        //   }
        // }

        group += 1;
        let elf_uniques = get_unique_chars(&ip);
        if group == 1 {
          group_items = elf_uniques;
        } else {
          let mut new_group_items = Vec::new();
          for i in 0..group_items.len() {
            let c = group_items[i];
            if elf_uniques.contains(&c) {
              new_group_items.push(c);
            }
          }
          group_items = new_group_items;
        }

        if group == 3 {
          score += get_char_score(&group_items[0]);
          group_items = Vec::new();
          group = 0;
        }
      }
    }
  }

  println!("{}", score);
}

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
  let file = File::open(filename)?;
  Ok(io::BufReader::new(file).lines())
}

fn get_char_score(c: &char) -> i32 {
  return match c {
    'a' => 1,
    'b' => 2,
    'c' => 3,
    'd' => 4,
    'e' => 5,
    'f' => 6,
    'g' => 7,
    'h' => 8,
    'i' => 9,
    'j' => 10,
    'k' => 11,
    'l' => 12,
    'm' => 13,
    'n' => 14,
    'o' => 15,
    'p' => 16,
    'q' => 17,
    'r' => 18,
    's' => 19,
    't' => 20,
    'u' => 21,
    'v' => 22,
    'w' => 23,
    'x' => 24,
    'y' => 25,
    'z' => 26,
    'A' => 27,
    'B' => 28,
    'C' => 29,
    'D' => 30,
    'E' => 31,
    'F' => 32,
    'G' => 33,
    'H' => 34,
    'I' => 35,
    'J' => 36,
    'K' => 37,
    'L' => 38,
    'M' => 39,
    'N' => 40,
    'O' => 41,
    'P' => 42,
    'Q' => 43,
    'R' => 44,
    'S' => 45,
    'T' => 46,
    'U' => 47,
    'V' => 48,
    'W' => 49,
    'X' => 50,
    'Y' => 51,
    'Z' => 52,
    _ => panic!("unexpected char {}", &c),
  }
}

fn get_unique_chars(input: &str) -> Vec<char> {
  let mut uniques = Vec::new();
  // let chars = input.chars();
  
  for i in 0..input.len() {
    let c = input.chars().nth(i).unwrap();
    if !uniques.contains(&c) {
      uniques.push(c);
    }
  }

  return uniques;
}