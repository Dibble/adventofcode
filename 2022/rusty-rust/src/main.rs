use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;
use std::env;
mod day_18;

fn main() {
    let args: Vec<String> = env::args().collect();
    // dbg!(args);
    let filename = format!("./input/{}", &args[1]);
    // println!("{}", filename);
    if let Ok(lines) = read_lines(filename) {
        day_18::run(lines);
    } else {
      println!("file read fail");
    }
}

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
  let file = File::open(filename)?;
  Ok(io::BufReader::new(file).lines())
}
