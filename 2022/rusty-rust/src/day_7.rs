use trees::{tr,Node};

struct NodeData {
  name: String,
  size: i32,
}

pub fn run(lines: io::Result<io::Lines<io::BufReader<File>>>) {
  println!("7");
  let mut tree = tr("/", size: 0);
  let mut current_node = 

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