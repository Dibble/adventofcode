use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;
use std::env;
mod day_7;

fn main() {
    let args: Vec<String> = env::args().collect();
    // dbg!(args);
    if let Ok(lines) = read_lines(args[1]) {
        day_7::run(lines);
    }
}

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
  let file = File::open(filename)?;
  Ok(io::BufReader::new(file).lines())
}
