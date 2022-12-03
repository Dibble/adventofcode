use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;
use std::cmp;

fn main() {
  let mut total_score = 0;

  if let Ok(lines) = read_lines("./input.txt") {
    for line in lines {
      if let Ok(ip) = line {
        let parts = ip.split(' ');
        let vec = parts.collect::<Vec<_>>();
        let my_throw = get_throw(vec[0], vec[1]);
        // println!("{} {} {}", vec[0], vec[1], &my_throw);
        let game_score = get_game_score(vec[0], &my_throw);
        let throw_score = get_throw_score(&my_throw);
        
        total_score += game_score + throw_score;
      }
    }
  }

  println!("final score {}", total_score);
}

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
  let file = File::open(filename)?;
  Ok(io::BufReader::new(file).lines())
}

fn get_throw(them: &str, result: &str) -> String {
  return match result {
    "X" => { // lose
      return match them {
        "A" => String::from("Z"),
        "B" => String::from("X"),
        "C" => String::from("Y"),
        _ => panic!("ERROR throw {}", them)
      }
    },
    "Y" => { // draw
      return match them {
        "A" => String::from("X"),
        "B" => String::from("Y"),
        "C" => String::from("Z"),
        _ => panic!("ERROR throw {}", them)
      }
    },
    "Z" => { // win
      return match them {
        "A" => String::from("Y"),
        "B" => String::from("Z"),
        "C" => String::from("X"),
        _ => panic!("ERROR throw {}", them)
      }
    },
    _ => { panic!("ERROR throw result {}", result); }
  };
}

fn get_throw_score(me: &str) -> i32 {
  return match me {
    "X" => 1,
    "Y" => 2,
    "Z" => 3,
    _ => panic!("ERROR throw score {}", me)
  }
}

fn get_game_score(them: &str, me: &str) -> i32 {
  match them {
    "A" => { // rock
      match me {
        "X" => { return 3; } // rock -> draw
        "Y" => { return 6; } // paper -> win
        "Z" => { return 0; } // scissors -> loss
        _ => { panic!("ERROR me {}", me); }
      }
    },
    "B" => { // paper
      match me {
        "X" => { return 0; } // rock -> loss
        "Y" => { return 3; } // paper -> draw
        "Z" => { return 6; } // scissors -> win
        _ => { panic!("ERROR me {}", me); }
      }
    },
    "C" => { // scissors
      match me {
        "X" => { return 6; } // rock -> win
        "Y" => { return 0; } // paper -> loss
        "Z" => { return 3; } // scissors -> draw
        _ => { panic!("ERROR me {}", me); }
      }
    },
    _ => { panic!("ERROR them {}", them); }
  }
}