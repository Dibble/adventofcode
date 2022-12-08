use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

fn main() {
  let mut map = Vec::new();
  
  if let Ok(lines) = read_lines("./input.txt") {
    for line in lines {
      if let Ok(ip) = line {
        let map_row = ip.chars().map(|x| x.to_digit(10).unwrap()).collect::<Vec<u32>>();
        map.push(map_row);
      }
    }
  }

  let height = map.len();
  let width = map.first().unwrap().len();
  // let mut visible = (height * 2) + (width * 2) - 4; // perimeter trees
  let mut max_scenic = 0;
  
  for i in 1..height - 1 {
    for j in 1..width - 1 {
      let current = map.get(i).unwrap().get(j).unwrap();
      let mut scenic = 1;
      
      let mut up = map.iter().take(i).map(|row| row.iter().nth(j).unwrap());
      // if up.all(|&tree| tree < *current) {
        // visible += 1;
        // continue;
      // }

      let mut right = map.get(i).unwrap().iter().skip(j + 1);
      // if right.all(|&tree| tree < *current) {
        // visible += 1;
        // continue;
      // }

      let mut down = map.iter().skip(i + 1).map(|row| row.iter().nth(j).unwrap());
      // if down.all(|&tree| tree < *current) {
        // visible += 1;
        // continue;
      // }

      let mut left = map.get(i).unwrap().iter().take(j);
      // if left.all(|&tree| tree < *current) {
        // visible += 1;
        // continue;
      // }

      let up_max = up.clone().count();
      let mut up_view = up.rev().take_while(|&tree| tree < current).count();
      if up_view < up_max {
        up_view += 1;
      }
      scenic *= up_view;

      let right_max = right.clone().count();
      let mut right_view = right.take_while(|&tree| tree < current).count();
      if right_view < right_max {
        right_view += 1;
      }
      scenic *= right_view;

      let down_max = down.clone().count();
      let mut down_view = down.take_while(|&tree| tree < current).count();
      if down_view < down_max {
        down_view += 1;
      }
      scenic *= down_view;
      
      let left_max = left.clone().count();
      let mut left_view = left.rev().take_while(|&tree| tree < current).count();
      if left_view < left_max {
        left_view += 1;
      }
      scenic *= left_view;

      if scenic > max_scenic {
        max_scenic = scenic;
      }
    }
  }

  // println!("{}", visible);
  println!("{}", max_scenic);
}

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
  let file = File::open(filename)?;
  Ok(io::BufReader::new(file).lines())
}
