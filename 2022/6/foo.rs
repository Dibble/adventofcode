use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

fn main() {
  if let Ok(lines) = read_lines("./input.txt") {
    for line in lines {
      if let Ok(ip) = line {
        let mut i = 0;
        let mut buffer: Vec<char> = Vec::new();
        let chars = ip.chars();

        for c in chars {
          i += 1;
          // println!("{}", &c);
          buffer.push(c);
          if buffer.len() > 14 {
            buffer.remove(0);
          }

          // println!("{:?}", buffer);
          if buffer.len() < 14 {
            continue;
          }

          if buffer.iter().all(|&x| buffer.iter().position(|&y| y == x) == buffer.iter().rposition(|&z| z == x)) {
            println!("{} {} {:?}", &c, i, buffer);
            break;
          }
        }
      }
    }
  }
}

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
  let file = File::open(filename)?;
  Ok(io::BufReader::new(file).lines())
}