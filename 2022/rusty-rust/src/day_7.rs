use std::fs::File;
use std::io;
use indextree::{Arena};

#[derive(Debug)]
struct NodeData {
  name: String,
  size: usize
}

pub fn run(lines: io::Lines<io::BufReader<File>>) {
  let mut arena = Arena::new();
  let root = arena.new_node(NodeData { name: String::from("/"), size: 0 });
  let mut current_node = root;
  
  for line in lines {
    if let Ok(ip) = line {
      if ip.starts_with("$ ") {
        // command
        let command_parts = ip.split(' ').collect::<Vec<&str>>();
        match command_parts[1] {
          "cd" => {
            match command_parts[2] {
              "/" => {
                current_node = root;
              },
              ".." => {
                current_node = arena.get(current_node).unwrap().parent().unwrap();
              },
              _ => {
                let mut current_child = arena.get(current_node).unwrap().first_child().unwrap();
                while arena.get(current_child).unwrap().get().name != command_parts[2] {
                  current_child = arena.get(current_child).unwrap().next_sibling().unwrap();
                }
                current_node = current_child;
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
        let output_parts = ip.split(' ').collect::<Vec<&str>>();

        if ip.starts_with("dir ") {
          // directory
          // new node
          let dir = arena.new_node(NodeData { name: String::from(output_parts[1]), size: 0 });
          // append to current
          current_node.append(dir, &mut arena);
        } else {
          // file with size
          let size = output_parts[0].parse::<usize>().unwrap();
          let file = arena.new_node(NodeData { name: String::from(output_parts[1]), size: size });
          current_node.append(file, &mut arena);
        }
      }
    }
  }

  let mut iter = root.reverse_traverse(&arena);
  let mut node = iter.next();
  while node != None {
    if node.size == 0 {
      let mut size = 0;
      
    }
    node = iter.next();
  }

  println!("{:?}", arena);
}