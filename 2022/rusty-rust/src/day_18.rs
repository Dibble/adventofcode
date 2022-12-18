use std::fs::File;
use std::io;

pub fn run(lines: io::Lines<io::BufReader<File>>) {
  let mut lava: Vec<(isize,isize,isize)> = Vec::new();
  let mut surface = 0;
  
  for line in lines {
    if let Ok(ip) = line {
      let split = ip.split(',');
      let mut coords = split.map(|x| x.parse::<isize>().unwrap());
      let tuple = (coords.next().unwrap(),coords.next().unwrap(),coords.next().unwrap());
      lava.push(tuple);
    }
  }

  for drop in &lava {
    let mut adjacent = Vec::new();
    for other in &lava {
      if other.0 == drop.0 && other.1 == drop.1 && other.2 == drop.2 {
        continue;
      }

      if ((other.0 - drop.0).abs() == 1 && other.1 == drop.1 && other.2 == drop.2) ||
        (other.0 == drop.0 && (other.1 - drop.1).abs() == 1 && other.2 == drop.2) ||
        (other.0 == drop.0 && other.1 == drop.1 && (other.2 - drop.2).abs() == 1) {
          adjacent.push((other.0, other.1, other.2));
        }
    }
    surface += 6 - adjacent.len();
  }

  // println!("{:?}", lava);
  println!("{}", surface);
}
