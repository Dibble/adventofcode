use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

struct Node {
  name: String,
  size: i32,
  children: Vec<Node>,
  parent: Option<Node>,
}

fn main() {
  let root = Node { name: String::from("/"), size: 0, children: Vec::new() };
  let mut current_node = &root;
  
  if let Ok(lines) = read_lines("./test.txt") {
    for line in lines {
      if let Ok(ip) = line {
        if ip.starts_with("$ ") {
          // command
          let command_parts = ip.split(' ').collect::<Vec<&str>>();
          match command_parts[1] {
            "cd" => {
              match command_parts[2] {
                "/" => {
                  current_node = &root;
                },
                ".." => {
                  current_node = &current_node.parent.unwrap();
                },
                _ => {
                  current_node = current_node.children.iter().find(|x| x.name == command_parts[2]).unwrap();
                }
              }
            },
            "ls" => {
              println!("ls");
            },
            _ => { panic!("unknown command {}", command_parts[1]) },
          }
        } else {
          // output
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
