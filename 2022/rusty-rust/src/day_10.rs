use std::fs::File;
use std::io;

pub fn run(lines: io::Lines<io::BufReader<File>>) {
  let mut cycle: i32 = 0;
  // let mut strength = 0;
  let mut x: i32 = 1;
  let mut buffer: Vec<&str> = Vec::new();

  for line in lines {
    if let Ok(ip) = line {
      if ip == "noop" {
        if cycle % 40 == 0 {
          println!("{}", buffer.join(&String::new()));
          buffer = Vec::new();
        }

        cycle += 1;
        // if cycle == 20 || (cycle - 20) % 40 == 0 {
        //   println!("noop cycle {} x {}", cycle, x);
        //   strength += x * cycle;
        // }
        let mut pixel = (cycle % 40) - 1;
        if pixel == -1 {
          pixel = 39;
        }
        if (x - pixel).abs() < 2 {
          buffer.push("#");
        } else {
          buffer.push(".");
        }
        continue;
      }

      let parts = ip.split(' ').collect::<Vec<&str>>();
      let diff = parts[1].parse::<i32>().unwrap();
      // println!("addx {}", diff);
      
      for _i in 0..2 {
        if cycle % 40 == 0 {
          println!("{}", buffer.join(&String::new()));
          buffer = Vec::new();
        }
        cycle += 1;
        // if cycle == 20 || (cycle - 20) % 40 == 0 {
        //   println!("add {} cycle {} x {}", diff, cycle, x);
        //   strength += x * cycle;
        // }
        let mut pixel = (cycle % 40) - 1;
        if pixel == -1 {
          pixel = 39;
        }
        if (x - pixel).abs() < 2 {
          buffer.push("#");
        } else {
          buffer.push(".");
        }
      }
      x += diff;
    }
  }
  // println!("{}", strength);
  println!("{}", buffer.join(&String::new()));
}
