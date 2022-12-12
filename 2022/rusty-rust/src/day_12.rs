use std::fs::File;
use std::io;

pub fn run(lines: io::Lines<io::BufReader<File>>) {
  let mut map: Vec<Vec<char>> = Vec::new();
  let mut start: (i32,i32) = (0,0);
  let mut end: (i32,i32) = (0,0);

  let mut i = 0;
  for line in lines {
    if let Ok(ip) = line {
      let mut j = 0;
      let row = ip.chars().map(|x| {
        if x == 'S' {
          start = (i,j);
          j += 1;
          return 'a';
        }
        if x == 'E' {
          end = (i,j);
          j += 1;
          return 'z';
        }
        j += 1;
        return x;
      })
      .collect::<Vec<char>>();

      map.push(row);
    }
    i += 1;
  }

  let mut routes = Vec::new();
  let mut first_route = Vec::new();
  first_route.push(end);
  routes.push(first_route);

  let mut searching = true;
  while searching {
    println!("processing {} routes", routes.len());
    let mut routes_iter = routes.iter_mut();
    
    for r in 0..routes.len() {
      let mut route = routes_iter.nth(r).unwrap();
      let last = route.last().unwrap();
      // if last is start, break and print length of route
      if last.0 == start.0 && last.1 == start.1 {
        println!("route found, length {}", route.len());
        searching = false;
        break;
      }

      // ignore if last is (-1,-1)
      if last.0 == -1 && last.1 == -1 {
        println!("dead end");
        continue;
      }

      // get routable positions from end of route
      let routable = get_routable_positions(&map, &last);

      // filter out visited spaces
      let filered_routable = routable.iter().filter(|x| !route.contains(x)).collect::<Vec<&(i32,i32)>>();

      match filered_routable.len() {
        // if no routable spaces, add (-1,-1) to end
        0 => { route.push((-1, -1)) },
        // if one routable space, add to end
        1 => { route.push(**filered_routable.get(0).unwrap()) },
        // if >1 (n) routable spaces, clone route n-1 times, add each space to end of a route
        _ => {
          route.push(**filered_routable.get(0).unwrap());
          for x in 1..filered_routable.len() {
            let mut new_route = route.clone();
            new_route.push(**filered_routable.get(x).unwrap());
            routes.push(new_route);
          }
        },
      }
    }
  }
}

fn get_routable_positions(map: &Vec<Vec<char>>, current: &(i32,i32)) -> Vec<(i32,i32)> {
  let mut routable = Vec::new();
  let adjacent = [(0, 1), (0, -1), (1, 0), (-1, 0)];
  let heights: [char; 26] = ('a'..='z').collect::<Vec<_>>().try_into().unwrap();

  for i in 0..adjacent.len() {
    let next = (current.0 + adjacent[i].0, current.1 + adjacent[i].1);
    if next.0 < 0 || next.1 < 0 || next.0 >= map.len().try_into().unwrap() || next.1 >= map.get(0).unwrap().len().try_into().unwrap() {
      continue;
    }

    let current_height: &char = map.get::<usize>(current.0.try_into().unwrap()).unwrap().get::<usize>(current.1.try_into().unwrap()).unwrap();
    let next_height: &char = map.get::<usize>(next.0.try_into().unwrap()).unwrap().get::<usize>(next.1.try_into().unwrap()).unwrap();
    let height_diff = (heights.iter().position(|x| x == current_height).unwrap() as isize) - (heights.iter().position(|x| x == next_height).unwrap() as isize);
    if height_diff > 1 || height_diff < -1 {
      continue;
    }

    routable.push((adjacent[i].0, adjacent[i].1));
  }

  return routable;
}
