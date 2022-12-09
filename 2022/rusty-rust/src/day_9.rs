use std::fs::File;
use std::io;

pub fn run(lines: io::Lines<io::BufReader<File>>) {
  // let mut head: (i32,i32) = (0, 0);
  // let mut tail: (i32,i32) = (0, 0);
  let mut visited: Vec<(i32, i32)> = Vec::new();
  let mut knots: [(i32,i32); 10] = [(0,0); 10];
  for i in 0..10 {
    knots[i] = (0,0);
  }

  for line in lines {
    if let Ok(ip) = line {
      let command = ip.split(' ').collect::<Vec<&str>>();
      let num = command[1].parse::<i32>().unwrap();
      
      match command[0] {
        "U" => {
          for _i in 0..num {
            knots[0].1 += 1;
            for j in 0..knots.len() - 1 {
              let new_knot = get_knot_move(&knots[j], &knots[j+1]);
              knots[j+1] = new_knot;

              if !visited.contains(&knots[9]) {
                visited.push(knots[9]);
              }
            }
          }
        },
        "R" => {
          for _i in 0..num {
            knots[0].0 += 1;
            for j in 0..knots.len() - 1 {
              let new_knot = get_knot_move(&knots[j], &knots[j+1]);
              knots[j+1] = new_knot;

              if !visited.contains(&knots[9]) {
                visited.push(knots[9]);
              }
            }
          }
        },
        "D" => {
          for _i in 0..num {
            knots[0].1 -= 1;
            for j in 0..knots.len() - 1 {
              let new_knot = get_knot_move(&knots[j], &knots[j+1]);
              knots[j+1] = new_knot;

              if !visited.contains(&knots[9]) {
                visited.push(knots[9]);
              }
            }
          }
        },
        "L" => {
          for _i in 0..num {
            knots[0].0 -= 1;
            for j in 0..knots.len() - 1 {
              let new_knot = get_knot_move(&knots[j], &knots[j+1]);
              knots[j+1] = new_knot;

              if !visited.contains(&knots[9]) {
                visited.push(knots[9]);
              }
            }
          }
        },
        _ => { panic!("unknown command {}", command[0]) }
      };
    }
  }

  println!("{}", visited.len());
}

fn get_knot_move(head: &(i32,i32), tail: &(i32,i32)) -> (i32,i32) {
  let x_diff = head.0 - tail.0;
  let y_diff = head.1 - tail.1;

  if x_diff.abs() < 2 && y_diff.abs() < 2 {
    return (tail.0, tail.1);
  }

  let mut tail_move = (tail.0, tail.1);
  let same_column = head.0 == tail.0;
  let same_row = head.1 == tail.1;

  if !same_column {
    if x_diff > 0 {
      tail_move.0 += 1;
    } else {
      tail_move.0 -= 1;
    }
  }

  if !same_row {
    if y_diff > 0 {
      tail_move.1 += 1;
    } else {
      tail_move.1 -= 1;
    }
  }

  return tail_move;
}